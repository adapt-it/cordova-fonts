/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at
         http://www.apache.org/licenses/LICENSE-2.0
       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
/*
 * Portions copyright (C) 2011 George Yunaev @ Ulduzsoft
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 */

package org.adaptit.cordova.fonts;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import android.app.Activity;
import android.content.Intent;
import android.util.Xml;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;


public class Fonts extends CordovaPlugin {
    public static final String GETFONTLIST = "getFontList";
    public static final String GETDEFAULTFONT = "getDefaultFont";
    
    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        
        try {
            if (action.equals(GETFONTLIST)) {
                cordova.getThreadPool().execute(
                    new Runnable() {
                        public void run() {
                            final JSONArray results = getFontList();
                            System.out.println("results: " + results.toString());
                            callbackContext.success(results);
                        }
                    }
                );
                return true;
            } else if (action.equals(GETDEFAULTFONT)) {
                cordova.getThreadPool().execute(
                    new Runnable() {
                        public void run() {
                            final String results = getDefaultFont();
                            System.out.println("results: " + results.toString());
                            callbackContext.success(results);
                        }
                    }
                );
                return true;
            } else {
                return false;
            }
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
        } 
        return true;
    }
    
    private String getDefaultFont() {
        System.out.println("getDefaultFont(): entry");
        File configFilename = new File("/system/etc/fonts.xml");
        if (!configFilename.exists()) {
            // Pre-Android 5.0
            configFilename = new File("/system/etc/system_fonts.xml");
        }
        if (!configFilename.exists()) {
            // some OEMs use this dir
            configFilename = new File("/system/etc/font_fallback.xml");
        }
        String defaultFontName = "";
        TTFAnalyzer analyzer = new TTFAnalyzer();
        
        try (FileInputStream fontsIn = new FileInputStream(configFilename)){
            XmlPullParser parser = Xml.newPullParser();
            parser.setInput(fontsIn, null);
            Boolean done = false;
            Boolean getTheText = false;
            int eventType;
            String defaultFont = "";
            while (!done) {
                eventType = parser.next();
                String tagName = parser.getName();
                if (eventType == parser.START_TAG && (tagName.equalsIgnoreCase("file") || tagName.equalsIgnoreCase("font"))) {
                    // the text is next up -- pull it
                    getTheText = true;
                }
                if (eventType == parser.TEXT && getTheText == true) {
                    // first name
                    defaultFont = parser.getText();
                    System.out.println("text for file tag:" + defaultFont);
                    done = true;
                }
                if (eventType == parser.END_DOCUMENT) {
                    System.out.println("hit end of system_fonts.xml document");
                    done = true;
                }
            }
            
            if (defaultFont.length() > 0) {
                // found the font filename, most likely in /system/fonts. Now pull out the human-readable
                // string from the font file
                System.out.println("Figuring out default Font info");
                String fontname = analyzer.getFontName("/system/fonts/" + defaultFont);
                if ( fontname != null ) {
                    System.out.println("found font info: " + fontname);
                    defaultFontName = fontname;
                }                
            }

        } catch (RuntimeException e) {
            System.err.println("Didn't create default family (most likely, non-Minikin build)");
            // TODO: normal in non-Minikin case, remove or make error when Minikin-only
        } catch (FileNotFoundException e) {
            System.err.println("GetDefaultFont: config file Not found");
        } catch (IOException e) {
            System.err.println("GetDefaultFont: IO exception: " + e.getMessage());
        } catch (XmlPullParserException e) {
            System.err.println("getDefaultFont: XML parse exception " + e.getMessage());
        }
        return defaultFontName; 
    }
    
    private JSONArray getFontList() {
        System.out.println("getFontList(): entry");
        String[] fontdirs = { "/system/fonts", "/system/font", "/data/fonts" };
        JSONArray fonts = new JSONArray();
        TTFAnalyzer analyzer = new TTFAnalyzer();
        
        for ( String fontdir : fontdirs )
        {
//            System.out.println("fontdir: " + fontdir);
            File dir = new File( fontdir );
            if ( !dir.exists() )
                continue;

            File[] files = dir.listFiles();
            if ( files == null )
                continue;

            for ( File file : files )
            {
//                System.out.println("analyzing file: " + file.getAbsolutePath());
                String fontname = analyzer.getFontName( file.getAbsolutePath() );
                if ( fontname != null ) {
                    System.out.println("found font: " + fontname);
                    fonts.put( fontname );
                }
            }
        }
        if (fonts.length() < 1)
            return null;

        return fonts; 
    }
}

// The class which loads the OTF / TTF file, parses it and returns the font name
// EDB 3/11/2026 - add OTF file support
class TTFAnalyzer
{
    // This function parses the file and returns the font name specified in the file
    // See http://developer.apple.com/fonts/ttrefman/rm06/Chap6.html
    public String getFontName( String fontFilename )
    {
        try (RandomAccessFile file = new RandomAccessFile( fontFilename, "r" ))
        {
 
            // Read the version first
            long version = readDword(file);
 
            // sanity check the version -- this needs to be either an OTF or TTF file
            // The version must be either 'true' (0x74727565), OTTO (0x4F54544F / for OTF), or 0x00010000
            if ( version != 0x74727565 && version != 0x00010000 && version != 0x4F54544F )
                return null;
 
            // The TTF file consist of several sections called "tables", and we need to know how many of them are there.
            int numTables = readWord(file);
 
            // Skip the rest in the header
            readWord(file); // skip searchRange
            readWord(file); // skip entrySelector
            readWord(file); // skip rangeShift
 
            // Now we can read the tables
            for ( int i = 0; i < numTables; i++ )
            {
                // Read the table entry
                long tag = readDword(file);
                readDword(file); // skip checksum
                int offset = (int) readDword(file);
                int length = (int) readDword(file);
 
                // Now here' the trick. 'name' field actually contains the textual string name.
                // So the 'name' string in characters equals to 0x6E616D65
                if ( tag == 0x6E616D65 )
                {
                    // Here's the name section. Read it completely into the allocated buffer
                    byte[] table = new byte[ length ];
 
                    file.seek( offset );
                    read(file, table );
 
                    // This is also a table. See http://developer.apple.com/fonts/ttrefman/rm06/Chap6name.html
                    // According to Table 36, the total number of table records is stored in the second word, at the offset 2.
                    // Getting the count and string offset - remembering it's big endian.
                    int count = getWord( table, 2 );
                    int string_offset = getWord( table, 4 );
 
                    // Record starts from offset 6
                    for ( int record = 0; record < count; record++ )
                    {
                        // Table 37 tells us that each record is 6 words -> 12 bytes, and that the nameID is 4th word so its offset is 6.
                        // We also need to account for the first 6 bytes of the header above (Table 36), so...
                        int nameid_offset = record * 12 + 6;
                        int platformID = getWord( table, nameid_offset );
                        int nameid_value = getWord( table, nameid_offset + 6 );
 
                        // Table 42 lists the valid name Identifiers. We're interested in 4 but not in Unicode encoding (for simplicity).
                        // The encoding is stored as PlatformID and we're interested in Mac and UTF_16BE encoding
                        if ( nameid_value == 4 ) {
                            // We need the string offset and length, which are the word 6 and 5 respectively
                            int name_length = getWord( table, nameid_offset + 8 );
                            int name_offset = getWord( table, nameid_offset + 10 ) + string_offset;

                            if ( name_offset >= 0 && name_offset + name_length < table.length ) 
                            {
                                if (platformID == 1) {
                                    // Mac encoding
                                    return new String( table, name_offset, name_length );
                                } else if (platformID == 3) { 
                                    // UTF_16BE encoding
                                    return new String( table, name_offset, name_length, java.nio.charset.StandardCharsets.UTF_16BE );
                                }
                            }
                        } 
                }
            }
 
            return null;
        }
        catch (FileNotFoundException e)
        {
            // Permissions?
            return null;
        }
        catch (IOException e)
        {
            // Most likely a corrupted font file
            return null;
        }
    }
 
    // Helper I/O functions
    private int readByte(RandomAccessFile file) throws IOException
    {
        return file.read() & 0xFF;
    }
 
    private int readWord(RandomAccessFile file) throws IOException
    {
        int b1 = readByte(file);
        int b2 = readByte(file);
 
        return b1 << 8 | b2;
    }
 
    private long readDword(RandomAccessFile file) throws IOException
    {
        long b1 = readByte(file);
        long b2 = readByte(file);
        long b3 = readByte(file);
        long b4 = readByte(file);
 
        return (b1 << 24 | b2 << 16 | b3 << 8 | b4) & 0xFFFFFFFFL;
    }
 
    private void read(RandomAccessFile file,byte [] array ) throws IOException
    {
        if ( file.read( array ) != array.length )
            throw new IOException();
    }
 
    // Helper
    private int getWord( byte [] array, int offset )
    {
        int b1 = array[ offset ] & 0xFF;
        int b2 = array[ offset + 1 ] & 0xFF;
 
        return b1 << 8 | b2;
    }
}
