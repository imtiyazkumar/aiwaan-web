import { ProtectedRoute } from '~/components/ProtectedRoute';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Administration</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}
