import type { Request, Response } from "express";
import { body } from "express-validator";

export function schemaValidation() {
    return [
        body("title")
            .exists({
                values: "null",
            }).withMessage("Title cannot be null")
            .isString().withMessage("Title should be of type string")
            .isLength({
                max: 200,
                min: 1,
            }).withMessage("Title length should be between 1 and 200"),
        body("url")
            .exists({
                values: "null",
            }).withMessage("Url cannot be null")
            .isURL().withMessage("Invalid url value"),
        body("is_active")
            .optional()
            .isBoolean().withMessage(
                "Invalid is_active value",
            ),
    ];
}

export function handler(req: Request, res: Response) {
    res.status(201).json("Created");
}
