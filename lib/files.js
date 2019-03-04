import fs from 'fs';
import path from 'path';

module.exports = {
	getBaseDir() {
		return path.basename(process.cwd());
	},
	directoryExists : (filePath) => {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},
};