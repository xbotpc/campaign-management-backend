import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { dbConnect } from "./database/init";
import {
    handler as postCampaignHandler,
    schemaValidation as validateCampaignCreate,
} from "./endpoints/campaign/[post]";

configDotenv();
await dbConnect();

const app: Application = express();
app.use(cors());
app.use(express.json());

const port = 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.get("/", (_, res: Response) => {
    res.status(200).json({ message: "OK" });
});

function validateRequestSchema(
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

app.post(
    "/campaign",
    validateCampaignCreate(),
    validateRequestSchema,
    postCampaignHandler,
);
