#!/usr/bin/env node

const program = require('commander');
const run = require('./lib/main');
const { version } = require('./package.json');

program
	.version(version)
	.description('Util for installing node_modules in all child directory')
	.action(()=> {
		run();
	});

program.parse(process.argv);