const clear = require('clear');
const prog = require('./Program');

module.exports = async () => {
	try {
		clear();
		// display welcome string
		await prog.displayWelcomeString();
		// what package manager is using
		await prog.askForPackage();
		// ask and install modules
		await prog.scanDirectory();
		await prog.askForDirsAnInstall();
	} catch (runError) {
		console.log(runError);
	}
};
