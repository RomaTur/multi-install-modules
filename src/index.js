require('@babel/polyfill');
const program = require('commander');
const run = require('./lib/main');
const version = require('../package.json').version;

program
	.version(version)
	.description('Util for installing node_modules in all child directory')
	.action(()=> {
		run();
	});

program.parse(process.argv);