module.exports = (grunt) ->

  grunt.initConfig

    svgmin:
      options:
        plugins: [{
          removeViewBox: false
        }]
      files:
        expand: true
        cwd: 'img'
        src: ['**/*.svg']
        dest: 'img'
        ext: '.svg'

    imageoptim:
      options:
        imageAlpha: true
        # jpegMini: true
        quitAfter: true
      compress:
        src: [
          'img'
        ]

    nodewebkit:
      options:
        build_dir: 'releases'
        win: false
        credits: 'credits.html'
        app_name: 'Todoifier'
        # mac_icns: ''
      src: [
        './**/*'
      ]

    watch:
      options:
        livereload: true
      css:
        files: ['css/*.css']
      js:
        files: ['**/*.js']
      html:
        files: ['*.html']

  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'smush', [
    'svgmin'
    'imageoptim'
  ]

  grunt.registerTask 'build', [
    'nodewebkit'
  ]

  grunt.registerTask 'default', [
    'watch'
  ]
