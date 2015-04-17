module.exports = function (grunt) {

    grunt.config('useminPrepare', {
        html: '<%= appConfig.appDir %>/index.html',
        options: {
            dest: '<%= appConfig.distDir %>'
        }
    });

};
