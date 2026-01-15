import { Outlet } from 'react-router';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 w-full">
            <div className="w-full ">
                <Outlet />
            </div>
        </div>
    );
}
