import fs from "fs";
import path from "path";

export default class DB {
	private filePath;

	constructor() {
		this.filePath = path.resolve(__dirname, "..", "content", "data.json");
		if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, "{}");
	}

	get() {
		return fs.readFileSync(this.filePath).toJSON();
	}

	getById(id) {
		return {};
	}

	save(data) {
		fs.writeFileSync(this.filePath, data);
	}
}
