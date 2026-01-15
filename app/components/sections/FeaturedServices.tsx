import ServiceCard from '~/components/cards/ServiceCard';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { ourServices, wrapperBaseClass } from '~/utils/constants';

const FeaturedServices = () => {

    return (
        <FlexColumn className={`${wrapperBaseClass}`}>
            <TitleCard title="Featured Services" />
            <Flex className='w-full flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-4'>
                {ourServices.filter(s => s.isFeatured).map((service, index) => (
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
