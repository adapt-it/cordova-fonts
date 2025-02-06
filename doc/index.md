<!---
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
-->

# cordova-plugin-fonts

This plugin defines a global `Fonts` object, which provides access to the fonts installed on the device. The `Fonts` object is available from the `navigator` object after the `deviceready` event fires.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.Fonts);
    }

## Installation

From the Command line:

    cordova plugin add cordova-plugin-fonts

Config.xml for PhoneGap Build:

    <gap:plugin name="cordova-plugin-fonts" source="npm" />
    
These commands will install the plugin from npm. You can find this plugin up on npm [here](https://www.npmjs.com/package/cordova-plugin-fonts), or by searching for `ecosystem:cordova` in the npm registry like [this](https://www.npmjs.com/search?q=ecosystem%3Acordova).

## Supported Platforms

- Android
- iOS
- Browser
- Electron (using Browser code)

# Fonts

The `Fonts` object provides a way to enumerate through the list of fonts installed on the device.

## Methods

Currently this plugin only provides a single method, **getFontList**.

### GetFontList

**Parameters:**

- **successCallback**: Callback that returns the list of fonts as an array of string values.
- **errorCallback:** Callback that executes if an error occurs while retrieving the list of fonts on the local device.

**Notes**

- The Browser and Electron Platforms test for the [local font access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API). If the underlying browser supports the API, it will return a string array of the font data's [font family](https://developer.mozilla.org/en-US/docs/Web/API/FontData/family) for each supported font. If the underlying browser _does not_ support the API, the plugin iterates through known browser-safe fonts and tries to detect their presence on the device.

### Example

    if (navigator.Fonts) {
        console.log("Fonts object in navigator");
        navigator.Fonts.getFontList(
            function (fontList) {
                if (fontList) {
                    for (var i = 0; i < fontList.length; i++) {
                        console.log("Font: " + fontList[i]);
                    }
                }
            },
            function (error) {
                console.log("FontList error: " + error);
            }
        );
    } else {
        console.log("Plugin error: Fonts plugin not found (is it installed?)");
    }

### getDefaultFont

**Parameters:**

- **successCallback**: Callback that returns the string name of the default font on the device.
- **errorCallback:** Callback that executes if an error occurs during the call.

**Notes**

- The Browser and Electron platforms test for the [local font access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API), which has limited support (Chrome and Edge browsers). If the underlying browser supports this API, it will return the family name of the first font in the supported list as the default font. If the underlying browser _does not_ support this API, it will return "serif" as the default font.

### Example

    if (navigator.Fonts) {
        console.log("Fonts object in navigator");
        navigator.Fonts.getDefaultFont(
            function (defaultFont) {
                if (defaultFont) {
                    console.log("Default Font: " + defaultFont);
                }
            },
            function (error) {
                console.log("DefaultFont error: " + error);
            }
        );
    } else {
        console.log("Plugin error: Fonts plugin not found (is it installed?)");
    }
    
## Internal Development / Unit Testing

(This is only for devs who are developing / debugging the plugin itself)

The cordova-fonts plugin uses the cordova-plugin-test-framework to run unit tests. Complete the following to run through the plugin unit tests:

1. Use your existing cordova app, or create a new one.
2. Add the cordova-fonts plugin and test / test framework plugins:

        cordova plugin add https://github.com/adapt-it/cordova-fonts.git
        cordova plugin add https://github.com/adapt-it/cordova-fonts.git#:/tests
        cordova plugin add cordova-plugin-test-framework

3. Change the start page in your cordova app's `config.xml` with `<content src="cdvtests/index.html" />` or navigate to `cdvtests/index.html` from within your app.
4. Build and run the application in an emulator or on the device.
