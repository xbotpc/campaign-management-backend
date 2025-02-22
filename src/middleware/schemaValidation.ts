import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequestSchema(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array({
                onlyFirstError: true,
            }),
        });
    } else {
        next();
    }
}
