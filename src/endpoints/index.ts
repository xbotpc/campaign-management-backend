import { Response, Router } from "express";
import {
    handler as postCampaignHandler,
    schemaValidation as validateCampaignCreate,
} from "./campaign/[post]";
import { validateRequestSchema } from "../middleware/schemaValidation";

export const router = Router();

router.get("/", (_, res: Response) => {
    res.status(200).json({ message: "OK" });
});

router.post(
    "/campaign",
    validateCampaignCreate(),
    validateRequestSchema,
    postCampaignHandler,
);
