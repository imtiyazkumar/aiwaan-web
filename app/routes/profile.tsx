import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, LogOut } from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useAuth } from "~/contexts/AuthContext";
import UserQuery from "~/apiService/user/userQuery";
import Button from "~/components/buttons/Button";

function ProfileContent() {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = UserQuery.useQueryGetUser(user?.id);
  const update = UserQuery.useMutationUpdateUser();
  const [fullName, setFullName] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    setFullName(profile?.full_name || "");
  }, [profile?.full_name]);
  const changed = fullName.trim() !== (profile?.full_name || "");

  if (isLoading)
    return (
      <div
        role="status"
        className="w-full rounded-2xl bg-white p-10 text-center text-slate-500"
      >
        Loading your profile...
      </div>
    );
  if (error || !profile)
    return (
      <div
        role="alert"
        className="w-full rounded-2xl bg-white p-10 text-center"
      >
        <p className="mb-4 text-red-700">
          {error?.message || "Unable to load your profile."}
        </p>
        <Button className="mx-auto" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );

  return (
    <section className="w-full min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your Profile
          </h1>
          <p className="mt-1 break-all text-sm text-slate-500">{user?.email}</p>
          <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {profile.is_admin ? "Administrator" : "Client account"}
          </span>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          update.mutate(
            {
              id: profile.id,
              full_name: fullName.trim(),
            },
            {
              onSuccess: () => {
                void refreshProfile();
              },
            },
          );
        }}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="profile-name"
            autoComplete="name"
            required
            maxLength={120}
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
              update.reset();
            }}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <input
            id="profile-email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
          />
        </div>
        {update.error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {update.error.message}
          </p>
        )}
        {update.isSuccess && (
          <p
            role="status"
            className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700"
          >
            Your profile has been saved.
          </p>
        )}
        <Button
          type="submit"
          loading={update.isPending}
          disabled={!changed || !fullName.trim()}
          className="w-full sm:w-auto"
        >
          Save Changes
        </Button>
      </form>
      <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
        {[
          ["/orders", "Your orders"],
          ["/billing", "Your bills"],
          ["/add-edit-testimonial", "Your review"],
        ].map(([path, label]) => (
          <Link
            key={path}
            to={path}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700"
          >
            {label}
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
      <button
        type="button"
        disabled={signingOut}
        onClick={async () => {
          setSigningOut(true);
          await logout();
          navigate("/auth/sign-in");
        }}
        className="mt-6 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        <LogOut size={16} />
        {signingOut ? "Signing out..." : "Sign Out"}
      </button>
    </section>
  );
}
export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
