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

const useQueryGetAdminBills = () => {
  return useQuery({
    queryKey: [BILLING_Query_Key.BILLING, "admin"],
    queryFn: () => BillingAPI.getAdminBills(),
  });
};

const useQueryGetBill = (id: string | undefined) =>
  useQuery({
    queryKey: [BILLING_Query_Key.BILLING, "detail", id],
    queryFn: () => BillingAPI.getOne(id!),
    enabled: !!id,
  });

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
    mutationFn: (bill: Partial<IBill> & { id: string }) =>
      BillingAPI.update(bill.id, bill),
    onSuccess: async (bill) => {
      queryClient.setQueryData<IBill>(
        [BILLING_Query_Key.BILLING, "detail", bill.id],
        (previous) => ({ ...previous, ...bill }),
      );
      await queryClient.invalidateQueries({
        queryKey: [BILLING_Query_Key.BILLING],
      });
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
  useQueryGetAdminBills,
  useQueryGetBill,
  useMutationCreateBill,
  useMutationUpdateBill,
  useMutationDeleteBill,
};
