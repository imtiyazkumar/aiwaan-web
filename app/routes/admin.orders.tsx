
import { useNavigate } from "react-router";
import { Plus, Trash2 } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import OrderQuery from "~/apiService/order/orderQuery";

export default function AdminOrders() {
    const navigate = useNavigate();
    const { data, isLoading } = OrderQuery.useQueryGetOrders();
    const orders = data?.orders || [];
    const deleteMutation = OrderQuery.useMutationDeleteOrder();

    const handleDelete = (id: string) => {
        if (confirm("Delete order?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <FlexColumn className="w-full gap-6">
            <Flex className="w-full justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold">Manage Orders</h2>
                <Button onClick={() => navigate("/add-edit-order")} variant="primary_filled">
                    <Plus size={18} /> Add New Order
                </Button>
            </Flex>

            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <Div className="text-center">Loading orders...</Div>
                ) : orders.map((order) => (
                    <div key={order.id} className={`${wrapperBaseClass} !flex-row !justify-between !p-4 !my-0 bg-white border rounded-lg`}>
                        <FlexColumn>
                            <span className="font-bold">Order #{order.id.slice(0, 8)}</span>
                            <span className="text-sm text-gray-500">Amount: ${order.amount} - Status: {order.status}</span>
                        </FlexColumn>
                        <Flex className="gap-2 items-center">
                            <button onClick={() => handleDelete(order.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                        </Flex>
                    </div>
                ))}
                {!isLoading && orders.length === 0 && <Div className="text-center p-10 bg-white border border-dashed rounded-xl">No orders found.</Div>}
            </div>
        </FlexColumn>
    );
}
