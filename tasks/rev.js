module.exports = function (grunt) {

  grunt.config('rev', {
    dist: {
      files: {
        src: [
          '<%= appConfig.distDir %>/scripts/{,*/}*.js',
        ]
      }
    }
  });

};
