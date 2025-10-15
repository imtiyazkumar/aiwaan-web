import { ProtectedRoute } from '~/components/ProtectedRoute';

function BillingContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Billing</h1>
        <p className="text-gray-600">Billing information will go here.</p>
      </div>
    </div>
  );
}

export default function Billing() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}
