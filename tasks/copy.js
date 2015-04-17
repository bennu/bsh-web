module.exports = function (grunt) {

    grunt.config('copy', {
        main: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    cwd: '<%= appConfig.appDir %>',
                    dest: '<%= appConfig.distDir %>',
                    src: [
                        '*.{ico,txt,html}'
                    ]
                },
                {
                    expand: true,
                    flatten: true,
                    cwd: '<%= appConfig.appDir %>/bower_components/bsh-css',
                    src: ['*.png', 'android-chrome-manifest.json'],
                    dest: 'dist'
                }
            ]
        }
    });


};
