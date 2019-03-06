import os from 'os';

export default {
	introText: 'Welcome',
	packageJsonName: 'package.json',
	nodeModulesName: 'node_modules',
	dotGitName: '.git',
	npmCmd: os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
};
