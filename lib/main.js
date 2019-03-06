// import clear from 'clear';
import inquirer from 'inquirer';

import introText from './introText';
import files from './files';
import c from './const';
import paths from './Paths';
// clear();

module.exports = async () => {
	try {
		await introText(c.introText);
	} catch (introText) {
		console.log(introText);
	}

	// console.log(files.getBaseDir());

	await files.scanDirectory();

	// console.log(paths.getPaths());

	const questions = [{
		type: 'checkbox',
		name: 'allowToInstall',
		message: 'Select paths, where node_modules will be installed, all by default:',
		choices: paths.getPaths(),
		default: paths.getPaths()
	}];

	inquirer.prompt(questions).then(data => {
		console.log(data);
		console.log(files.isDirectory('./lib/testy/node_modules'));
		if(data && data.length > 0) {
			data.forEach(el => {
				
			});
			// console.log();
		}
	});
	
};
