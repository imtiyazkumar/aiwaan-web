import { ArrowLeft, Star } from "lucide-react";
import { Link, useParams } from "react-router";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import EntityActionsMenu from "~/components/buttons/EntityActionsMenu";
import { useAuth } from "~/contexts/AuthContext";
import { useConfirmation } from "~/contexts/ConfirmationContext";
import { formatDate } from "~/utils/format";

export default function TestimonialView() {
  const { id } = useParams();
  const { profile } = useAuth();
  const confirm = useConfirmation();
  const verify = TestimonialQuery.useMutationVerifyTestimonial();
  const {
    data: review,
    isLoading,
    error,
  } = TestimonialQuery.useQueryGetTestimonialById(id);
  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/testimonials"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Client Stories
        </Link>
        {review && (
          <div className="flex items-center gap-3">
          {profile?.is_admin && !review.verified_at && (
            <button type="button" disabled={verify.isPending} className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 disabled:opacity-50" onClick={() => confirm({
              title: "Approve review?",
              description: "This review will be visible publicly in client stories.",
              confirmLabel: "Approve", pendingLabel: "Approving?", variant: "primary",
              onConfirm: () => verify.mutateAsync(review.id),
            })}>Approve review</button>
          )}
          <EntityActionsMenu
            resource="testimonials"
            id={review.id}
            name={review.client_name || "Review"}
            ownerId={review.user_id}
            editPath={`/add-edit-testimonial?id=${review.id}`}
            deleteRedirect="/testimonials"
          />
          </div>
        )}
      </div>
      {isLoading ? (
        <p role="status">Loading review...</p>
      ) : error || !review ? (
        <p role="alert" className="text-red-700">
          {error?.message || "Review not found."}
        </p>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-slate-900">
            {review.client_name || "Client Review"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {formatDate(review.created_at)} ·{" "}
            {review.verified_at ? "Approved review" : "Awaiting approval"}
          </p>
          <div
            className="my-5 flex gap-1 text-amber-500"
            aria-label={`${review.rating || 5} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={20}
                fill={index < (review.rating || 5) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="max-w-3xl whitespace-pre-wrap text-base leading-8 text-slate-700">
            {review.content}
          </p>
        </>
      )}
    </section>
  );
}
