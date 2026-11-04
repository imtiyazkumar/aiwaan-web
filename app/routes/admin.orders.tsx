import { useNavigate } from "react-router";
import TitleCard from "~/components/cards/TitleCard";
import { Flex, FlexColumn } from "~/components/general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";
import OrderQuery from "~/apiService/order/orderQuery";
import { Table, type Column } from "~/components/ui/Table";
import { formatMoney, formatDate } from "~/utils/format";
import StatusBadge from "~/components/ui/StatusBadge";

const AdminOrders = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = OrderQuery.useQueryGetAdminOrders();
  const orders = data?.orders || [];

  const columns: Column<any>[] = [
    {
      header: "Order ID",
      accessor: (order) => (
        <span className="font-medium text-gray-900">
          #{order.id?.slice(0, 8)}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: (order) => formatMoney(order.amount),
    },
    {
      header: "Status",
      accessor: (order) => <StatusBadge status={order.status} />,
    },
    {
      header: "Service",
      accessor: (order) => order.service?.title || "—",
    },
    {
      header: "Client",
      accessor: (order) =>
        order.user?.full_name || order.user?.email || "Unassigned",
    },
    { header: "Created", accessor: (order) => formatDate(order.created_at) },
  ];

  return (
    <FlexColumn className="w-full">
      <FlexColumn className={`${wrapperBaseClass}`}>
        <Flex className="w-full justify-between items-center mb-6">
          <TitleCard title="All Orders" className="mb-0 mx-0" />
          <button
            onClick={() => navigate("/add-edit-order")}
            className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            + Add Order
          </button>
        </Flex>

        <Table
          data={orders}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRowClick={(order) => navigate(`/records/order/${order.id}`)}
          emptyMessage="No orders found."
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default AdminOrders;
