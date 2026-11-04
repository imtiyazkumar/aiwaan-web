const colors: Record<string, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  overdue: "bg-red-50 text-red-700 ring-red-200",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
};
export default function StatusBadge({
  status,
}: {
  status: string | null | undefined;
}) {
  const value = status || "pending";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${colors[value] || colors.cancelled}`}
    >
      {value.replaceAll("_", " ")}
    </span>
  );
}
