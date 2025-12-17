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

import { Heart, Lightbulb, MapPin, Sparkles, Star, Target, Users } from "lucide-react";
import StatCard from "~/components/cards/StatCard";
import { Flex, FlexColumn } from "~/components/general/BaseComponents";
import ButtonBanner from "~/components/sections/BottomBanner";
import HeroSection from "~/components/sections/HeroSection";
import HowItWorksSection from "~/components/sections/HowItWorks";
import { OurValuesSection } from "~/components/sections/OurValuesSection";
import WhyChooseUsSection from "~/components/sections/WhyChooseSection";
import { stats } from "~/routes/home";
import { wrapperBaseClass } from "~/utils/constants";

const about = () => {
    const companyFeatures = [
        {
            title: "Our Mission",
            description: "To transform architectural visions into stunning realities through innovative design and cutting-edge visualization technology, while preserving the rich cultural heritage of Kashmir.",
            icon: <Target size={20} className="text-primary-base" />
        },
        {
            title: "Our Vision",
            description: "To become the leading architectural visualization firm in Kashmir, known for excellence, innovation, and cultural authenticity in every project we undertake.",
            icon: <Lightbulb size={20} className="text-primary-base" />
        },
        {
            title: "Our Values",
            description: "We believe in integrity, creativity, and collaboration. Every project is approached with dedication to quality and respect for our clients' unique vision and cultural context.",
            icon: <Heart size={20} className="text-primary-base" />
        },
        {
            title: "Our Commitment",
            description: "We are committed to delivering exceptional results on time, within budget, and beyond expectations. Your satisfaction is our ultimate measure of success.",
            icon: <Star size={20} className="text-primary-base" />
        }
    ];
    return (
        <FlexColumn className='w-full'>
            <HeroSection
                title="About"
                subtitle="Aiwaan"
                description="We are a passionate team of architects and designers based in the heart of Kashmir, dedicated to creating exceptional architectural visualizations that blend modern innovation with traditional Kashmiri aesthetics."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Explore Our Services"
                primaryButtonLink="/services"
                secondaryButtonText="Request a Quote"
                secondaryButtonLink="/contact"
            />

            <WhyChooseUsSection
                title="Our"
                subtitle="Story"
                features={companyFeatures}
                image="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
                learnMoreLink="/about"
                learnMoreText="Learn More About Us"
                showLearnMore={true}
                imagePosition="right"
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

            <OurValuesSection />

            <WhyChooseUsSection
                title="Kashmir"
                subtitle="Heritage"
                features={[
                    {
                        title: "Cultural Authenticity",
                        description: "Our designs reflect the rich architectural heritage of Kashmir, incorporating traditional elements like intricate woodwork, beautiful gardens, and harmonious proportions.",
                        icon: <Heart size={20} className="text-primary-base" />
                    },
                    {
                        title: "Local Materials",
                        description: "We understand the importance of using local materials and construction techniques that are suited to Kashmir's unique climate and landscape.",
                        icon: <MapPin size={20} className="text-primary-base" />
                    },
                    {
                        title: "Modern Innovation",
                        description: "While respecting tradition, we embrace modern technology and sustainable practices to create designs that are both beautiful and functional.",
                        icon: <Lightbulb size={20} className="text-primary-base" />
                    },
                    {
                        title: "Community Focus",
                        description: "We are committed to contributing to our local community by supporting local artisans, using regional resources, and creating spaces that serve the people of Kashmir.",
                        icon: <Users size={20} className="text-primary-base" />
                    }
                ]}
                image="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
                learnMoreText="Explore Our Services"
                learnMoreLink="/services"
                imagePosition="left"
            />

            <ButtonBanner
                title="Ready to Work With Us?"
                description="Join the many satisfied clients who have trusted Aiwaan with their architectural visualization needs. Let's bring your vision to life with the perfect blend of tradition and innovation."
                primaryButtonText="Start your project"
                primaryButtonLink="/contact"
                backgroundGradient="accent"
            />

        </FlexColumn>);
};

export default about;
