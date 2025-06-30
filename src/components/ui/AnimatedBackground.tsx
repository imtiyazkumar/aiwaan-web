import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-primary-200/20 rounded-full"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-40 right-20 w-16 h-16 bg-primary-base/10 rotate-45"
                animate={{
                    rotate: [45, 90, 45],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary-500/10 rounded-full"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary-600/20 rounded-full"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            {/* Gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-base/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary-500/5 to-transparent rounded-full blur-3xl" />
        </div>
    );
};

export default AnimatedBackground;