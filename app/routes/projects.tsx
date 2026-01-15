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
    const { data, isLoading } = ProjectQuery.useQueryGetProjects({});
    const projectList = data?.projects || [];

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
                <TitleCard title="Our Projects" />
                <Flex className='w-full flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-4'>
                    {projectList.map((project, index) => (
                        <ProjectCard
                            key={project.id || index}
                            project={project}
                            index={index}
                        />
                    ))}
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
