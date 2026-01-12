import { useQuery } from "@tanstack/react-query";
import BillingAPI from "./billingAPI";

export const enum BILLING_Query_Key {
    BILLING = "billing",
}

const useQueryGetUserBills = (userId: string | undefined) => {
    return useQuery({
        queryKey: [BILLING_Query_Key.BILLING, userId],
        queryFn: () => BillingAPI.getUserBills(userId!),
        enabled: !!userId,
    });
};

export default {
    useQueryGetUserBills,
};
