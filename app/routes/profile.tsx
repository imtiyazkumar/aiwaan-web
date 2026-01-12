import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useAuth } from '~/contexts/AuthContext';
import { useNavigate } from 'react-router';
import UserQuery from '~/apiService/user/userQuery';

function ProfileContent() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/auth/sign-in');
    }

    const { data: profile } = UserQuery.useQueryGetUser(user?.id);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            {profile?.avatar_url && <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                                <p className="mt-1 text-gray-900">{profile?.full_name || 'N/A'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Username</label>
                            <p className="mt-1 text-gray-900">{profile?.username || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Email</label>
                            <p className="mt-1 text-gray-900">{user?.email || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Website</label>
                            <p className="mt-1 text-gray-900">{profile?.website || 'N/A'}</p>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}
