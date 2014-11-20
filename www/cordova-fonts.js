var exec = require('cordova/exec');

exports.Fonts = function(arg0, success, error) {
    exec(success, error, "Fonts", "fonts", [arg0]);
};
