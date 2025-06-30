import React from 'react';
import { motion } from 'framer-motion';
import { Div } from '../general/BaseComponents';
import GlassCard from '../ui/GlassCard';

interface Stat {
    icon: React.ReactNode;
    number: string;
    label: string;
    description?: string;
}

interface StatsSectionProps {
    stats: Stat[];
    columns?: 2 | 3 | 4;
    backgroundColor?: 'transparent' | 'gradient' | 'white';
}

const StatsSection: React.FC<StatsSectionProps> = ({
    stats,
    columns = 4,
    backgroundColor = 'transparent'
}) => {
    const columnClasses = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4'
    };

    const backgroundClasses = {
        transparent: '',
        gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl mx-4 my-16 py-16',
        white: 'bg-white rounded-2xl mx-4 my-16 shadow-lg py-16'
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`py-16 px-4 ${backgroundClasses[backgroundColor]}`}
        >
            <Div className={`grid ${columnClasses[columns]} gap-6`}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-6 text-center group hover:shadow-lg transition-all duration-300">
                            <Div className="text-primary-base mb-3 flex justify-center group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </Div>
                            <Div className="text-32 font-bold text-secondary-800 mb-2 group-hover:text-primary-base transition-colors">
                                {stat.number}
                            </Div>
                            <Div className="text-14 text-secondary-600 font-medium mb-2">
                                {stat.label}
                            </Div>
                            {stat.description && (
                                <Div className="text-12 text-secondary-500">
                                    {stat.description}
                                </Div>
                            )}
                        </GlassCard>
                    </motion.div>
                ))}
            </Div>
        </motion.div>
    );
};

export default StatsSection;