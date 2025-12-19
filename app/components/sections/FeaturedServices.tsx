import ServiceCard from '~/components/cards/ServiceCard';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { ourServices, wrapperBaseClass } from '~/utils/constants';

const FeaturedServices = () => {

    return (
        <FlexColumn className={`${wrapperBaseClass}`}>
            <TitleCard title="Featured Services" />

            <Flex className='w-full h-full gap-4 flex-col md:flex-row'>
                {ourServices.filter(s => s.isFeatured).map((service, index) => (
                    <ServiceCard
                        title={service.title}
                        description={service.description}
                        imageUrl={service.imageUrl}
                        features={service.features}
                        buttonTitle={service.buttonTitle}
                        index={index + 1}
                        tag={service.tag}
                        onClick={service.onClick}
                    />
                ))}
            </Flex>
        </FlexColumn>
    );
};

export default FeaturedServices;
