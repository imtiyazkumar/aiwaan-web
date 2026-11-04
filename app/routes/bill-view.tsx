import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import BillingQuery from "~/apiService/billing/billingQuery";
import StatusBadge from "~/components/ui/StatusBadge";
import Button from "~/components/buttons/Button";
import { formatDate, formatMoney } from "~/utils/format";
import EntityActionsMenu from "~/components/buttons/EntityActionsMenu";
import { useAuth } from "~/contexts/AuthContext";
import { useConfirmation } from "~/contexts/ConfirmationContext";

function BillContent() {
  const { profile } = useAuth();
  const confirm = useConfirmation();
  const payment = BillingQuery.useMutationUpdateBill();
  const { id } = useParams();
  const {
    data: bill,
    isLoading,
    error,
    refetch,
  } = BillingQuery.useQueryGetBill(id);
  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/billing"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Your Bills
        </Link>
        {bill && (
          <div className="flex flex-wrap items-center gap-3">
            {profile?.is_admin && (
              <>
                {bill.status !== "paid" && (
                  <Button
                    type="button"
                    loading={payment.isPending}
                    onClick={() =>
                      confirm({
                        title: "Record payment received?",
                        description: `Confirm that the full amount of ${formatMoney(bill.final_amount ?? bill.amount)} has been received for ${bill.invoice_id || "this invoice"}. The bill will be marked as paid and the payment date recorded.`,
                        confirmLabel: "Mark as Paid",
                        pendingLabel: "Saving...",
                        variant: "primary",
                        onConfirm: () =>
                          payment.mutateAsync({ id: bill.id, status: "paid" }),
                      })
                    }
                  >
                    <CheckCircle2 size={16} className="mr-2 inline" />
                    Mark as Paid
                  </Button>
                )}
              </>
            )}
            <EntityActionsMenu
              resource="bills"
              id={bill.id}
              name={bill.invoice_id || "Invoice"}
              editPath={`/add-edit-bill?id=${bill.id}`}
              deleteRedirect="/admin/bills"
            />
          </div>
        )}
      </div>
      {payment.isSuccess && payment.variables?.id === bill?.id && (
        <p
          role="status"
          className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          Payment recorded. This invoice is now marked as paid.
        </p>
      )}
      {isLoading ? (
        <p role="status" className="py-12 text-center text-slate-500">
          Loading bill...
        </p>
      ) : error || !bill ? (
        <div role="alert" className="rounded-xl bg-red-50 p-6">
          <h1 className="mb-2 text-xl font-semibold text-slate-900">
            Unable to open this bill
          </h1>
          <p className="mb-4 text-sm text-red-700">
            {error?.message ||
              "This bill is unavailable or is not assigned to your account."}
          </p>
          <Button variant="dark_outlined" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Invoice
              </p>
              <h1 className="break-all text-2xl font-semibold tracking-tight text-slate-900">
                {bill.invoice_id ||
                  bill.reference_id ||
                  `#${bill.id.slice(0, 8)}`}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Issued {formatDate(bill.created_at)}
              </p>
            </div>
            <StatusBadge status={bill.status} />
          </div>
          <dl className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Billed to",
                bill.user?.full_name || bill.user?.email || "Your account",
              ],
              ["Project", bill.project?.title || "—"],
              ["Due date", formatDate(bill.due_date)],
              ["Paid on", formatDate(bill.paid_at)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="mb-2 text-sm text-slate-500">{label}</dt>
                <dd className="break-words text-sm font-medium text-slate-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <dl className="space-y-4">
              <div className="flex justify-between gap-4 text-sm text-slate-600">
                <dt>Amount</dt>
                <dd>{formatMoney(bill.amount)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm text-slate-600">
                <dt>Discount</dt>
                <dd>−{formatMoney(bill.discount)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <dt>Total payable</dt>
                <dd>{formatMoney(bill.final_amount ?? bill.amount)}</dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </section>
  );
}
export default function BillView() {
  return (
    <ProtectedRoute>
      <BillContent />
    </ProtectedRoute>
  );
}
