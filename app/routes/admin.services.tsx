
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import ServiceQuery from '~/apiService/service/serviceQuery';
import { Table, type Column } from '~/components/ui/Table';
import DeleteRecordButton from '~/components/buttons/DeleteRecordButton';

const AdminServices = () => {
    const navigate = useNavigate();
    const { data, isLoading } = ServiceQuery.useQueryGetAdminServices();
    const services = data?.services || [];

    const columns: Column<any>[] = [
        { header: 'Actions', accessor: s => <DeleteRecordButton resource="services" id={s.id} queryKey="service" /> },
        {
            header: "Title",
            accessor: (s) => (
                <div className="flex items-center">
                    {s.image_url && (
                        <img src={s.image_url} alt={s.title} className="w-10 h-10 rounded object-cover mr-3" />
                    )}
                    <span className="font-medium text-gray-900">{s.title}</span>
                </div>
            )
        },
        { header: "Description", accessor: (s) => <span>{s.description || '-'}</span> },
        { header: "Featured", accessor: (s) => <span>{s.is_featured ? 'Yes' : 'No'}</span> }

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
