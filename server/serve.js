const fs = require("fs");
const path = require("path");

function serve(res, filePath) {
	res.writeHead(200, {
		"accept-encoding": "utf-5",
		"Content-Type": {
			js: "text/javascript",
			html: "text/html",
			css: "text/css",
			ico: "image/vnd.microsoft.icon",
			json: "application/json",
			pdf: "application/pdf",
			png: "image/png",
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
		}[
			filePath
				.split(".")
				.filter((ext) => ext !== "map")
				.at(-1)
		],
	});

	return fs.createReadStream(filePath).pipe(res).once("finish", res.end);
}

module.exports = serve;
