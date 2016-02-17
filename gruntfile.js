module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coveralls: {
            options: {
                debug: true,
                coverageDir: 'coverage',
                dryRun: true,
                force: true,
                recursive: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-karma-coveralls');
    
    // Default task(s).
    grunt.registerTask('default', ['coveralls']);

};