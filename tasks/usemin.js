module.exports = function (grunt) {

    grunt.config('usemin', {
        html: ['<%= appConfig.distDir %>/{,*/}*.html'],
        options: {
            dirs: ['<%= appConfig.distDir %>']
        }
    });

};
