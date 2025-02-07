import type { Request, Response } from "express";
import { body, checkExact } from "express-validator";
import { updateCampaign } from "../../application/campaign/update";
import { Campaign } from "../../types/campaign";
import { Payout } from "../../types/payout";

export function schemaValidation() {
    return checkExact([
        body("id")
            .isUUID().withMessage("CampaignID should be a UUID"),
        body("title")
            .optional()
            .isString().withMessage("Title should be of type string")
            .isLength({
                max: 200,
                min: 1,
            }).withMessage("Title length should be between 1 and 200"),
        body("url")
            .optional()
            .isURL().withMessage("Invalid url value"),
        body("isActive")
            .optional()
            .isBoolean().withMessage(
                "Invalid is_active value",
            ),
        body("payouts")
            .optional()
            .isArray({ min: 1 }).withMessage(
                "payouts should be an array with length at least 1",
            ),
        body("payouts.*.id")
            .optional()
            .if(body("payouts.*.country").exists())
            .if(body("payouts.*.amount").exists())
            .if(body("payouts.*.currency").exists())
            .isUUID().withMessage("PayoutID should be a UUID"),
        body("payouts.*.country")
            .optional()
            .isString().withMessage(
                "country data type should be string",
            ).isISO31661Alpha3().withMessage(
                "please provide ISO 3166-1 A3 format for country",
            ),
        body("payouts.*.amount")
            .optional()
            .isDecimal().withMessage(
                "amount data type should be decimal",
            ),
        body("payouts.*.currency")
            .optional()
            .isString().withMessage(
                "currency data type should be string",
            ).isISO4217().withMessage(
                "please provide ISO 4217 format for currency",
            ),
    ]);
}

export async function handler(req: Request, res: Response) {
    const { payouts, ...campaign } = req.body as Campaign & {
        payouts: Payout[];
    };
    await updateCampaign(campaign, payouts);
    res.status(203).send("Campaign edited");
}
