var exec = require('cordova/exec');

var Fonts = {

/**
* Returns a list of fonts installed on the device.
*
* @param {function} successCB
* @param {function} errorCB
*
* @return Object.value {Array{String}}: the list of fonts installed on this device.
* Example
*    Fonts.getFontList(function(fontList) {console.log(fontList);},
*                      function(error) {console.log(error);});
*/
    getFontList: function (successCB, errorCB) {
        exec(successCB, errorCB, "Fonts", "getFontList", []);
    },
/**
* Returns the string name of the default font on the device.
*
* @param {function} successCB
* @param {function} errorCB
*
* @return Object.value {String}: the default font name
*
* Example
*    Fonts.getDefaultFont(function(fontName) {console.log(fontName);},
*                      function(error) {console.log(error);});
*/
    getDefaultFont: function (successCB, errorCB) {
        exec(successCB, errorCB, "Fonts", "getDefaultFont", []);
    }

};

module.exports = Fonts;