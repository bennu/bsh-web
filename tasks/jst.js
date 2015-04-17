module.exports = function (grunt) {

  grunt.config('jst', {
    compile: {
      files: {
        '.tmp/scripts/templates.js': ['<%= appConfig.appDir %>/scripts/templates/*.ejs']
      }
    }
  });

};
