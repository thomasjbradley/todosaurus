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
          './img'
        ]

    nodewebkit:
      options:
        build_dir: './releases'
        win: false
        credits: './credits.html'
        app_name: 'Todosaurus'
        mac_icns: './todosaurus.icns'
      src: [
        './**/*',
        '!./.envrc'
        '!./Gruntfile.coffee'
        '!./README.md'
        '!./tests/**/*'
        '!./releases/**/*'
      ]

    watch:
      options:
        livereload: true
      css:
        files: ['./css/*.css']
      js:
        files: [
          './controls/*.js'
          './libs/*.js'
          './models/*.js'
          './storage/*.js'
          './*.js'
        ]
      html:
        files: ['./*.html']

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
