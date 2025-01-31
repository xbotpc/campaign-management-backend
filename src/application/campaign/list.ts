import { getAllCampaigns } from "../../database/campaign";

export async function list(
    { limit, offset }: { limit: number; offset: number },
) {
    try {
        limit = Math.max(limit, 50);
        const results = await getAllCampaigns({ limit, offset });
        return results;
    } catch (error) {
        throw error;
    }
}
