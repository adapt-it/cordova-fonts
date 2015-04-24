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
    
Note: this command will install the plugin from npm; the plugin should also be available on the cordova plugins registry until October 15, 2015.

Config.xml for PhoneGap Build:

    <gap:plugin name="org.adapt-it.cordova.fonts" source="plugins.cordova.io" />
    
## Supported Platforms

- Android
- Amazon Fire OS (untested / just using Android code)
- Firefox OS
- iOS

# Fonts

The `Fonts` object provides a way to enumerate through the list of fonts installed on the device.

## Methods

Currently this plugin only provides a single method, **getFontList**.

### GetFontList

**Parameters:** 

- **successCallback**: Callback that returns the list of fonts as an array of string values.
- **errorCallback: Callback that executes if an error occurs while retrieving the list of fonts on the local device.

** Firefox OS quirks **

Firefox OS does not provide an API to access the fonts on the device. The Fonts plugin currently returns a list corresponding to the fonts.mk file found in the mozilla-b2g project (https://github.com/mozilla-b2g/moztt/blob/master/fonts.mk), but it is a hard-coded list and not guaranteed to be correct on any particular version or distro of Firefox OS.
    
### Example

    if (navigator.Fonts) {
        console.log("Fonts object in navigator");
        navigator.Fonts.getFontList(
            function (fontList) {
                if (fontlist) {
                    for (var i = 0; i < fontlist.length; i++) {
                        console.log("Font: " + fontlist[i]);
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

    
## Internal Development / Unit Testing

(This is only for devs who are developing / debugging the plugin itself)

The cordova-fonts plugin uses the cordova-plugin-test-framework to run unit tests. Complete the following to run through the plugin unit tests:

1. Use your existing cordova app, or create a new one.
2. Add the cordova-fonts plugin and test / test framework plugins:

        cordova plugin add https://github.com/adapt-it/cordova-fonts.git
        cordova plugin add https://github.com/adapt-it/cordova-fonts.git#:/tests
        cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git

3. Change the start page in your cordova app's `config.xml` with `<content src="cdvtests/index.html" />` or navigate to `cdvtests/index.html` from within your app.
4. Build and run the application in an emulator or on the device.
