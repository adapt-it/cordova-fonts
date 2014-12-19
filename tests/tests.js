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

exports.defineAutoTests = function () {
    describe('Fonts (navigator.Fonts)', function () {
        it("Font.spec.1 should exist", function () {
            expect(navigator.Fonts).toBeDefined();
        });
        
        describe('getFontList', function () {
            var getFontList = function (a) {
                expect(a).toBeDefined();
            };
            it("Fonts.spec.1 should exist", function () {
                expect(typeof navigator.Fonts.getFontList).toBeDefined();
                expect(typeof navigator.Fonts.getFontList === 'function').toBe(true);
            });
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    var device_tests = '<h3>Press Fonts button to get the list of defined fonts</h3>' +
        '<div id="Fonts"></div>' +
        '<p>Expected result: Status box will get updated with fonts.</p>',
        
        logMessage = function (message, color) {
            var log = document.getElementById('info'),
                logLine = document.createElement('div');
            
            if (color) {
                logLine.style.color = color;
            }
            logLine.innerHTML = message;
            log.appendChild(logLine);
        },

        clearLog = function () {
            var log = document.getElementById('info');
            log.innerHTML = '';
        };


    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    createActionButton('Dump device', function () {
        clearLog();
        var value = "";
        if (navigator.Fonts) {
            navigator.Fonts.getFontList(
                function (success) {
                    value = success;
                },
                function (error) {
                    value = error;
                }
            );
        } else {
            value = "no Fonts object in navigator";
        }
        logMessage(JSON.stringify(value, null, '\t'));
    }, "fonts");
};
