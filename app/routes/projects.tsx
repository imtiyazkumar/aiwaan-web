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
import { ourProjects, wrapperBaseClass } from '~/utils/constants';

const projects = () => {
    const navigate = useNavigate();

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
                    {ourProjects.map((project, index) => (
                        <Div key={project.id} className='max-w-[32.7%] cursor-pointer w-full' onClick={() => navigate(`/projects/${project.id}`)}>
                            <ProjectCard index={index} project={project} />
                        </Div>
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
