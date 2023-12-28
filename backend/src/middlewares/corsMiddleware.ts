import cors from "cors";

export const corsMiddleware = cors({
	origin: "*",
	optionsSuccessStatus: 200,
});
