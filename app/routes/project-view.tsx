import { Calendar, MapPin, User, Layers, ArrowLeft } from "lucide-react";
import { Div, FlexColumn } from "~/components/general/BaseComponents";
import ButtonBanner from "~/components/sections/BottomBanner";
import { wrapperBaseClass } from "~/utils/constants";
import ProjectGallery from "~/components/sections/ImageGallery";
import InfoRow from "~/components/cards/InfoRow";
import ProjectQuery from "~/apiService/project/projectQuery";
import { useParams, useNavigate } from "react-router";

const ProjectView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: project, isLoading } = ProjectQuery.useQueryGetProject(id);

    if (isLoading) {
        return (
            <FlexColumn className={`${wrapperBaseClass}`}>
                <Div className="w-full text-center py-20 text-gray-600">Loading project...</Div>
            </FlexColumn>
        );
    }

    if (!project) {
        return (
            <Div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <Div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                    <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                    >
                        <ArrowLeft size={20} />
                        Back to Projects
                    </button>
                </Div>
            </Div>
        );
    }

    const images = [project.cover_image || "", ...(project.gallery || [])].filter(Boolean);

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <Div className="w-full bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <Div className="w-full">
                    <ProjectGallery images={images} />
                </Div>

                <Div className="p-6 sm:p-8 md:p-10 lg:p-12">
                    <Div className="mb-10 lg:mb-14 max-w-4xl">
                        <Div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Div className="w-1 h-8 bg-linear-to-b from-blue-600 to-blue-400 rounded-full" />
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                {project.title}
                            </h1>
                        </Div>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            {project.description}
                        </p>
                    </Div>

                    <Div className="mb-12 lg:mb-16">
                        <Div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <Div className="w-1 h-8 bg-linear-to-b from-emerald-600 to-emerald-400 rounded-full" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Details</h2>
                        </Div>

                        <Div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl">
                            <Div className="group flex items-start gap-4 p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                                <Div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <MapPin className="w-5 h-5" strokeWidth={2.5} />
                                </Div>
                                <Div className="pt-1">
                                    <Div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Location</Div>
                                    <Div className="text-gray-700 font-semibold">{project.location || "N/A"}</Div>
                                </Div>
                            </Div>

                            <Div className="group flex items-start gap-4 p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                                <Div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <Calendar className="w-5 h-5" strokeWidth={2.5} />
                                </Div>
                                <Div className="pt-1">
                                    <Div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Year</Div>
                                    <Div className="text-gray-700 font-semibold">{project.year || "N/A"}</Div>
                                </Div>
                            </Div>

                            <Div className="group flex items-start gap-4 p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                                <Div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <User className="w-5 h-5" strokeWidth={2.5} />
                                </Div>
                                <Div className="pt-1">
                                    <Div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Client</Div>
                                    <Div className="text-gray-700 font-semibold">{project.client || "N/A"}</Div>
                                </Div>
                            </Div>

                            <Div className="group flex items-start gap-4 p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                                <Div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <Layers className="w-5 h-5" strokeWidth={2.5} />
                                </Div>
                                <Div className="pt-1">
                                    <Div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Status</Div>
                                    <Div className="text-gray-700 font-semibold">{project.status || "N/A"}</Div>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>

            <ButtonBanner
                title="Inspired by This Project?"
                description="Let us design and visualize your dream space with the same precision and creativity."
                primaryButtonText="Start Your Project"
                primaryButtonLink="/contact"
            />
        </Div>
    );
};

export default ProjectView;
