import type { NextFunction, Request, Response } from "express";
import { body, checkExact } from "express-validator";
import { createCampaign } from "../../application/campaign/create";
import { CampaignCreateDTO } from "../../types/campaign";

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
        body("isActive")
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
    ]);
}

export async function handler(req: Request, res: Response, next: NextFunction) {
    const { payouts, ...campaign } = req.body as CampaignCreateDTO;
    await createCampaign(campaign, payouts);
    res.status(201).send("Campaign Created");
}
