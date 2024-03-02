import { NextFunction, Request, Response } from "express";
import { LANGUAGES } from "../utils/constants";

export default function languageMiddleware(
	req: Request<{ lang?: string }>,
	res: Response,
	next: NextFunction
) {
	if (!req.params.lang) {
		let lang: string;
		if (!req.cookies[LANGUAGES.LEARNING]) {
			lang = "en";
			res.cookie(LANGUAGES.LEARNING, "en");
		}

		lang ??= req.cookies[LANGUAGES.LEARNING];
		return res.redirect("/" + lang + req.url);
	}

	next();
}
