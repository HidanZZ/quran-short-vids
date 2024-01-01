import axios from "axios";
import { Router } from "express";
import { quranapi } from "./quranapi";

const router: Router = Router();

const routes: {
	[key: string]: (router: Router) => void;
} = { quranapi };

for (const route in routes) {
	routes[route](router);
}

// router.get("/", async (_, res) => {
// 	try {
// 		const response = await axios.get(
// 			"http://python-service:5000/transcribe?audio=9.wav"
// 		);
// 		console.log(response.data);
// 		res.json({ message: "Hello World!" });
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({ message: "Internal Server Error", status: 500 });
// 	}
// });

export { router };
