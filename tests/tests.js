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
    describe('Fonts (window.fonts)', function () {
        it("should exist", function() {
            expect(window.fonts).toBeDefined();
        });
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
  var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    }

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    }

    var device_tests = '<h3>Press Fonts button to get the list of defined fonts</h3>' +
        '<div id="Fonts"></div>' +
        'Expected result: Status box will get updated with fonts.';

    contentEl.innerHTML = '<div id="info"></div>' + fonts;

    createActionButton('Dump device', function () {
        clearLog();
        logMessage(JSON.stringify(window.fonts, null, '\t'));
    }, "fonts");
};
