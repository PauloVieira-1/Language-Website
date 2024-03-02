import { LangRequest } from "../../@types";
import { LANGUAGES } from "./constants";

export default class Context {
	public readingLanguage: string;
	public learningLanguage: string;

	constructor(req: LangRequest) {
		this.learningLanguage = req.params.lang ?? "en";

		this.readingLanguage = req.cookies[LANGUAGES.READING];

		if (!this.readingLanguage) {
			this.readingLanguage = req.cookies[LANGUAGES.READING] = "en";
		}
	}
}
