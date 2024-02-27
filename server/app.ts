import express, { Response } from "express";
import createError from "http-errors";
import path from "path";

import Config from "./utils/config";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users.js";

const config = new Config();

const app = express();

// Start of my nonsense 

const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// End of my nonsense 

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
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "content")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err: createError.HttpError, req, res: Response, next) => {
	res.locals.message = err.message;
	res.locals.error = config.isDev ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

// My Nonsense Mongodb Stuff 

	mongoose.connect('mongodb://localhost:27017', {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	})
	.then(() => {
	  console.log('Connected to MongoDB');
	})
	.catch((err) => {
	  console.error('Error connecting to MongoDB:', err);
	});

	const notesSchema = new mongoose.Schema({
	    word: String,
	    Langauge: String,
	    Gender: String
	});

	const Note = mongoose.model("Note", notesSchema);

	app.get("/", function(req, res) {
		res.send("express is working")
		
		// res.sendFile(__dirname + "index.html");  --->> to be used when 'express is working'
	})

	app.post("/", function(req, res) {
		let newNote = new Note({
			Word: req.body.word,
			Language: req.body.langauge,
			Gender: req.body.gender 
		})

		newNote.save();
		res.redirect("/")
	})


// End of my nonsense 

app.listen(
	config.port,
	() =>
		config.isDev &&
		console.log("Server is listening on http://localhost:" + config.port)
);