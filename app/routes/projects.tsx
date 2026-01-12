/**
 * Project Aiwaan
 *
 * @author      Imtiyaz Ahmad
 * @copyright   Imtiyaz Ahmad
 *
 * Built by Imtiyaz Ahmad
 * @link https://aiwaan.in
 *
 */

import { useNavigate } from 'react-router';
import ProjectCard from '~/components/cards/ProjectCard';
import TitleCard from '~/components/cards/TitleCard';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import ButtonBanner from '~/components/sections/BottomBanner';
import HeroSection from '~/components/sections/HeroSection';
import { wrapperBaseClass } from '~/utils/constants';
import ProjectQuery from '~/apiService/project/projectQuery';

const projects = () => {
    const navigate = useNavigate();
    const { data, isLoading } = ProjectQuery.useQueryGetProjects({});
    const projectList = data?.projects || [];

    if (isLoading) {
        return <div className="w-full text-center py-20">Loading projects...</div>;
    }

    return (
        <FlexColumn className='w-full'>
            <HeroSection
                title="Our"
                subtitle="Portfolio"
                description="Explore our collection of architectural visualization projects that showcase the beauty and innovation of Kashmiri design combined with modern techniques."
                backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Explore Our Services"
                primaryButtonLink="/services"
                secondaryButtonText="Request a Quote"
                secondaryButtonLink="/contact"
            />

            <FlexColumn className={`${wrapperBaseClass}`}>
                <TitleCard title="Our Portfolio" />
                <Flex className="flex-wrap gap-4">
                    {projectList.length === 0 ? (
                        <div className="w-full text-center py-10 text-gray-500">No projects found.</div>
                    ) : (
                        projectList.map((project, index) => (
                            <Div key={project.id} className='md:max-w-[32.7%] cursor-pointer w-full flex-col md:flex-row' onClick={() => navigate(`/projects/${project.id}`)}>
                                <ProjectCard
                                    index={index}
                                    project={{
                                        ...project,
                                        image: project.image_url || "", // Adapter for legacy component prop
                                        images: project.gallery || [],
                                        type: project.type || "", // Ensure string type, not null
                                        description: project.description || "",
                                        location: project.location || "",
                                        client: project.client || "",
                                        year: project.year || "",
                                        status: (project.status || "") as any,
                                        tags: project.tags || []
                                    } as any}
                                />
                            </Div>
                        ))
                    )}
                </Flex>
            </FlexColumn>

            <ButtonBanner
                title="Have a Project in Mind?"
                description="Ready to bring your architectural vision to life? Contact us today to discuss your project requirements and get a personalized quote for our services."
                primaryButtonText="Start New Project"
                primaryButtonLink="/contact"
                backgroundGradient="secondary"
            />

        </FlexColumn>);
};

export default projects;
