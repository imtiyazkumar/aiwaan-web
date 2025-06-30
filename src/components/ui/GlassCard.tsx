import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helper';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
    return (
        <motion.div
            className={cn(
                "backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl",
                hover && "hover:bg-white/20 hover:border-white/30 transition-all duration-300",
                className
            )}
            whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;