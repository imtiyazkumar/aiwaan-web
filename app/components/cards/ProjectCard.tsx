import { Calendar, Eye, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { Div, Flex } from "~/components/general/BaseComponents";
import GlassCard from "~/components/ui/GlassCard";
import type { IProject } from "~/types/project";

interface IProjectCardProps {
    index: number;
    project: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project, index }) => {
    const navigate = useNavigate();

    return (
        <Div
            className="group animate-scale-in h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21px)] cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/projects/${project.id}`)}
        >
            <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <Div className="relative overflow-hidden shrink-0">
                    <img
                        src={project.cover_image || ''}
                        alt={project.title}
                        className="h-48 sm:h-56 lg:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    <Div className="absolute inset-0 bg-linear-to-t from-secondary-900/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <Div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                            className="rounded-full bg-white/95 p-2.5 sm:p-3 text-primary-base shadow-lg backdrop-blur transition-transform hover:scale-110 active:scale-95"
                            aria-label="View project"
                        >
                            <Eye size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                    </Div>
                </Div>

                <Div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
                    <h3 className="mb-2 text-base sm:text-lg font-semibold text-secondary-800 transition-colors duration-300 group-hover:text-primary-base line-clamp-2">
                        {project.title}
                    </h3>

                    <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-secondary-600 line-clamp-2 grow-0">
                        {project.description}
                    </p>

                    <Div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-secondary-500">
                        <Flex className="items-center gap-2">
                            <MapPin size={14} className="text-primary-base shrink-0 sm:w-4 sm:h-4" />
                            <span className="truncate">{project.location}</span>
                        </Flex>
                        <Flex className="items-center gap-2">
                            <Calendar size={14} className="text-primary-base shrink-0 sm:w-4 sm:h-4" />
                            <span>{project.year}</span>
                        </Flex>
                    </Div>

                    <Div className="mt-auto border-t border-neutral-200 pt-2.5 sm:pt-3">
                        <span className="text-xs sm:text-sm text-secondary-500 block truncate">
                            <span className="text-secondary-400">Project type:</span> {project.category}
                        </span>
                    </Div>
                </Div>
            </GlassCard>
        </Div>
    );
};

export default ProjectCard;
