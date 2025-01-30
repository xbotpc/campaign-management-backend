import type { NextFunction, Request, Response } from "express";
import { body, checkExact, query } from "express-validator";
import { search } from "../../application/campaign/search";

export function schemaValidation() {
    return checkExact([
        query("queryString")
            .optional({
                values: "null",
            }),
        query("isActive")
            .optional()
            .isBoolean().withMessage(
                "Invalid isActive value",
            ),
    ]);
}

export async function handler(req: Request, res: Response) {
    const { queryString, isActive } = req.query;
    const results = await search({
        query: queryString as string,
        isActive: isActive as unknown as boolean,
    });
    res.status(200).send(results);
}
