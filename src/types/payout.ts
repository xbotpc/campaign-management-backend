export type Payout = {
    id: string;
    campaignID: string;
    country: string;
    amount: number;
    currency: string;
};

export type PayoutDTO =
    & Partial<Pick<Payout, "campaignID">>
    & Pick<
        Payout,
        "amount" | "currency" | "country"
    >;
