/*gruntfile配置文件*/

module.exports = function(grunt) {

  /*配置文件*/
  var configfile = 'package_djc.json';

  // Project configuration.
  grunt.initConfig({{% if (min_concat) {%}
    pkg: grunt.file.readJSON(configfile),
    banner:'/*!\n'+
      '项目工程:<%= pkg.project %>;\n'+
      '工程名称:<%= pkg.name %>;\n'+
      '版本:<%= pkg.version %>;\n' +
      '日期:<%= grunt.template.today("yyyy-mm-dd") %>;\n' +
      '版权:* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
      '授权:<%= _.pluck(pkg.license, "type").join(", ") %> */\n',
    {%} else {%}
    meta: {
      version: '0.1.0'
    },
    banner: '/*!\n'+
      '版本:<%= meta.version %>;\n' +
      '日期:<%= grunt.template.today("yyyy-mm-dd") %>;\n' +
      '版权:* Copyright (c) <%= grunt.template.today("yyyy") %>;\n' +
      '授权: Licensed MIT */\n',{%} } %}
    /*js语法检查*/
    jshint: {
    options: {
      curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          unused: true,
          boss: true,
          eqnull: true,{% if (dom) { %}
      browser: true,{% } %}
      globals: {{% if (jquery) { %}
        jQuery: true
        {% } %}}
    },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['{%= lib_dir %}/**/*.js', '{%= test_dir %}/**/*.js']
      }
    },
    {% if (dom) { %}
      {%= test_task %}:{
        files: ['{%= test_dir %}/**/*.html']
      },{% } else { %}
      {%= test_task %}: {
        files: ['{%= test_dir %}/**/*_test.js']
      },{% } %}
    /*合并js*/
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners:true
      },
      dist: {
        src: ['{%= lib_dir %}/{%= file_name %}.js'],
        dest: 'dist/{%= file_name %}.js'
      }
    },
    /*压缩js*/
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/{%= file_name %}.min.js'
      }
    },{% } %}
    /*监控文件*/
    watch: {
      less:{
        files:
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', '{%= test_task %}']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');{% } %}
  grunt.loadNpmTasks('grunt-contrib-{%= test_task %}');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', '{%= test_task %}'{%= min_concat ? ", 'concat', 'uglify'" : "" %}]);

};
