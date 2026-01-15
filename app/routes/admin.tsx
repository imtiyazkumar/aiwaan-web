import { ProtectedRoute } from '~/components/ProtectedRoute';
import { Outlet } from 'react-router';
import { FlexColumn } from '~/components/general/BaseComponents';

function AdminLayout() {
    return (
        <FlexColumn className="w-full justify-center items-center px-1 sm:px-2 lg:px-4 py-1 sm:py-2 gap-2 lg:py-4">
            <Outlet />
        </FlexColumn>
    );
}

export default function Admin() {
    return (
        <ProtectedRoute>
            <AdminLayout />
        </ProtectedRoute>
    );
}
