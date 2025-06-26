import React from "react";
import { Div, Flex } from "../components/general/BaseComponents";
import { FaBuilding, FaHome, FaShip, FaTree } from "react-icons/fa";

const Projects: React.FC = () => {
    const projects = [
        {
            id: 1,
            title: "Modern Kashmiri Villa",
            description: "A luxurious villa blending modern architecture with traditional Kashmiri elements.",
            image: "/api/placeholder/600/400",
            type: "Residential",
            icon: <FaHome />,
            completion: "2024",
        },
        {
            id: 2,
            title: "Sopore Business Hub",
            description: "A commercial hub designed to boost local businesses in Sopore.",
            image: "/api/placeholder/600/400",
            type: "Commercial",
            icon: <FaBuilding />,
            completion: "2023",
        },
        {
            id: 3,
            title: "Traditional Houseboat",
            description: "A houseboat design that preserves the heritage of Kashmir.",
            image: "/api/placeholder/600/400",
            type: "Interior",
            icon: <FaShip />,
            completion: "2024",
        },
        {
            id: 4,
            title: "Dal Lake Pavilion",
            description: "A public space designed to enhance the beauty of Dal Lake.",
            image: "/api/placeholder/600/400",
            type: "Public Space",
            icon: <FaTree />,
            completion: "2023",
        },
    ];

    return (
        <Div className="max-w-[1200px] mx-auto py-12">
            <h1 className="text-32 font-bold text-secondary-500 mb-8">Our Projects</h1>
            <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <Div className="p-4">
                            <Flex className="items-center mb-2">
                                <Div className="text-24 text-secondary-500 mr-2">{project.icon}</Div>
                                <h2 className="text-18 font-bold text-secondary-500">{project.title}</h2>
                            </Flex>
                            <p className="text-14 text-neutral-600 mt-2">{project.description}</p>
                            <Div className="mt-4 flex justify-between items-center">
                                <span className="text-12 text-neutral-500">{project.type}</span>
                                <span className="text-12 text-neutral-500">Completed: {project.completion}</span>
                            </Div>
                        </Div>
                    </Div>
                ))}
            </Div>
        </Div>
    );
};

export default Projects;
