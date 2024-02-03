const http = require("http");
const path = require("path");
const fs = require("fs");
const structure = require("./structure");

const PORT = 3000;

const server = http.createServer((req, res) => {
	console.log(req.url);

	if (req.url === "/" || !req.url) {
		return res.writeHead(302, { location: "/public/index.html" }).end();
	}

	if (req.url.startsWith("/structure")) return structure(req, res);
	if (req.url.startsWith("/public") || req.url.startsWith("/node_modules")) {
		const public = path.resolve(
			__dirname,
			"..",
			req.url.startsWith("/public") ? "public" : "node_modules"
		);

		const p = path.resolve(
			public,
			req.url.replace(/\/(public|node_modules)\//, "")
		);

		if (p.startsWith(public) && fs.existsSync(p)) {
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
					p
						.split(".")
						.filter((ext) => ext !== "map")
						.at(-1)
				],
			});

			return fs.createReadStream(p).pipe(res).once("finish", res.end);
		}
	}

	return res.writeHead(404).end();
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
