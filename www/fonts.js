var exec = require('cordova/exec');

var Fonts = {

/**
* Returns a list of fonts installed on the device.
*
* @param {function} successCB
* @param {function} errorCB
*
* Example
*    Fonts.getFontList(function(fontList) {console.log(fontList);},
*                      function(error) {console.log(error);});
*/
    getFontList: function (successCB, errorCB) {
        exec(successCB, errorCB, "Fonts", "getFontList", []);
    }

};

module.exports = Fonts;