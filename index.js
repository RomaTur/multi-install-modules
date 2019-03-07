#!/usr/bin/env node

require('babel-register')({
	presets: [ 'es2015' ],
});

const program = require('commander');
const run = require('./lib/main');

program
	.version('0.0.1')
	.description('Contact management system')
	.action(()=> {
		run();
	});

program.parse(process.argv);