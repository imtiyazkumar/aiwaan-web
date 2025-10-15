import { ProtectedRoute } from '~/components/ProtectedRoute';

function AddEditProjectContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Add/Edit Project</h1>
        <p className="text-gray-600">Project form will go here.</p>
      </div>
    </div>
  );
}

export default function AddEditProject() {
  return (
    <ProtectedRoute>
      <AddEditProjectContent />
    </ProtectedRoute>
  );
}
