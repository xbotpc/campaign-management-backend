import { PayoutDTO } from "./payout";

export type Campaign = {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
    payoutID: string;
};

export type CampaignDTO = Pick<
    Campaign,
    "title" | "url" | "isActive"
>;

export type CampaignCreateDTO =
    & CampaignDTO
    & { payouts: PayoutDTO[] };
