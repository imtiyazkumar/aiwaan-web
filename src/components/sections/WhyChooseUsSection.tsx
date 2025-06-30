import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Div } from '../general/BaseComponents';
import GradientText from '../ui/GradientText';

interface Feature {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface WhyChooseUsSectionProps {
    title?: string;
    subtitle?: string;
    features: Feature[];
    image?: string;
    learnMoreLink?: string;
    learnMoreText?: string;
    showLearnMore?: boolean;
    imagePosition?: 'left' | 'right';
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
    title = "Why Choose",
    subtitle = "Aiwaan",
    features,
    image = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    learnMoreLink = "/about",
    learnMoreText = "Learn More About Us",
    showLearnMore = true,
    imagePosition = 'right'
}) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20 px-4"
        >
            <Div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''}`}>
                <motion.div
                    initial={{ x: imagePosition === 'left' ? 50 : -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={imagePosition === 'left' ? 'lg:col-start-2' : ''}
                >
                    <h2 className="text-32 md:text-48 font-bold text-secondary-800 mb-8 font-display">
                        {title} <GradientText>{subtitle}</GradientText>
                    </h2>

                    <Div className="space-y-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: imagePosition === 'left' ? 30 : -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start group"
                            >
                                <Div className="bg-primary-100 p-3 rounded-full mt-1 mr-6 group-hover:bg-primary-200 transition-colors">
                                    {feature.icon || <CheckCircle size={20} className="text-primary-base" />}
                                </Div>
                                <Div>
                                    <h3 className="text-20 font-bold text-secondary-800 mb-2 group-hover:text-primary-base transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-14 text-secondary-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Div>
                            </motion.div>
                        ))}
                    </Div>

                    {showLearnMore && (
                        <motion.div 
                            className="mt-10"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to={learnMoreLink}
                                className="text-primary-base hover:text-primary-600 font-medium flex items-center group"
                            >
                                {learnMoreText} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div 
                    className={`relative ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}
                    initial={{ x: imagePosition === 'left' ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl z-0 animate-float"></Div>
                    <img
                        src={image}
                        alt="Why choose us"
                        className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                    />
                    <Div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-secondary-200 to-secondary-300 rounded-2xl z-0 animate-float" style={{ animationDelay: '1s' }}></Div>
                </motion.div>
            </Div>
        </motion.div>
    );
};

export default WhyChooseUsSection;