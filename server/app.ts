import cookieParser from "cookie-parser";
import express, { Response } from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import path from "path";

import contextMiddleware from "./middlewares/contextMiddleware";
import Config from "./utils/config";

import indexRouter from "./routes/index";
import vocabularyRouter from "./routes/vocabulary";

const config = new Config();
const app = express();

mongoose
	.connect(config.mongoDbConnetcionString)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

if (config.isDev) {
	const livereload = require("livereload");
	const connectLiveReload = require("connect-livereload");

	const liveReloadServer = livereload.createServer({
		exts: ["html", "css", "js", "ts", "pug"],
	});
	for (const dir of ["public", "views", "content", "server"]) {
		liveReloadServer.watch(path.join(__dirname, "..", dir));
	}

	liveReloadServer.server.once("connection", () =>
		setTimeout(() => liveReloadServer.refresh("/"), 100)
	);
	app.use(connectLiveReload());
}

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "content")));
app.use(express.static(path.join(__dirname, "..", "node_modules")));

app.use(contextMiddleware);
app.use("/", indexRouter);
app.use("/vocabulary", vocabularyRouter);

app.use((req, res, next) => {
	if (config.isDev) console.log(req.url);
	next(createError(404));
});

app.use((err: createError.HttpError, req, res: Response, next) => {
	res.locals.message = err.message;
	res.locals.error = config.isDev ? err : {};

	res.status(err.status || 500);
	res.render("error", { context: req.context });
});

app.listen(
	config.port,
	() =>
		config.isDev &&
		console.log("Server is listening on http://localhost:" + config.port)
);
