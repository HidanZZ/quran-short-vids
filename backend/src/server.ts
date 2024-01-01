import express, { Express } from "express";
import "dotenv/config";

import { corsMiddleware, notFoundMiddleware } from "@/middlewares";
import { router } from "@/routes";
import path from "path";

const app: Express = express();
console.log(path.join(__dirname, "..", "public"));

// ...
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use(
	express.json({ limit: "10mb" }),
	express.urlencoded({ limit: "10mb", extended: true }),
	corsMiddleware,
	router,
	notFoundMiddleware
);

// Serve the public folder in the project root
console.log("dirname: ", __dirname);

app.listen(process.env.APP_PORT, () => {
	console.log(`Server running on port ${process.env.APP_PORT}`);
});
