/**
 * Project Aiwaan
 *
 * @author      Imtiyaz Ahmad
 * @copyright   Imtiyaz Ahmad
 *
 * Built by Imtiyaz Ahmad
 * @link https://aiwaan.in
 *
 */

import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import ProjectQuery from '~/apiService/project/projectQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminProjects = () => {
    const navigate = useNavigate();
    const { data, isLoading } = ProjectQuery.useQueryGetAdminProjects();
    const projectList = data?.projects || [];

    const columns: Column<any>[] = [
        {
            header: "Title",
            accessor: (p) => (
                <div className="flex items-center">
                    {p.cover_image && (
                        <img src={p.cover_image} alt={p.title} className="w-10 h-10 rounded object-cover mr-3" />
                    )}
                    <span className="font-medium text-gray-900">{p.title}</span>
                </div>
            )
        },
        {
            header: "Category",
            accessor: (p) => <span className="text-gray-500">{p.category}</span>
        },
        {
            header: "Client",
            accessor: (p) => <span className="text-gray-500">{p.client || '-'}</span>
        },
        {
            header: "Location",
            accessor: (p) => <span className="text-gray-500">{p.location || '-'}</span>
        },
        {
            header: "Status",
            accessor: (p) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'completed' ? 'bg-green-100 text-green-800' : p.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.status || 'Active'}
                </span>
            )
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Projects" className="mb-0 mx-0" />
                    <button
                        onClick={() => navigate('/add-edit-project')}
                        className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                        + Add Project
                    </button>
                </Flex>

                <Table
                    data={projectList}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(p) => navigate(`/add-edit-project?id=${p.id}`)}
                    emptyMessage="No projects found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminProjects;
