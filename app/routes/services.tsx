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

import { Sparkles } from "lucide-react";
import ServiceCard from "~/components/cards/ServiceCard";
import TitleCard from "~/components/cards/TitleCard";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import ButtonBanner from "~/components/sections/BottomBanner";
import HeroSection from "~/components/sections/HeroSection";
import HowItWorksSection from "~/components/sections/HowItWorks";
import { ourServices, wrapperBaseClass } from "~/utils/constants";

const services = () => {
    return (
        <FlexColumn className='w-full'>
            <HeroSection
                title="Our"
                subtitle="Services"
                description="Comprehensive architectural visualization services tailored for Kashmiri aesthetics and your unique needs, delivered with precision and creativity by our expert team.to completion, with a distinct Kashmiri touch and modern innovation."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Explore Our Services"
                primaryButtonLink="/services"
                secondaryButtonText="Request a Quote"
                secondaryButtonLink="/contact"
            />

            <FlexColumn className={`${wrapperBaseClass}`}>
                <TitleCard title="Our Services" />
                <Flex className="flex-wrap gap-4">
                    {ourServices.map((service, index) => (
                        <Div className='max-w-[32.7%] w-full'>
                            <ServiceCard
                                title={service.title}
                                description={service.description}
                                imageUrl={service.imageUrl}
                                features={service.features}
                                buttonTitle={service.buttonTitle}
                                index={index + 1}
                                tag={service.tag}
                                onClick={service.onClick}
                            />
                        </Div>
                    ))}
                </Flex>
            </FlexColumn>

            <HowItWorksSection
                backgroundColor='white'
                topIcon={<Sparkles size={16} className="text-primary-base" />}
            ></HowItWorksSection>

            <ButtonBanner
                title="Connect to let us serve you"
                description="Contact us today to discuss your project needs and discover how our architectural visualization services can bring your vision to life in Sopore and beyond. Let's create something extraordinary together."
                primaryButtonText="Connect now"
                primaryButtonLink="/contact"
                backgroundGradient="accent"
            />

        </FlexColumn>
    );
};

export default services;
