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

# org.adapt-it.cordova.fonts

This plugin defines a global `fonts` object, which provides access to the fonts installed on the device.

## Installation

    cordova plugin add https://github.com/adapt-it/cordova-fonts.git
    
## Internal Development / Unit Testing

(This is only for devs who are debugging the plugin itself)

The cordova-fonts plugin uses the cordova-plugin-test-framework to run unit tests. Complete the following to run through the plugin unit tests:

1. Use your existing cordova app, or create a new one.
2. Add the cordova-fonts plugin and test / test framework plugins:

        cordova plugin add https://github.com/adapt-it/cordova-fonts.git
        cordova plugin add https://github.com/adapt-it/cordova-fonts.git#:/tests
        cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git

3. Change the start page in your cordova app's `config.xml` with `<content src="cdvtests/index.html" />` or navigate to `cdvtests/index.html` from within your app.
4. Build and run the application in an emulator or on the device.
