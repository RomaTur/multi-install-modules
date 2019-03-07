// import clear from 'clear';
import inquirer from 'inquirer';

import introText from './introText';
import files from './files';
import c from './const';
import paths from './Paths';
import execa from 'execa';

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

	const pathsQuestions = [{
		type: 'checkbox',
		name: 'allowToInstall',
		message: 'Select paths, where node_modules will be installed, all by default:',
		choices: paths.getPaths(),
		default: paths.getPaths()
	}];

	inquirer.prompt(pathsQuestions).then(data => {
		
		if(data && data.allowToInstall && data.allowToInstall.length > 0) {
			data.allowToInstall.forEach(async el => {
				const slash = el === './' ? '' : '/';
				
				if(!files.isDirectory(`${el}${slash}node_modules`)) {
					await execa.shell(`mkdir -p ${el}${slash}node_modules`);
				}

				try {
					const {stdout} = await execa.shell(`npm install --prefix ${el}`);
					console.log(stdout);
				} catch (installError) {
					console.log(installError.message);
				}
				
			});
			// console.log();
		}
	});
	
};
