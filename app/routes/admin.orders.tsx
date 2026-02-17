
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import OrderQuery from '~/apiService/order/orderQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminOrders = () => {
    const navigate = useNavigate();
    const { data, isLoading } = OrderQuery.useQueryGetAdminOrders();
    const orders = data?.orders || [];

    const columns: Column<any>[] = [
        {
            header: "Order ID",
            accessor: (order) => <span className="font-medium text-gray-900">#{order.id?.slice(0, 8)}</span>
        },
        {
            header: "Amount",
            accessor: (order) => <span className="text-gray-500">${order.amount}</span>
        },
        {
            header: "Status",
            accessor: (order) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status || 'Pending'}
                </span>
            )
        },
        {
            header: "Service ID",
            accessor: (order) => <span className="text-gray-500">{order.service_id?.slice(0, 8)}...</span>
        },
        {
            header: "Created By",
            accessor: (order) => <span className="text-gray-500">{order.created_by?.slice(0, 8)}...</span>
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Orders" className="mb-0 mx-0" />
                    <button
                        onClick={() => navigate('/add-edit-order')}
                        className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                        + Add Order
                    </button>
                </Flex>

                <Table
                    data={orders}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(order) => navigate(`/add-edit-order?id=${order.id}`)}
                    emptyMessage="No orders found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminOrders;
