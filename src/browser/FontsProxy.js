/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 * Version: 0.31 (1 Feb 2025) edb
 *          Add cursive, fantasy to baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
var Detector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif', 'cursive', 'fantasy'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};
// end lalit Patel code

function getFontList(successCB, errorCB) {
    'use strict';

    if ("queryLocalFonts" in window) {
        console.log("Fonts::getFontList() - Device supports local font access API");
        // local font access API is supported on this device -- use it
        try {
            var theFonts = [];
            window.queryLocalFonts().then(function (availableFonts) {
                for (const fontData of availableFonts) {
                    theFonts.push(fontData.family);
                }
                // list likely has duplicates -- remove them
                const retValue = [ ...new Set(theFonts)];
                successCB(retValue);    
            });
        } catch (err) {
            console.error(err.name, err.message);
        }        
    } else {
        console.log("Fonts::getFontList() - No local font access API support on this device");
        // no local font access API -- test various known browser-safe fonts
        var tryList = [
            "Times New Roman",  // Serif fonts
            "Cambria",
            "Didot",
            "Bodoni",
            "Calisto",
            "Palatino",
            "Rockwell",
            "Garamond",
            "Georgia",
            "Arial",    // Sans Serif fonts
            "helvetica",
            "Calibri",
            "Verdana",
            "Tahoma",
            "Trebuchet MS",
            "Century Gothic",
            "Optima",
            "Impact",
            "Courier New", // monospace
            "Monaco",
            "Copperplate", // cursive / fantasy
            "Lucinda",
            "Bradley Hand",
            "Brush Script MT"
        ];
        var d = new Detector();
        var retValue = ['monospace', 'sans-serif', 'serif', 'cursive', 'fantasy']; // initial value - fallback fonts (known to be supported)
        // iterate through our tryList array; if it's detected, add it to the results
        tryList.forEach(function(n) {
            if (d.detect(n)) {
                retValue.push(n);
            }
        });
        // return the resulting array
        successCB(retValue);
    }    
}

function getDefaultFont(successCB, errorCB) {
    'use strict';
    if ("queryLocalFonts" in window) {
        console.log("Fonts::getDefaultFont() - Device supports local font access API");
        // local font access API is supported on this device -- use it
        try {
            var fonts = [];
            window.queryLocalFonts().then(function (availableFonts) {
                const fontData = availableFonts[0];
                successCB(fontData.family);    
            });
        } catch (err) {
            errorCB(err.message);
        }        
    } else {
        console.log("Fonts::getDefaultFont() - No local font access API support, answer is hard-coded");
        // no local font access API support
        successCB("serif");
    }
}

var Fonts = {
    getFontList: getFontList,
    getDefaultFont: getDefaultFont
};

require("cordova/exec/proxy").add("Fonts", Fonts);