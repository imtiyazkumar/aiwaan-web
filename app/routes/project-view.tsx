import { Calendar, MapPin, User, Layers } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import GlassCard from "~/components/ui/GlassCard";
import ButtonBanner from "~/components/sections/BottomBanner";
import { ourProjects, wrapperBaseClass } from "~/utils/constants";

import React from "react";
import { useParams } from "react-router";
import ProjectGallery from "~/components/sections/ImageGallery";
import InfoRow from "~/components/cards/InfoRow";
import TitleCard from "~/components/cards/TitleCard";

const ProjectView = () => {
    const { id } = useParams();
    const project = ourProjects.find(p => p.id === id);

    if (!project) {
        return (
            <FlexColumn className="py-20 text-center">
                <h2 className="text-xl font-semibold">Project not found</h2>
            </FlexColumn>
        );
    }

    return (
        <FlexColumn className={`${wrapperBaseClass} w-full h-full`}>
            <TitleCard title="Project Overview" className="my-0" />

            <Flex className="gap-8 flex-col w-full h-full lg:flex-row">
                <Div className="w-2/3">
                    <ProjectGallery images={[project.image, ...project.images]} />
                </Div>

                <GlassCard className="flex-1 p-6 space-y-5">
                    <h3 className="text-lg font-semibold text-secondary-800">
                        {project.title}
                    </h3>

                    <p className="text-sm text-secondary-600 leading-relaxed">
                        {project.description}
                    </p>

                    <Div className="space-y-3 text-sm text-secondary-700">
                        <InfoRow icon={<MapPin size={16} />} label="Location" value={project.location} />
                        <InfoRow icon={<Calendar size={16} />} label="Year" value={project.year} />
                        <InfoRow icon={<User size={16} />} label="Client" value={project.client} />
                        <InfoRow icon={<Layers size={16} />} label="Status" value={project.status} />
                    </Div>
                </GlassCard>
            </Flex>
            <ButtonBanner
                title="Inspired by This Project?"
                description="Let us design and visualize your dream space with the same precision and creativity."
                primaryButtonText="Start Your Project"
                primaryButtonLink="/contact"
            />
        </FlexColumn>
    );
};

export default ProjectView;
