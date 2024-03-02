import { NextFunction, Response } from "express";
import { LangRequest } from "../../@types";
import Context from "../utils/context";

export default function contextMiddleware(
	req: LangRequest,
	res: Response,
	next: NextFunction
) {
	req.context = new Context(req);

	next();
}
