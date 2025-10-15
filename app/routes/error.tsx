import { Outlet, Link } from 'react-router';

export default function ErrorLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <Outlet />
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
