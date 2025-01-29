import type { Request, Response } from "express";
import { body, checkExact } from "express-validator";

export function schemaValidation() {
    return checkExact([
        body("title")
            .exists({
                values: "null",
            }).withMessage("Title cannot be null or undefined")
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
        body("payouts").isArray({ min: 1 }).withMessage(
            "payouts should be an array with length at least 1",
        ),
        body("payouts.*.country")
            .isString().withMessage(
                "country data type should be string",
            ).isISO31661Alpha3().withMessage(
                "please provide ISO 3166-1 A3 format for country",
            ),
        body("payouts.*.amount")
            .isDecimal().withMessage(
                "amount data type should be decimal",
            ),
        body("payouts.*.currency")
            .isString().withMessage(
                "currency data type should be string",
            ).isISO4217().withMessage(
                "please provide ISO 4217 format for currency",
            ),
    ]);
}

export function handler(req: Request, res: Response) {
    res.status(201).json("Created");
}
