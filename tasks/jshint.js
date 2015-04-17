module.exports = function (grunt) {

    grunt.config('jshint', {
        files: [ 'src/**/*.js' ],
        options: {
            proto: true,
            smarttabs: true,
            boss: true,
            evil: true,
            laxbreak: true,
            undef: true,
            unused: true,
            '-W018': true,
            '-W041': false,
            eqnull: true,
            strict: true,
            globals: {
                define: true,
                _: true,
                window: true,
                console:true,
                document: true,
                JST:true,
                navigator:true

            }
        }
    });


};
