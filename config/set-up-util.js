const fs = require("fs");
const path = require("path");
const zlib = require("node:zlib");
const dir = path.resolve(__dirname, "..");
const distP = path.resolve(dir, "secrets.json.gz");

const args = process.argv.slice(2);
switch (args[0]) {
	case "save":
		save();
		break;
	case "load":
		load(args[1]);
		break;
}

function save() {
	const data = {};
	const secrets = [
		path.resolve(__dirname, ".env.dev"),
		path.resolve(__dirname, ".env.production"),
	];

	for (const file of secrets) {
		data[path.relative(dir, file)] = fs.readFileSync(file).toString();
	}

	zlib.gzip(JSON.stringify(data), (err, d) => fs.writeFileSync(distP, d));
}

function load(p = distP) {
	zlib.gunzip(fs.readFileSync(p), (err, d) => {
		const data = JSON.parse(d.toString());

		for (const file in data) {
			fs.writeFileSync(path.resolve(dir, file), data[file]);
		}
	});
}
