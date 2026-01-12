import { Calendar, MapPin, User, Layers } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import GlassCard from "~/components/ui/GlassCard";
import ButtonBanner from "~/components/sections/BottomBanner";
import { wrapperBaseClass } from "~/utils/constants";
import ProjectGallery from "~/components/sections/ImageGallery";
import InfoRow from "~/components/cards/InfoRow";
import TitleCard from "~/components/cards/TitleCard";
import ProjectQuery from "~/apiService/project/projectQuery";
import { useParams } from "react-router";

const ProjectView = () => {
    const { id } = useParams();
    const { data: project, isLoading } = ProjectQuery.useQueryGetProject(id);

    if (isLoading) {
        return <div className="w-full text-center py-20">Loading project...</div>;
    }

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
                    <ProjectGallery images={[project.image_url || "", ...(project.gallery || [])].filter(Boolean)} />
                </Div>

                <GlassCard className="flex-1 p-6 space-y-5">
                    <h3 className="text-lg font-semibold text-secondary-800">
                        {project.title}
                    </h3>

                    <p className="text-sm text-secondary-600 leading-relaxed">
                        {project.description}
                    </p>

                    <Div className="space-y-3 text-sm text-secondary-700">
                        <InfoRow icon={<MapPin size={16} />} label="Location" value={project.location || "N/A"} />
                        <InfoRow icon={<Calendar size={16} />} label="Year" value={project.year || "N/A"} />
                        <InfoRow icon={<User size={16} />} label="Client" value={project.client || "N/A"} />
                        <InfoRow icon={<Layers size={16} />} label="Status" value={project.status || "N/A"} />
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
