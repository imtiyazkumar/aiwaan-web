import { RefreshCw } from "lucide-react";
import { Link } from "react-router";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import OrderQuery from "~/apiService/order/orderQuery";
import { Table } from "~/components/ui/Table";
import StatusBadge from "~/components/ui/StatusBadge";
import { formatDate, formatMoney } from "~/utils/format";
import { useAuth } from '~/contexts/AuthContext';
import type { IOrder } from '~/apiService/order/orderAPI';

function OrdersContent() {
  const { profile } = useAuth();
  const { data, isLoading, isFetching, error, refetch } =
    OrderQuery.useQueryGetOrders();
  const orders = data?.orders || [];
  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your Orders
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your services and project progress.
          </p>
        </div>
        <button
          type="button"
          aria-label="Refresh orders"
          title="Refresh orders"
          disabled={isFetching}
          onClick={() => refetch()}
          className="rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
        >
          <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
        </button>
      </div>
      {!error && (
        <div className="account-summary-grid mb-6">
          {[
            ["Total orders", orders.length],
            [
              "In progress",
              orders.filter(
                (order) => order.status === "new" || order.status === "pending",
              ).length,
            ],
            [
              "Completed",
              orders.filter((order) => order.status === "completed").length,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-5"
            >
              <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                {isLoading ? "—" : value}
              </p>
            </div>
          ))}
        </div>
      )}
      <Table
        data={orders}
        isLoading={isLoading}
        error={error}
        emptyMessage="No orders have been assigned to your account yet."
        columns={[
          {
            header: "Service / Order",
            accessor: (order) => (
              <div>
                <p className="font-medium text-slate-900">
                  {order.service?.title || "Service order"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  <Link to={`/records/order/${order.id}`} className="text-emerald-700 underline underline-offset-4">#{order.id.slice(-8)}</Link>
                </p>
                {order.details?.notes && (
                  <p className="mt-1 max-w-xs whitespace-normal text-xs text-slate-500">
                    {String(order.details.notes)}
                  </p>
                )}
              </div>
            ),
          },
          {
            header: "Project",
            accessor: (order) => order.project_id ? (
              <Link to={`/projects/${order.project_id}`} className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900 hover:decoration-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                {order.project?.title || 'View project'}
              </Link>
            ) : '—',
          },
          { header: "Amount", accessor: (order) => formatMoney(order.amount) },
          {
            header: "Status",
            accessor: (order) => <StatusBadge status={order.status} />,
          },
          {
            header: "Created",
            accessor: (order) => formatDate(order.created_at),
          },

        ]}
      />
    </section>
  );
}
export default function Orders() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
