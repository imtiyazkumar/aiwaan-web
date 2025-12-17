import ProjectCard from '~/components/cards/ProjectCard';
import TitleCard from '~/components/cards/TitleCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import { wrapperBaseClass } from '~/utils/constants';

const FeaturedServices = () => {

    const serviceCards = [
        {
            title: "3D Architectural Visualization",
            description:
                "Transform blueprints into photorealistic 3D renders that help clients visualize the final build before construction begins.",
            imageUrl:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80",
            index: 1,
            tag: "FEATURED",
            features: [
                "Exterior Renders",
                "Interior Views",
                "4K Output",
                "Lighting & Materials",
            ],
            buttonTitle: "Explore Service",
            onClick: () => console.log("3D Architectural Visualization"),
        },
        {
            title: "2D Floor Plans & Layouts",
            description:
                "Accurate, presentation-ready floor plans with precise dimensions and furniture layouts for residential and commercial projects.",
            imageUrl:
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=80",
            index: 2,
            tag: "ESSENTIAL",
            features: [
                "CAD Drawings",
                "Furniture Layout",
                "Clear Dimensions",
                "Print Ready",
            ],
            buttonTitle: "View Samples",
            onClick: () => console.log("2D Floor Plans & Layouts"),
        },
        {
            title: "Interior Design & Styling",
            description:
                "Curated interior concepts blending Kashmiri craftsmanship with modern aesthetics, tailored to your lifestyle and space.",
            imageUrl:
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format&fit=crop&q=80",
            index: 3,
            tag: "CREATIVE",
            features: [
                "Material Selection",
                "Color Schemes",
                "Custom Furniture",
                "Lighting Design",
            ],
            buttonTitle: "Start Your Project",
            onClick: () => console.log("Interior Design & Styling"),
        },
    ];

    return (
        <FlexColumn className={`${wrapperBaseClass}`}>
            <TitleCard title="Featured Projects" />

            <Flex className='w-full h-full gap-4'>
                {serviceCards.map((service, index) => (
                    <ProjectCard
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
