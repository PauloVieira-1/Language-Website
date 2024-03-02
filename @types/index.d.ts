import { Request } from "express";
import Context from "../server/utils/context";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
	namespace Express {
		export interface Request {
			context: Context;
		}
	}
}

export type LangRequest = Request<{ lang: string }>;
