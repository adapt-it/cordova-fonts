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

// font list (hard-coded) from https://github.com/mozilla-b2g/moztt/blob/master/fonts.mk
var fonts = [
    "AndroidClock Regular",
    "AndroidClock-Large Regular",
    "Clockopia",
    "Droid Naskh Shift Alt",
    "Roboto Bold",
    "Roboto Bold Italic",
    "Roboto Italic",
    "Roboto Light",
    "Roboto Light Italic",
    "Roboto Regular",
    "Roboto Thin",
    "Roboto Thin Italic",
    "Roboto Condensed Bold",
    "Roboto Condensed Bold Italic",
    "Roboto Condensed Italic",
    "Roboto Condensed Regular",

    "Droid Sans Mono",
    "Droid Sans Thai",
    "Droid Sans Hebrew",
    "Droid Sans Hebrew Bold",
    "Droid Sans Armenian",
    "Droid Sans Ethiopic",
    "Droid Sans Ethiopic Bold",
    "Droid Sans Georgian",

    "Droid Serif Regular",
    "Droid Serif Bold",
    "Droid Serif Italic",
    "Droid Serif Bold Italic",

    "MotoyaLMaru W3 Mono",

    "Fira Sans Light",
    "Fira Sans Regular",
    "Fira Sans Medium",
    "Fira Sans Bold",
    "Fira Sans Light Italic",
    "Fira Sans Regular Italic",
    "Fira Sans Medium Italic",
    "Fira Sans Bold Italic",
    "Fira Mono Regular",
    "Fira Mono Medium",
    "Fira Mono Bold",

    "Charis SIL Regular",
    "Charis SIL Bold",
    "Charis SIL Italic",
    "Charis SIL Bold Italic",

    "Padauk",
    "Padauk Bold",
    "Lohit Gujarati",
    "Lohit Kannada",
    "Lohit Oriya",
    "Lohit Punjabi",
    "Lohit Telugu",
    "Noto Sans Bengali",
    "Noto Sans Bengali Bold",
    "Noto Sans Devangari",
    "Noto Sans Devangari Bold",
    "Noto Sans Khmer",
    "Noto Sans Khmer Bold",
    "Noto Sans Tamil",
    "Noto Sans Tamil Bold"
];

// BUGBUG? Not sure what to do with these fonts
//    external/moztt/AndroidFonts/MTLmr3m$(TTF_EXT):system/fonts/MTLmr3m$(TTF_EXT) \
//    external/moztt/AndroidFonts/MTLc3m$(TTF_EXT):system/fonts/MTLc3m$(TTF_EXT) \
//    external/moztt/Noto/NotoColorEmoji.ttf:system/fonts/NotoColorEmoji.ttf \
//    external/moztt/DDCUchen-1.000/DDC_Uchen$(TTF_EXT):system/fonts/DDC_Uchen$(TTF_EXT) \
//    external/moztt/Meera-06/Meera$(TTF_EXT):system/fonts/Meera$(TTF_EXT) \

function getFontList(successCB, errorCB) {
    'use strict';
    
    successCB({value: fonts});
}

var Fonts = {
    getFontList: getFontList
};

require("cordova/exec/proxy").add("Fonts", Fonts);