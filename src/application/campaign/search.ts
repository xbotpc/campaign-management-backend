import { findCampaign } from "../../database/campaign";

export async function search(
    { query, isActive }: { query: string; isActive?: boolean },
) {
    try {
        const results = await findCampaign({ query, isActive });
        return results;
    } catch (error) {
        throw error;
    }
}
