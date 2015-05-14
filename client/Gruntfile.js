module.exports = function(grunt) {

    grunt.initConfig({
        clean: ["./modules/app/dist/**", 'index.min.html'],
        copy: {
            main: {
                src: ['index.html'],
                dest: 'index.min.html',
                rename: function (dest, src) {
                    return 'index.min.html';
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: './'
            }
        },
        usemin: {
            html: 'index.min.html',
            options: {
                dest: 'dist2'
            }
        },
        cachebreaker: {
            dev: {
                options: {
                    match: ['app.min.js', 'app.min.css']
                },
                files: {
                    src: ['index.min.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-cache-breaker');

    grunt.registerTask('default', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'cachebreaker',
    ]);
};