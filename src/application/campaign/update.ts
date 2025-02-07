import { updateCampaign as campaignUpdate } from "../../database/campaign";
import { Campaign } from "../../types/campaign";
import { Payout } from "../../types/payout";

export async function updateCampaign(
    campaign: Campaign,
    payouts: Payout[],
) {
    try {
        const { id, ...rest } = campaign;
        await campaignUpdate(campaign.id, rest);
        // const payoutsWithCampaignId = payouts.map(({ id, ...payout }) => ({
        //     ...payout,
        //     campaignID,
        // }));
        // await insertPayouts(payoutsWithCampaignId);
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}
