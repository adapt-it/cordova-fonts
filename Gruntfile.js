module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: 'tests/*.js'
        },
        'jasmine-server': {
            browser: false
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-cordova-jasmine');
    
    grunt.registerTask('default', 'jasmine');
};

//        grunt_cordova_jasmine: {
//            jasmine: [{
//                id: "jasmine-suite-1",
//                project: {
//                    android: {
//                        targetDir: "./temp/projects/cordova-android",
//                        name: "CordovaAndroid",
//                        package_name: "org.example.cordova.android",
//                        sdk: 'android-18',
//                        cordova_version: "3.0.0"
//                    }
//                },
//                plugin_test: {
//                    targetDir: "./temp/plugins",
//                    testsDir: "./tests",
//                    testsuite: "index.html",
//                    plugin: 'org.adaptit.cordova.fonts'
//                },
//                platforms: ["android"],
//                device_ids: {
//                    android: [/*'emulator-5556', 'emulator-5558'*/]
//                }
//            }],
//            cordova_libs: {
//                android: {
//                    path: '',
//                    git: {
//                        url: "https://github.com/tolis-e/cordova-android.git",
//                        targetDir: "./temp/cordova-libraries"
//                    }
//                }
//            }
//        },
//        grunt_android_emulator: {
//            emulators: [{
//                id: 'emulator-1',
//                create: {
//                    '--name': 'device-1',
//                    //'--sdcard': '10M',
//                    //'--snapshot': '',
//                    //'--path': 'avd',
//                    '--force': '',
//                    //'--skin': '',
//                    '--target': 'android-18',
//                    '--abi': 'armeabi-v7a'
//                },
//                start: {
//                    '-port': '5556',
//                    '-no-window': '',
//                    '-no-audio': ''
//                    //'-no-skin': ''
//                }
//            }]
//        },
//        jshint: {
//            all: {
//                src: [ "Gruntfile.js"],
//                options: {
//                    jshintrc: ".jshintrc"
//                }
//            }
//        }
//    });
//
//    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-cordova-jasmine');
//
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-android-emulator');
//    grunt.loadNpmTasks('grunt-cordova-jasmine');
//    grunt.registerTask('default', ['jshint', 'create-android-emulator:emulator-1', 'start-android-emulator:emulator-1', 'unlock-android-emulator:emulator-1', 'execute-jasmine-suite:jasmine-suite-1', 'stop-android-emulator:emulator-1']);
//};