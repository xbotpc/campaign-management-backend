import type { Request, Response } from "express";
import { checkExact, query } from "express-validator";
import { search } from "../../application/campaign/search";

export function schemaValidation() {
    return checkExact([
        query("queryString")
            .optional({
                values: "falsy"
            }),
        query("isActive")
            .optional({
                values: "falsy"
            })
            .isBoolean(),
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
