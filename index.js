#!/usr/bin/env node
require('babel-register')({
	presets: [ 'es2015' ],
});

const program = require('commander');
const run = require('./lib/main');
const { version } = require('./package.json');

program
	.version(version)
	.description('Contact management system')
	.action(()=> {
		run();
	});

program.parse(process.argv);