
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import UserQuery from '~/apiService/user/userQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminUsers = () => {
    const navigate = useNavigate();

    const { data: users, isLoading } = UserQuery.useQueryGetAdminUsers();

    console.log('AdminUsers users:', users);

    const columns: Column<any>[] = [
        {
            header: "Full Name",
            accessor: (user) => <span className="font-medium text-gray-900">{user.full_name || 'No Name'}</span>
        },
        {
            header: "Email",
            accessor: (user) => <span className="text-gray-500">{user.email}</span>
        },
        {
            header: "Role",
            accessor: (user) => <span className="text-gray-500 capitalize">{user.role || 'user'}</span>
        },
        {
            header: "ID",
            accessor: (user) => <span className="text-gray-400 font-mono text-xs">{user.id?.slice(0, 8)}...</span>
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Table
                    data={users ?? []}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(user) => navigate(`/add-edit-user?id=${user.id}`)}
                    emptyMessage="No users found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminUsers;
