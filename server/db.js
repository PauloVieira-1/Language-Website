const fs = require("fs");
const path = require("path");

class DB {
	constructor() {
		this.filePath = path.resolve(__dirname, "data.json");
		if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, "{}");
	}

	get() {
		return fs.readFileSync(this.filePath).toJSON();
	}

	save(data) {
		fs.writeFileSync(this.filePath, data);
	}
}

module.exports = DB;
