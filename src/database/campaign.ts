import { Campaign, CampaignDTO } from "../types/campaign";
import { db } from "./init";

export async function insertCampaign(
    data: CampaignDTO,
) {
    return db<Campaign>("campaigns").insert(data).returning("*");
}

export async function findCampaign(
    { query, isActive }: { query: string; isActive?: boolean },
) {
    const sqlQuery = db<Campaign>("campaigns")
        .select(["id", "title", "url", "isActive"]);

    if (query && query !== "") {
        sqlQuery
            .whereRaw(`fulltext_document @@ PLAINTO_TSQUERY(:query)`, {
                query,
            })
            .orderByRaw(
                `TS_RANK(fulltext_document, PLAINTO_TSQUERY(:query)) DESC`,
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
