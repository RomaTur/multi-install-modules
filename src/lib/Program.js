const fs = require('fs');
const path = require('path');
const os = require('os');
const execa = require('execa');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const Listr = require('listr');
const c = require('./const');

class Program {

	constructor() {
		this.username = '"user"';
		// useng package manager
		this.package = 'npm';
		// node_modules paths
		this.paths = [];
		//
		this.isWinOS = os.platform().startsWith('win');
	}

	displayBlankLine() {
		console.log('');
	}

	async getUserName() {
		try {
			const whoamiCmd = this.isWinOS ? 'echo %username%' : 'whoami';
			const {stdout} = await execa.shell(whoamiCmd);
			this.username = stdout;	
		} catch (userNameError) {
			console.log(userNameError);
		}
	}

	displayWelcomeString() {
		return new Promise(async (resolve, reject) => {
			this.displayBlankLine();
			try {
				await this.getUserName();
				await new Promise(async (resolve, reject) => {
					let font = fs.readFileSync(path.join(__dirname, '../fonts/cybermedium.flf'), 'utf8');
					await figlet.parseFont('cybermedium', font);
					await figlet.text(`${c.introText} ${this.username}`, {
						font: 'cybermedium', // Varsity, Swan
					}, (err, data) => {
						if (err) {
							reject(err);
							return;
						}
						console.log(chalk.bgBlack.cyan.bold(data));
						resolve();
					}); 
				});
			} catch (introTextError) {
				this.displayBlankLine();
				reject(introTextError);
			}
			this.displayBlankLine();
			resolve();
		});
	}

	askForPackage() {
		return new Promise((resolve, reject) => {
			try {
				const packageQuestions = [{
					type: 'list',
					name: 'package',
					message: c.packagesQuestion.question,
					choices: c.packagesQuestion.list,
					default: c.packagesQuestion.default
				}];
				inquirer.prompt(packageQuestions).then(async data => {
					this.package = data.package;
					resolve();
				});
			} catch(packageError) {
				reject(packageError);
			}
		});
	}

	isDirectory(filePath) {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	}
	scanDirectory(newPath = './') {
		return new Promise((resolve, reject) => {
			// scan current directory
			try {
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
							this.paths.push(newPath);
						}
					}
					resolve();
				});	
			} catch (scanError) {
				reject(scanError);
			}
		});
	}

	askForDirsAnInstall() {
		return new Promise((resolve, reject) => {
			try {
				const pathsQuestions = [{
					type: 'checkbox',
					name: 'allowToInstall',
					message: c.dirsQuestion.question,
					choices: this.paths,
					default: this.paths
				}];
				inquirer.prompt(pathsQuestions).then(data => {
					if(data && data.allowToInstall && data.allowToInstall.length > 0) {
						const taskList = [];
						data.allowToInstall.forEach(async el => {
							taskList.push({
								title: `Installing node_modules in ${el}`,
								task: async (ctx, task) => {
									try {
										await this.installModules(el, task);
									} catch(installError) {
										task.skip(installError);
									}
								}
							});
							// await this.installModules(el);
						});
						new Listr(taskList, {
							concurrent: true
						}).run();
					}
				});
			} catch (dirsError) {
				reject(dirsError);
			}
		});
	}

	installModules(dir) {
		return new Promise(async (resolve, reject) => {
			try {
				const slash = dir === './' ? '' : '/';
				
				if(!this.isDirectory(`${dir}${slash}node_modules`)) {
					await execa.shell(`mkdir -p ${dir}${slash}node_modules`);
				}

				const cmd = this.isWinOS ? c.cmd[this.package].win : c.cmd[this.package].unix;
				const prefix = c.cmd[this.package].prefix;
				const tdr = c.cmd[this.package].targetDirRemark;
				
				await execa.shell(`${cmd} install ${prefix} ${dir}${tdr}`);
				// console.log(stdout);
				
				resolve();
			} catch (installError) {
				reject(installError);
			}
		});
	}
}

const prog = new Program();
module.exports = prog;