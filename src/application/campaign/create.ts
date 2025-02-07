import { insertCampaign } from "../../database/campaign";
import { insertPayouts } from "../../database/payout";
import { CampaignDTO } from "../../types/campaign";
import { PayoutDTO } from "../../types/payout";

export async function createCampaign(
    campaign: CampaignDTO,
    payouts: PayoutDTO[],
) {
    try {
        const { title, url, isActive } = campaign;

        const [{ id: campaignID }] = await insertCampaign({
            title,
            url,
            isActive: isActive || false,
        });
        const payoutsWithCampaignId = payouts.map(({ id, ...payout }) => ({
            ...payout,
            campaignID,
        }));
        await insertPayouts(payoutsWithCampaignId);
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}
