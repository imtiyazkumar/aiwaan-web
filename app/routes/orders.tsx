import { ProtectedRoute } from '~/components/ProtectedRoute';
import OrderQuery from '~/apiService/order/orderQuery';
import { Table } from '~/components/ui/Table';
function OrdersContent() {
 const { data, isLoading, error } = OrderQuery.useQueryGetOrders();
 return <div className="w-full bg-white rounded-2xl p-6"><h1 className="text-2xl font-bold mb-6">Your Orders</h1>
 {error && <p role="alert">{error.message}</p>}
 <Table data={data?.orders || []} isLoading={isLoading} emptyMessage="No orders have been assigned yet." columns={[
 { header: 'Order', accessor: order => order.id.slice(0, 8) },
 { header: 'Amount', accessor: order => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.amount) },
 { header: 'Status', accessor: order => order.status || 'pending' },
 { header: 'Created', accessor: order => new Date(order.created_at).toLocaleDateString() }
 ]}/></div>;
}
export default function Orders() { return <ProtectedRoute><OrdersContent /></ProtectedRoute>; }
