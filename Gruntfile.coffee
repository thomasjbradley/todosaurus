module.exports = (grunt) ->

  pkg = require './package.json'
  devDeps = Object.keys(pkg.devDependencies).map (item) ->
    return '!./node_modules/' + item + '/**/*'

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
        buildDir: './releases'
        platforms: ['osx']
        macIcns: './todosaurus.icns'
        macZip: false
      src: [
        './**/*',
        '!./.envrc'
        '!./Gruntfile.coffee'
        '!./README.md'
        '!./tests/**/*'
        '!./releases/**/*'
        '!./cache/**/*'
      ].concat(devDeps)

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
