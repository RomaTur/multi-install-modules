import chalk from 'chalk';
import figlet from 'figlet';

export default text => {
	return new Promise(async (resolve, reject) => {
		await figlet.text(text, {
			font: 'Swan', // Varsity, Swan
		}, (err, data) => {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				reject(text);
				return;
			}
			// console.log(chalk.redBright.bold(data));
			console.log(data);
			resolve();
		}); 
	});
};