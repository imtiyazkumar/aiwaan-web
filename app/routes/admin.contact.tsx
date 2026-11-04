import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { Table } from "~/components/ui/Table";
import { formatDate } from "~/utils/format";
import { Link } from "react-router";
interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  user: { id: string; full_name: string | null; email: string | null } | null;
}
export default function ContactInbox() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["contact"],
    queryFn: () => api.get<{ data: Message[] }>("/contact"),
  });
  return (
    <section className="w-full rounded-2xl bg-white p-5 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Contact Messages
      </h1>
      <Table
        data={data?.data || []}
        isLoading={isLoading}
        error={error}
        emptyMessage="No contact messages yet."
        onRowClick={(message) => navigate(`/records/message/${message.id}`)}
        columns={[
          {
            header: "User",
            accessor: (message) =>
              message.user ? (
                <Link
                  to={`/records/user/${message.user.id}`}
                  onClick={(event) => event.stopPropagation()}
                  className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900 hover:decoration-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
                >
                  {message.user.full_name || message.user.email || "View user"}
                </Link>
              ) : (
                <span className="text-slate-400">Guest</span>
              ),
          },
          { header: "Name", accessor: (message) => message.name || "—" },
          { header: "Email", accessor: (message) => message.email || "—" },
          { header: "Phone", accessor: (message) => message.phone || "—" },
          {
            header: "Message",
            accessor: (message) => (
              <p className="max-w-sm whitespace-normal">{message.message}</p>
            ),
          },
          {
            header: "Received",
            accessor: (message) => formatDate(message.created_at),
          },
        ]}
      />
    </section>
  );
}
