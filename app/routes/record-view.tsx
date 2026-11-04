import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import EntityActionsMenu from "~/components/buttons/EntityActionsMenu";
import { useAuth } from "~/contexts/AuthContext";
import { api } from "~/lib/api";
import { formatDate, formatMoney } from "~/utils/format";
import StatusBadge from "~/components/ui/StatusBadge";

interface RecordData {
  id: string;
  full_name?: string | null;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  is_admin?: boolean | null;
  message?: string;
  phone?: string | null;
  created_at?: string | null;
  amount?: number | null;
  status?: string | null;
  details?: { notes?: string } | null;
  service?: { title: string } | null;
  project?: { id: string; title: string } | null;
  user?: { id: string; full_name: string | null; email: string | null } | null;
}
function RecordContent() {
  const { id, kind } = useParams();
  const { profile } = useAuth();
  const type =
    kind === "user" ? "user" : kind === "message" ? "message" : "order";
  const config =
    type === "user"
      ? {
          resource: "users" as const,
          back: profile?.is_admin ? "/admin/users" : "/profile",
          editor: "/add-edit-user",
        }
      : type === "message"
        ? {
            resource: "contact" as const,
            back: "/admin/contact",
            editor: undefined,
          }
        : {
            resource: "orders" as const,
            back: profile?.is_admin ? "/admin/orders" : "/orders",
            editor: "/add-edit-order",
          };
  const {
    data: record,
    isLoading,
    error,
  } = useQuery({
    queryKey: [type === "user" ? "user" : config.resource, "view", id],
    enabled: !!id,
    queryFn: async () => {
      if (type === "message") {
        const { data } = await api.get<{ data: RecordData[] }>("/contact");
        const result = data.find((item) => item.id === id);
        if (!result) throw new Error("Message not found.");
        return result;
      }
      return (await api.get<{ data: RecordData }>(`/${config.resource}/${id}`))
        .data;
    },
  });
  const title =
    type === "user"
      ? record?.full_name || record?.email || "User"
      : type === "message"
        ? record?.name || "Contact message"
        : `Order #${id?.slice(-8)}`;
  return (
    <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to={config.back}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        {record && (
          <EntityActionsMenu
            resource={config.resource}
            id={record.id}
            name={title}
            editPath={
              config.editor ? `${config.editor}?id=${record.id}` : undefined
            }
            deleteRedirect={config.back}
          />
        )}
      </div>
      {isLoading ? (
        <p role="status">Loading details...</p>
      ) : error || !record ? (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
          {error?.message || "Record not found."}
        </p>
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {type === "order" && <StatusBadge status={record.status} />}
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(type === "order"
              ? [
                  ["Service", record.service?.title || "—"],
                  [
                    "Client",
                    record.user?.full_name ||
                      record.user?.email ||
                      "Unassigned",
                  ],
                  ["Amount", formatMoney(record.amount)],
                  ["Created", formatDate(record.created_at)],
                ]
              : type === "user"
                ? [
                    ["Full name", record.full_name || "—"],
                    ["Email", record.email || "—"],
                    ["Role", record.is_admin ? "Administrator" : "Client"],
                    ["Joined", formatDate(record.created_at)],
                  ]
                : [
                    ["Name", record.name || "—"],
                    ["Email", record.email || "—"],
                    ["Phone", record.phone || "—"],
                    ["Received", formatDate(record.created_at)],
                  ]
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="mb-2 text-sm text-slate-500">{label}</dt>
                <dd className="break-words text-sm font-medium text-slate-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {record.project && (
            <div className="mt-6">
              <p className="mb-2 text-sm text-slate-500">Project</p>
              <Link
                to={`/projects/${record.project.id}`}
                className="font-medium text-emerald-700 underline underline-offset-4"
              >
                {record.project.title}
              </Link>
            </div>
          )}
          {type === "message" && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {record.message}
              </p>
              {record.user && (
                <Link
                  to={`/records/user/${record.user.id}`}
                  className="mt-4 inline-block text-sm font-medium text-emerald-700 underline"
                >
                  {record.user.full_name || record.user.email || "View user"}
                </Link>
              )}
            </div>
          )}
          {record.details?.notes && (
            <p className="mt-6 whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
              {record.details.notes}
            </p>
          )}
        </>
      )}
    </section>
  );
}
export default function RecordView() {
  return (
    <ProtectedRoute>
      <RecordContent />
    </ProtectedRoute>
  );
}
