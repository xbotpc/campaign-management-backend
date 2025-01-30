import { Payout, PayoutDTO } from "../types/payout";
import { db } from "./init";

export async function insertPayout(
    data: Pick<Payout, "country" | "amount" | "currency">,
) {
    return db<Payout>("campaign").insert(data).returning("*");
}

export async function insertPayouts(
    payouts: PayoutDTO[],
) {
    return db.batchInsert<Payout>("payouts", payouts, 100).returning("*");
}
