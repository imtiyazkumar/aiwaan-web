import { useNavigate } from "react-router";
import TitleCard from "~/components/cards/TitleCard";
import { Flex, FlexColumn } from "~/components/general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";
import BillingQuery from "~/apiService/billing/billingQuery";
import { Table, type Column } from "~/components/ui/Table";
import { formatMoney, formatDate } from "~/utils/format";
import StatusBadge from "~/components/ui/StatusBadge";

const AdminBills = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = BillingQuery.useQueryGetAdminBills();
  const bills = data?.bills || [];

  const columns: Column<any>[] = [
    {
      header: "Invoice",
      accessor: (bill) => (
        <span className="font-medium text-gray-900">
          {bill.invoice_id || bill.reference_id || `#${bill.id.slice(0, 8)}`}
        </span>
      ),
    },
    {
      header: "Payable",
      accessor: (bill) => formatMoney(bill.final_amount ?? bill.amount),
    },
    {
      header: "Status",
      accessor: (bill) => <StatusBadge status={bill.status} />,
    },
    {
      header: "Due Date",
      accessor: (bill) => formatDate(bill.due_date),
    },
    {
      header: "Client",
      accessor: (bill) =>
        bill.user?.full_name || bill.user?.email || "Unassigned",
    },
  ];

  return (
    <FlexColumn className="w-full">
      <FlexColumn className={`${wrapperBaseClass}`}>
        <Flex className="w-full justify-between items-center mb-6">
          <TitleCard title="All Bills" className="mb-0 mx-0" />
          <button
            onClick={() => navigate("/add-edit-bill")}
            className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            + Add Bill
          </button>
        </Flex>

        <Table
          data={bills}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRowClick={(bill) => navigate(`/billing/${bill.id}`)}
          emptyMessage="No bills found."
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default AdminBills;
