import { Campaign, CampaignDTO } from "../types/campaign";
import { db } from "./init";

export async function insertCampaign(
    data: CampaignDTO,
) {
    return db<Campaign>("campaigns").insert(data).returning("*");
}
