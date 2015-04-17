module.exports = function (grunt) {

    grunt.config('requirejs', {
        compile: {
            options: {
                name: 'bsh',
                baseUrl: '<%= appConfig.src %>',
                out: '<%= appConfig.appDir %>/scripts/main.js',
                optimize: 'none',
                skipModuleInsertion: true,
                onModuleBundleComplete: function (data) {
                    var fs = require('fs'),
                        amdclean = require('amdclean'),
                        outputFile = data.path;

                    fs.writeFileSync(outputFile, amdclean.clean({
                        'filePath': outputFile
                    }));

                }
            }
        }
    });


};