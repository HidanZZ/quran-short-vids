import { Request, Response } from "express";

export const notFoundMiddleware = (_: Request, res: Response) => {
	res.status(404).json({ message: "Route Not Found", status: 404 });
};
