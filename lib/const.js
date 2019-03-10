module.exports = {
	introText: 'Hello',
	packageJsonName: 'package.json',
	nodeModulesName: 'node_modules',
	dotGitName: '.git',
	cmd: {
		npm: {
			win: 'npm.cmd',
			unix: 'npm',
			prefix: '--prefix',
			targetDirRemark: ''
		},
		yarn: {
			win: 'yarn.cmd',
			unix: 'yarn',
			prefix: '--modules-folder',
			targetDirRemark: '/node_modules'
		},
	},
	packagesQuestion: {
		question: 'What package manager do you use?',
		list: ['npm', 'yarn'],
		default: 'npm'
	},
	dirsQuestion: {
		question: 'Select paths, where node_modules will be installed, all by default:'
	}
};
