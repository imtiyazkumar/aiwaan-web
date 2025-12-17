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

import { Award, Building2, CheckCircle, Clock, Lightbulb, MapPin, PenTool, Sparkles, Target, Users } from 'lucide-react';
import StatCard from '~/components/cards/StatCard';
import { Flex, FlexColumn } from '~/components/general/BaseComponents';
import HeroSection from '~/components/sections/HeroSection';
import HowItWorksSection from './../components/sections/HowItWorks';
import WhyChooseUsSection from '~/components/sections/WhyChooseSection';
import ButtonBanner from '~/components/sections/BottomBanner';
import FeaturedProjects from '~/components/sections/FeaturedProjects';
import FeaturedServices from '~/components/sections/FeaturedServices';

export const stats = [
    { icon: <Award size={24} />, number: "150+", label: "Projects Completed", description: "Successfully delivered" },
    { icon: <Users size={24} />, number: "98%", label: "Client Satisfaction", description: "Happy customers" },
    { icon: <Clock size={24} />, number: "5+", label: "Years Experience", description: "In the industry" },
    { icon: <Building2 size={24} />, number: "50+", label: "Happy Clients", description: "Across Kashmir" },
];

const Home = () => {
    const whyChooseUsFeatures = [
        {
            title: "Local Expertise",
            description: "Our team brings deep knowledge of Kashmiri architecture and design aesthetics to each project, ensuring authentic and culturally rich designs.",
            icon: <MapPin size={20} className="text-primary-base" />
        },
        {
            title: "Cutting-Edge Technology",
            description: "We use the latest software and techniques to deliver stunning visual representations that exceed industry standards.",
            icon: <Lightbulb size={20} className="text-primary-base" />
        },
        {
            title: "Client-Focused Approach",
            description: "We prioritize your vision and requirements throughout the design process, ensuring complete satisfaction and collaboration.",
            icon: <Target size={20} className="text-primary-base" />
        },
        {
            title: "Timely Delivery",
            description: "We understand the importance of deadlines and ensure prompt delivery of all projects without compromising quality.",
            icon: <Clock size={20} className="text-primary-base" />
        }
    ];

    return (
        <FlexColumn className='w-full'>
            <HeroSection
                title="Transforming Spaces in"
                subtitle="Kashmir"
                description="We create exceptional architectural visualizations that bring your vision to life, from concept to completion, with a distinct Kashmiri touch and modern innovation."
                backgroundImage="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Explore Our Services"
                primaryButtonLink="/services"
                secondaryButtonText="Request a Quote"
                secondaryButtonLink="/contact"
            />

            <Flex className='gap-4'>
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        number={stat.number}
                        label={stat.label}
                        description={stat.description}
                    />
                ))}
            </Flex>

            <HowItWorksSection
                backgroundColor='white'
                topIcon={<Sparkles size={16} className="text-primary-base" />}
            ></HowItWorksSection>

            <FeaturedProjects />

            <WhyChooseUsSection
                title="Why Choose Us"
                subtitle="Aiwaan"
                features={whyChooseUsFeatures}
                image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                learnMoreLink="/about"
                learnMoreText="Learn More About Us"
                showLearnMore={true}
                imagePosition="left"
            />

            <FeaturedServices />

            <ButtonBanner
                title="Ready to Transform Your Space?"
                description="Contact us today to discuss your project needs and discover how our architectural visualization services can bring your vision to life in Sopore and beyond. Let's create something extraordinary together."
                primaryButtonText="Get Started Today"
                primaryButtonLink="/contact"
            />
        </FlexColumn>
    );
};

export default Home;
