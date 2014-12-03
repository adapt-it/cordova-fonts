var exec = require('cordova/exec');

/**
* Contains information about a single font.
* @constructor
* @param {name} font name
* @param {url} location of font file on device, if available
*/
var FontInfo = function (name, url) {
    this.name = name || null;
    this.url = url || null;
};

module.exports = FontInfo;