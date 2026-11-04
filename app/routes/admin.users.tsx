
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import UserQuery from '~/apiService/user/userQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminUsers = () => {
    const navigate = useNavigate();

    const { data: users, isLoading } = UserQuery.useQueryGetAdminUsers();


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
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Users" className="mb-0 mx-0" />
                    <button onClick={() => navigate('/add-edit-user')} className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium">+ Add User</button>
                </Flex>
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
