module.exports = function (grunt) {

    grunt.config('watch', {
        options: {
            nospawn: true,
            livereload: true
        },
        livereload: {
            options: {
                livereload: grunt.option('livereloadport') || '<%= appConfig.livereloadPort %>'
            },
            files: [
                '<%= appConfig.appDir %>/*.html',
                '{.tmp,<%= appConfig.appDir %>}/styles/{,*/}*.css',
                '{.tmp,<%= appConfig.appDir %>}/scripts/{,*/}*.js',
                '<%= appConfig.appDir %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                '<%= appConfig.appDir %>/scripts/templates/*.{ejs,mustache,hbs}'
            ]
        },
        jst: {
            files: [
                '<%= appConfig.appDir %>/scripts/templates/*.ejs'
            ],
            tasks: ['jst']
        },
        requirejs: {
            files: [
                '<%= appConfig.src %>/{,*/}*.js'
            ],
            tasks: ['requirejs']
        }
    });
};
