import React from "react";
import { Div, Flex } from "../components/general/BaseComponents";
import { FaDraftingCompass, FaRuler, FaCubes, FaCouch, FaBuilding } from "react-icons/fa";

const Services: React.FC = () => {
    const services = [
        {
            title: "Architectural Design",
            description: "Comprehensive architectural design services focusing on aesthetics and functionality.",
            icon: <FaDraftingCompass />,
        },
        {
            title: "2D Floor Plans",
            description: "Detailed and accurate floor plans to visualize your space effectively.",
            icon: <FaRuler />,
        },
        {
            title: "3D Modeling",
            description: "Create realistic 3D models to bring your project to life before construction.",
            icon: <FaCubes />,
        },
        {
            title: "Interior Design",
            description: "Creative and functional interior spaces tailored to your lifestyle.",
            icon: <FaCouch />,
        },
        {
            title: "Exterior Renders",
            description: "Photorealistic visualization of exterior spaces for a stunning first impression.",
            icon: <FaBuilding />,
        },
    ];

    return (
        <Div className="max-w-[1200px] mx-auto py-12">
            <h1 className="text-32 font-bold text-secondary-500 mb-8">Our Services</h1>
            <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <Div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <Flex className="items-center mb-4">
                            <Div className="text-32 text-secondary-500 mr-4">{service.icon}</Div>
                            <h2 className="text-18 font-bold text-secondary-500">{service.title}</h2>
                        </Flex>
                        <p className="text-14 text-neutral-600">{service.description}</p>
                    </Div>
                ))}
            </Div>
        </Div>
    );
};

export default Services;
