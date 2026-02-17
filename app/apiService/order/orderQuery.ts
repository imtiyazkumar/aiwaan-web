import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrderAPI from "./orderAPI";
import type { IOrder } from "./orderAPI";

const useQueryGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: OrderAPI.getAll,
    });
};

const useQueryGetAdminOrders = () => {
    return useQuery({
        queryKey: ["orders", "admin"],
        queryFn: OrderAPI.getAdminAll,
    });
};

const useQueryGetOrder = (id?: string) => {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: () => OrderAPI.getOne(id!),
        enabled: !!id,
    });
};

const useMutationCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: OrderAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};

const useMutationUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order: Partial<IOrder> & { id: string }) => OrderAPI.update(order.id, order),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["orders", variables.id] });
        },
    });
};

const useMutationDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: OrderAPI.destroy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};

const OrderQuery = {
    useQueryGetOrders,
    useQueryGetAdminOrders,
    useQueryGetOrder,
    useMutationCreateOrder,
    useMutationUpdateOrder,
    useMutationDeleteOrder,
};

export default OrderQuery;
