
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';
import TestimonialQuery from '~/apiService/testimonial/testimonialQuery';
import { Table, type Column } from '~/components/ui/Table';

const AdminTestimonials = () => {
    const navigate = useNavigate();
    const { data, isLoading } = TestimonialQuery.useQueryGetAdminTestimonials();
    const testimonials = data?.testimonials || [];

    const columns: Column<any>[] = [
        {
            header: "Client Name",
            accessor: (t) => <span className="font-medium text-gray-900">{t.client_name}</span>
        },
        {
            header: "Content",
            accessor: (t) => <span className="text-gray-500 max-w-xs truncate block" title={t.content}>"{t.content}"</span>
        },
        {
            header: "Rating",
            accessor: (t) => <span className="text-gray-500">{t.rating}/5</span>
        },
        {
            header: "Status",
            accessor: (t) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {t.verified_at ? 'Verified' : 'Unverified'}
                </span>
            )
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Flex className="w-full justify-between items-center mb-6">
                    <TitleCard title="All Testimonials" className="mb-0 mx-0" />
                    <button
                        onClick={() => navigate('/add-edit-testimonial')}
                        className="bg-primary-base text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                        + Add Testimonial
                    </button>
                </Flex>

                <Table
                    data={testimonials}
                    columns={columns}
                    isLoading={isLoading}
                    onRowClick={(t) => navigate(`/add-edit-testimonial?id=${t.id}`)}
                    emptyMessage="No testimonials found."
                />
            </FlexColumn>
        </FlexColumn>);
};

export default AdminTestimonials;
