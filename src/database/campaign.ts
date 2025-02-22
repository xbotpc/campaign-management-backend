import { Campaign, CampaignDTO } from "../types/campaign";
import { db } from "./init";

const ALLOWED_COLUMNS = ["id", "title", "url", "isActive"];

export async function insertCampaign(
    data: CampaignDTO,
) {
    return db<Campaign>("campaigns").insert(data).returning("*");
}

export async function updateCampaign(
    campaignID: string,
    updateObject: CampaignDTO,
) {
    return db<Campaign>("campaigns")
        .update(updateObject)
        .where("id", campaignID)
        .returning("*");
}

export async function getAllCampaigns(
    { limit = 50, offset = 0 }: { limit: number; offset: number },
) {
    return db<Campaign>("campaigns")
        .select(ALLOWED_COLUMNS)
        .limit(limit)
        .offset(offset)
        .orderBy("updatedAt", "DESC");
}

export async function findCampaign(
    { query, isActive }: { query: string; isActive?: boolean },
) {
    const sqlQuery = db<Campaign>("campaigns")
        .select(ALLOWED_COLUMNS);

    if (query && query !== "") {
        sqlQuery
            .whereRaw(
                `fulltext_document @@ to_tsquery(concat(plainto_tsquery(:query),':*'))`,
                {
                    query,
                },
            )
            .orderByRaw(
                `TS_RANK(fulltext_document, to_tsquery(concat(plainto_tsquery(:query),':*'))) DESC`,
                {
                    query,
                },
            );
    }

    if (isActive && isActive !== undefined) {
        sqlQuery.where("isActive", isActive);
    }
    return sqlQuery;
}
