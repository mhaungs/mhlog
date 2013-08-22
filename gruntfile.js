module.exports = function(grunt)
{
    // Configure Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/inject/dist/',
                        src: ['inject.js'],
                        dest: 'src/lib/inject/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jshint: {// configure JSHint (http://www.jshint.com/docs/)

            files: ['gruntfile.js', 'mhlog.js', 'src/js/testMhlog.js'],
            options: {
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        shell: {
            bower: {
                command: 'bower update',
                options: {
                    stdout: true
                }
            },
			npm: {
				command: 'npm update',
				options: {
					stdout: true
				}
			},
			tag: {
				command: 'git commit -a; git push; git tag -a <%=pkg.version %> -m "new mhlog tag"; git push origin <%=pkg.version %>',
				options: {
					stdout: true
				}
			}
        },
        watch: {
            files: ['<%=jshint.files %>'],
            tasks: ['jshint']
        }
    });

    // Load libs
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    // Register the default tasks
    grunt.registerTask('default', ['jshint']);

    // Register building task
    grunt.registerTask('update', ['shell:bower', 'shell:npm', 'copy', 'jshint']);

	// Create a new tag for the repository
	grunt.registerTask('tag', ['update', 'shell:tag']);
};
