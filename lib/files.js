import fs from 'fs';
import path from 'path';

import paths from './Paths';
import c from './const';

module.exports = {
	getBaseDir() {
		return path.basename(process.cwd());
	},
	isDirectory(filePath) {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},
	scanDirectory(newPath = './') {
		return new Promise(resolve => {
			// scan current directory
			fs.readdir(newPath, async (err, items) => {
				// check every file
				for (let i=0; i < items.length; i++) {
					// edit new path for baseDir
					newPath = newPath === './' ? '.' : newPath;
					// if -> go lower dir --> else if -> add path 
					if(
						this.isDirectory(`${newPath}/${items[i]}`)
						&& items[i] !== c.nodeModulesName
						&& items[i] !== c.dotGitName) {
						await this.scanDirectory(`${newPath}/${items[i]}`);
					} else if(items[i] === c.packageJsonName) {
						// edit path for current dir
						newPath = newPath === '.' ? './' : newPath;
						paths.addPath(newPath);
					}
				}
				resolve();
			});
		});
	}
};