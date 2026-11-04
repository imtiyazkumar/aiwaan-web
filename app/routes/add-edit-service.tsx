import { Navigate, useNavigate, useSearchParams } from "react-router";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import ServiceEditor from "~/components/forms/ServiceEditor";

export default function AddService() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id");
  if (id)
    return (
      <Navigate to={`/services/${encodeURIComponent(id)}?edit=1`} replace />
    );
  return (
    <ProtectedRoute adminOnly>
      <section className="w-full rounded-2xl bg-white p-5 sm:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
          Add Service
        </h1>
        <ServiceEditor
          onSaved={(saved) => navigate(`/services/${saved}`)}
          onCancel={() => navigate("/admin/services")}
        />
      </section>
    </ProtectedRoute>
  );
}
