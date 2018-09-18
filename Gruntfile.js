module.exports = function(grunt){
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    concat:{
      options: {
        separator: ';'
      },
      disst: {
        src: ['src/jquery.freezetable.js', 'src/init.js'],
        dest: 'dest/libs.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dest/libs.js',
        dest: 'dest/libs.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks( "grunt-contrib-concat" );

  // 默认被执行的任务列表。
  grunt.registerTask('default', [
    'concat',
    'uglify'
  ]);
}