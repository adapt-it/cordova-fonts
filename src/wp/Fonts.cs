using System;
using System.Runtime.Serialization;

namespace WPCordovaClassLib.Cordova.Commands
{
    /// <summary>
    /// Provides information about system locale, culture settings, number formats, ect.
    /// </summary>
    public class Fonts : BaseCommand
    {
        /// <summary>
        /// Gets the string identifier for the client's current language.
        /// </summary>
        /// <param name="options"></param>               
        public void getPreferredLanguage(string options)
        {
            try
            {
                var language = CultureInfo.CurrentUICulture.Name;
                PluginResult result = new PluginResult(PluginResult.Status.OK, this.WrapIntoJSON(language));
                this.DispatchCommandResult(result);
            }
            catch (Exception)
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, new GlobalizationError()));
            }
        }
        

FontFamily fontFamily = new FontFamily("Arial");
Font font = new Font(
   fontFamily,
   8,
   FontStyle.Regular,
   GraphicsUnit.Point);
RectangleF rectF = new RectangleF(10, 10, 500, 500);
SolidBrush solidBrush = new SolidBrush(Color.Black);

string familyName;
string familyList = "";
FontFamily[] fontFamilies;

InstalledFontCollection installedFontCollection = new InstalledFontCollection();

// Get the array of FontFamily objects.
fontFamilies = installedFontCollection.Families;

// The loop below creates a large string that is a comma-separated 
// list of all font family names. 

int count = fontFamilies.Length;
for (int j = 0; j < count; ++j)
{
    familyName = fontFamilies[j].Name;
    familyList = familyList + familyName;
    familyList = familyList + ",  ";
}

// Draw the large string (list of all families) in a rectangle.
e.Graphics.DrawString(familyList, font, solidBrush, rectF);
    }
}