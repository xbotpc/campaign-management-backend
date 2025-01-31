import type { Request, Response } from "express";
import { checkExact, query } from "express-validator";
import { list } from "../../application/campaign/list";

export function schemaValidation() {
    return checkExact([
        query("limit")
            .exists()
            .isInt(),
        query("offset")
            .exists()
            .isInt(),
    ]);
}

export async function handler(req: Request, res: Response) {
    const { limit, offset } = req.query;
    const results = await list({
        limit: Number(limit),
        offset: Number(offset),
    });
    res.status(200).send(results);
}
