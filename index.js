require('babel-register')({
	presets: [ 'es2015' ],
});
const run = require('./lib/main');
run();