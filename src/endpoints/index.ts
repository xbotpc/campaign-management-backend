import { Response, Router } from "express";
import { validateRequestSchema } from "../middleware/schemaValidation";
import {
    handler as postCampaignHandler,
    schemaValidation as validateCampaignCreate,
} from "./campaign/[post]";
import {
    handler as searchCampaignHandler,
    schemaValidation as validateCampaignSearch,
} from "./campaign/search.[get]";

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

router.get(
    "/campaign/search",
    validateCampaignSearch(),
    validateRequestSchema,
    searchCampaignHandler,
);
