import express from "express";
import DB from "../db";
import { LangRouter } from "../utils/types";

const router = express.Router();
const db = new DB();

router.post<LangRouter>("word", (req, res, next) => {
	const body = req.body;
	const lang = req.params.lang;
	const data = db.get();
	if (!data[lang][body.category]) {
		data[lang][body.category] = [];
	}

	data[lang][body.category].push(body.word);

	db.save(data);

	res.render("word");
});

const route = "/word/:id";
router.get<LangRouter<typeof route>>(route, (req, res, next) => {
	const word = db.getById(req.params.id);

	if (!word) res.render("word", { word });
});

export default router;
