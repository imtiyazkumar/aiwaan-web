import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useAuth } from '~/contexts/AuthContext';
import BillingQuery from '~/apiService/billing/billingQuery';
import { Table } from '~/components/ui/Table';
const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
function BillingContent() {
 const { user } = useAuth();
 const { data, isLoading, error } = BillingQuery.useQueryGetUserBills(user?.id);
 return <div className="w-full bg-white rounded-2xl p-6"><h1 className="text-2xl font-bold mb-6">Your Bills</h1>
 {error && <p role="alert">{error.message}</p>}
 <Table data={data?.bills || []} isLoading={isLoading} emptyMessage="No bills have been issued yet." columns={[
 { header: 'Invoice', accessor: bill => bill.invoice_id || bill.reference_id || bill.id.slice(0, 8) },
 { header: 'Amount', accessor: bill => money(bill.final_amount ?? bill.amount) },
 { header: 'Status', accessor: bill => bill.status || 'pending' },
 { header: 'Due date', accessor: bill => bill.due_date ? new Date(bill.due_date).toLocaleDateString() : '-' }
 ]}/></div>;
}
export default function Billing() { return <ProtectedRoute><BillingContent /></ProtectedRoute>; }
