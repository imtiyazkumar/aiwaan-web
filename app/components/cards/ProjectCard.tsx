import { Calendar, Eye, MapPin } from "lucide-react";
import { Div } from "~/components/general/BaseComponents";
import GlassCard from "~/components/ui/GlassCard";

export interface IProject {
    id: string;
    title: string;
    type: string;
    description: string;
    location: string;
    image: string;
    status: "completed" | "ongoing" | "concept";
    client: string;
    year: string;
    images: string[];
}

interface IProjectCardProps {
    index: number;
    project: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project, index }) => {
    return (
        <Div
            className="group animate-scale-in h-full"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <GlassCard className="h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <Div className="relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-56"
                        loading="lazy"
                    />

                    <Div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <Div className="absolute bottom-4 right-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                            className="rounded-full bg-white/90 p-3 text-primary-base shadow-lg backdrop-blur transition-transform hover:scale-110 active:scale-95"
                            aria-label="View project"
                        >
                            <Eye size={18} />
                        </button>
                    </Div>
                </Div>

                <Div className="flex h-full flex-col p-5 sm:p-6">
                    <h3 className="mb-2 text-base font-semibold text-secondary-800 transition-colors duration-300 group-hover:text-primary-base">
                        {project.title}
                    </h3>

                    <p className="mb-4 text-sm text-secondary-600 line-clamp-2">
                        {project.description}
                    </p>

                    <Div className="mb-4 space-y-2 text-xs text-secondary-500">
                        <Div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary-base" />
                            <span>{project.location}</span>
                        </Div>
                        <Div className="flex items-center gap-2">
                            <Calendar size={14} className="text-primary-base" />
                            <span>{project.year}</span>
                        </Div>
                    </Div>

                    <Div className="mt-auto border-t border-neutral-200 pt-3">
                        <span className="text-xs text-secondary-500">
                            Project type: {project.type}
                        </span>
                    </Div>
                </Div>
            </GlassCard>
        </Div>
    );
};

export default ProjectCard;
