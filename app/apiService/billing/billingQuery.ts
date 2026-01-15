import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IBill } from "../../types/billing";
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

const useMutationCreateBill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: BillingAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BILLING_Query_Key.BILLING] });
        },
    });
};

const useMutationUpdateBill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bill: Partial<IBill> & { id: string }) => BillingAPI.update(bill.id, bill),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BILLING_Query_Key.BILLING] });
        },
    });
};

const useMutationDeleteBill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: BillingAPI.destroy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BILLING_Query_Key.BILLING] });
        },
    });
};

export default {
    useQueryGetUserBills,
    useMutationCreateBill,
    useMutationUpdateBill,
    useMutationDeleteBill,
};
