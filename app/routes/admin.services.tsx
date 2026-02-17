
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import ServiceQuery from '~/apiService/service/serviceQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminServices = () => {
    const navigate = useNavigate();
    const { data, isLoading } = ServiceQuery.useQueryGetServices({});
    const services = data?.services || [];

    const columns: Column<any>[] = [
        {
            header: "Title",
            accessor: (s) => (
                <div className="flex items-center">
                    {s.cover_image && (
                        <img src={s.cover_image} alt={s.title} className="w-10 h-10 rounded object-cover mr-3" />
                    )}
                    <span className="font-medium text-gray-900">{s.title}</span>
                </div>
            )
        },
        {
            header: "Category",
            accessor: (s) => <span className="text-gray-500">{s.category || '-'}</span>
        },
        {
            header: "Price",
            accessor: (s) => <span className="text-gray-500">${s.price || 0}</span>
        },
        {
            header: "Status",
            accessor: (s) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {s.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Services" className="mb-0 mx-0" />
                    <button
                        onClick={() => navigate('/add-edit-service')}
                        className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                        + Add Service
                    </button>
                </Flex>

                <Table
                    data={services}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(s) => navigate(`/add-edit-service?id=${s.id}`)}
                    emptyMessage="No services found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminServices;
