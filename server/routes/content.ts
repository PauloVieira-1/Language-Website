import express from "express";
import DB from "../db";

const router = express.Router({ mergeParams: true });
const db = new DB();

// router.use("/vocabulary");

router.post("word", (req, res, next) => {
	const body = req.body;
	const data = db.get();
	if (!data[body.language][body.category]) {
		data[body.language][body.category] = [];
	}

	data[body.language][body.category].push(body.word);

	db.save(data);

	res.render("word");
});

router.get("/word/:id", (req, res, next) => {
	const word = db.getById(req.params);

	if (!word) res.render("word", { word });
});

export default router;
