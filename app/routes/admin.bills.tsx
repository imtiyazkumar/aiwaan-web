
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import BillingQuery from '~/apiService/billing/billingQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminBills = () => {
    const navigate = useNavigate();
    const { data, isLoading } = BillingQuery.useQueryGetAdminBills();
    const bills = data?.bills || [];

    const columns: Column<any>[] = [
        {
            header: "Bill ID",
            accessor: (bill) => <span className="font-medium text-gray-900">#{bill.id?.slice(0, 8)}</span>
        },
        {
            header: "Amount",
            accessor: (bill) => <span className="text-gray-500">${bill.amount}</span>
        },
        {
            header: "Status",
            accessor: (bill) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bill.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {bill.status}
                </span>
            )
        },
        {
            header: "Due Date",
            accessor: (bill) => <span className="text-gray-500">{bill.due_date ? new Date(bill.due_date).toLocaleDateString() : 'N/A'}</span>
        },
        {
            header: "User ID",
            accessor: (bill) => <span className="text-gray-500">{bill.user_id?.slice(0, 8) || 'N/A'}</span>
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Bills" className="mb-0 mx-0" />
                    <button
                        onClick={() => navigate('/add-edit-bill')}
                        className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                        + Add Bill
                    </button>
                </Flex>

                <Table
                    data={bills}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(bill) => navigate(`/add-edit-bill?id=${bill.id}`)}
                    emptyMessage="No bills found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminBills;
