import fs from 'fs';
import path from 'path';

import paths from './Paths';
import c from './const';

module.exports = {
	getBaseDir() {
		return path.basename(process.cwd());
	},
	directoryExists(filePath) {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},
	test(newPath = './') {
		return new Promise((resolve, reject) => {
			fs.readdir(newPath, async (err, items) => {
				// console.log('newPath --> '+ newPath);
				// console.log(items);
				for (let i=0; i < items.length; i++) {
					newPath = newPath === './' ? '.' : newPath;
					if(
						this.directoryExists(`${newPath}/${items[i]}`)
						&& items[i] !== c.nodeModulesName
						&& items[i] !== c.dotGitName) {
						await this.test(`${newPath}/${items[i]}`);
					} else if(items[i] === c.packageJsonName) {
						newPath = newPath === '.' ? './' : newPath;
						paths.addPath(newPath);
					}
				}
				resolve();
			});
		});
	}
};