class Paths {
	constructor() {
		this.paths = [];
	}
	addPath(path) {
		this.paths.push(path);
	}
	getPaths() {
		return this.paths;
	}
}

const paths = new Paths();

export default paths;