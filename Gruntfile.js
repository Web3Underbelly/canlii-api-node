// Generated on 2013-09-25 using generator-angular 0.4.0
'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			test: {
				files: ['lib/**/*', 'test/**/*test.js'],
				tasks: ['test']
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'nyan',
					require: ['should','test/blanket']
				},
				src: ['test/**/*.test.js']
			},
			'html-cov': {
				options: {
					reporter: 'html-cov',
					quiet: true,
					captureFile: 'test/coverage.html'
				},
				src: ['test/**/*.test.js']
			},
			'travis-cov': {
				options: {
					reporter: 'travis-cov'
				},
				threshold: 0,
				src: ['test/**/*.test.js']
			}
		}
	});

	grunt.registerTask('test', [
		'mochaTest'
	]);

	grunt.registerTask('monitor', [
		'watch:test'
	]);

	grunt.registerTask('default', [
		'test'
	]);
};