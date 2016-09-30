/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/* jshint jasmine: true */

exports.defineAutoTests = function () {
    describe('Fonts (navigator.Fonts)', function () {
        it("should exist", function () {
            expect(navigator.Fonts).toBeDefined();
        });
        
        it("should contain a getFontList function", function () {
            expect(typeof navigator.Fonts.getFontList).toBeDefined();
            expect(typeof navigator.Fonts.getFontList).toBe("function");
        });
        
        it("should contain a getDefaultFont function", function () {
            expect(typeof navigator.Fonts.getDefaultFont).toBeDefined();
            expect(typeof navigator.Fonts.getDefaultFont).toBe("function");
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    var logMessage = function (message, color) {
        var log = document.getElementById('info'),
            logLine = document.createElement('div');

        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    };

    var defaultFontTest = function () {
        clearLog();
        console.log("defaultFontTest()");
        if (navigator.Fonts) {
            navigator.Fonts.getDefaultFont(
                function (defaultFont) {
                    console.log("defaultFontTest() - value returned: " + defaultFont);
                    logMessage("Default Font: " + defaultFont);
                    logMessage("-----");
                },
                function (error) {
                    logMessage(error);
                }
            );
        } else {
            console.log("Plugin error: Fonts plugin not found (is it installed?)");
        }
    };

    var fontListTest = function () {
        clearLog();
        var i = 0;
        console.log("fontListTest()");
        if (navigator.Fonts) {
            navigator.Fonts.getFontList(
                function (fontlist) {
                    console.log(fontlist.length + " font(s) returned");
                    for (i = 0; i < fontlist.length; i++) {
                        logMessage("Font: " + fontlist[i]);
                    }
                },
                function (error) {
                    logMessage(error);
                }
            );
        } else {
            console.log("Plugin error: Fonts plugin not found (is it installed?)");
        }
    };

    var device_tests = '<p/><div id="cdv_fonts"></div>' +
        '<p/><div id="cdv_default"></div>';
    
    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    createActionButton('Default Font', function () {
        defaultFontTest();
    }, "cdv_default");
    
    createActionButton('Display Fonts', function () {
        fontListTest();
    }, "cdv_fonts");
};
