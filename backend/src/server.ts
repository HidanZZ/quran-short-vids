import express, { Express } from "express";
import "dotenv/config";

import { corsMiddleware, notFoundMiddleware } from "@/middlewares";
import { router } from "@/routes";

const app: Express = express();

app.use(
	express.json({ limit: "10mb" }),
	express.urlencoded({ limit: "10mb", extended: true }),
	corsMiddleware,
	router,
	notFoundMiddleware
);

app.listen(process.env.APP_PORT, () => {
	console.log(`Server running on port ${process.env.APP_PORT}`);
});
