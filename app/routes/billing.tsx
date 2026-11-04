import { RefreshCw } from "lucide-react";
import { Link } from 'react-router';
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useAuth } from "~/contexts/AuthContext";
import BillingQuery from "~/apiService/billing/billingQuery";
import { Table } from "~/components/ui/Table";
import StatusBadge from "~/components/ui/StatusBadge";
import { formatDate, formatMoney } from "~/utils/format";
import type { IBill } from '~/types/billing';

function BillingContent() {
  const { user, profile } = useAuth();
  const { data, isLoading, isFetching, error, refetch } =
    BillingQuery.useQueryGetUserBills(user?.id);
  const bills = data?.bills || [];
  const sum = (status: string[]) =>
    bills
      .filter((bill) => status.includes(bill.status || "pending"))
      .reduce((total, bill) => total + (bill.final_amount ?? bill.amount), 0);
  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your Bills
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review invoices, discounts, and payment status.
          </p>
        </div>
        <button
          type="button"
          aria-label="Refresh bills"
          title="Refresh bills"
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
            ["Outstanding", sum(["pending", "overdue"])],
            ["Paid", sum(["paid"])],
            ["Overdue", sum(["overdue"])],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {isLoading ? "—" : formatMoney(Number(value))}
              </p>
            </div>
          ))}
        </div>
      )}
      <Table
        data={bills}
        isLoading={isLoading}
        error={error}
        emptyMessage="No bills have been issued to your account yet."
        columns={[
          {
            header: "Invoice",
            accessor: (bill) => (
              <div>
                <Link to={`/billing/${bill.id}`} className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900 hover:decoration-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                  {bill.invoice_id ||
                    bill.reference_id ||
                    `#${bill.id.slice(0, 8)}`}
                </Link>
                {bill.project?.title && (
                  <p className="mt-1 text-xs text-slate-500">
                    {bill.project.title}
                  </p>
                )}
              </div>
            ),
          },
          { header: "Amount", accessor: (bill) => formatMoney(bill.amount) },
          {
            header: "Discount",
            accessor: (bill) => formatMoney(bill.discount),
          },
          {
            header: "Payable",
            accessor: (bill) => (
              <span className="font-semibold">
                {formatMoney(bill.final_amount ?? bill.amount)}
              </span>
            ),
          },
          {
            header: "Status",
            accessor: (bill) => <StatusBadge status={bill.status} />,
          },
          { header: "Due date", accessor: (bill) => formatDate(bill.due_date) },
          { header: "Paid on", accessor: (bill) => formatDate(bill.paid_at) },

        ]}
      />
    </section>
  );
}
export default function Billing() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}
