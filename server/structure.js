const http = require("http");
const DB = require("./db");
const serve = require("./serve");
const path = require("path");

const db = new DB();

module.exports = structure;
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
function structure(req, res) {
	const url = (req.url ?? "").split("/").slice(1);
	const learningLanguage = url.splice(0, 1)[0];
	const readingLanguage = url.splice(0, 1)[0];
	const action = url.splice(0, 1)[0];

	switch (action) {
		case "edit":
			if (req.method === "GET") {
				serve(res, path.resolve(__dirname, "public", "edit.html"));
			} else {
			}
		default:
			break;
	}

	return res.end();
}
