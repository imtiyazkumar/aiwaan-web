import ServiceCard from '~/components/cards/ServiceCard';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';

import ServiceQuery from "~/apiService/service/serviceQuery";

const FeaturedServices = () => {
    const { data, isLoading, error } = ServiceQuery.useQueryGetServices({});
    const services = data?.services || [];

    return (
        <FlexColumn className={`${wrapperBaseClass}`}>
            <TitleCard title="Featured Services" />
            {isLoading && <p>Loading services...</p>}
            {error && <p role="alert">{error.message}</p>}
            <Flex className='w-full flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-4'>
                {services.filter(s => s.isFeatured).map((service, index) => (
                    <ServiceCard
                        key={index}
                        service={service}
                        index={index + 1}
                    />
                ))}
            </Flex>
        </FlexColumn>


    );
};

export default FeaturedServices;
