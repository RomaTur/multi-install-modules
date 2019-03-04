// import clear from 'clear';
import inquirer from 'inquirer';

import introText from './introText';
import files from './files';
import config from './config';
// clear();

module.exports = async () => {
	try {
		await introText(config.introText);
	} catch (introText) {
		console.log(introText);
	}

	console.log(files.getBaseDir());

	const questions = [{
		type: 'checkbox',
		name: 'allowToInstall',
		message: 'Select paths, where node_modules will be installed, all by default:',
		choices: ['filelist1', 'filelist2'],
		default: ['filelist1', 'filelist2']
	}];

	inquirer.prompt(questions).then(data => {
		console.log(data);
	});
};

// introText('Welcome');