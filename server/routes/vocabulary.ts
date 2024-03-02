import express from "express";
import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
	word: String,
	language: String,
	gender: String,
});

const categorySchema = new mongoose.Schema({
	name: String,
});

const router = express.Router();
const Word = mongoose.model("Word", wordSchema);
const Category = mongoose.model("Category", categorySchema);

router
	.route("/word")
	.get((req, res, next) => {
		res.render("vocabulary/addWord", { context: req.context });
	})
	.post((req, res, next) => {
		let newNote = new Word({
			word: req.body.word,
			language: req.body.language,
			gender: req.body.gender,
		});

		newNote.save();
		res.redirect("/vocabulary/words");
	});

router.get("/words", async (req, res, next) => {
	const words = await Word.find({});

	res.render("vocabulary/words", { context: req.context, words });
});

router.get("/category:name", (req, res, next) => {
	const category = Category.find({ name: req.params.name });

	res.render("vocabulary/category", { context: req.context, category });
});

router.post("/category", (req, res, next) => {
	new Category({
		name: req.body.name,
	}).save();

	res.redirect("/vocabulary/categories");
});

router.get("/categories", async (req, res, next) => {
	const categories = await Category.find({});

	res.render("vocabulary/categories", { context: req.context, categories });
});

export default router;
