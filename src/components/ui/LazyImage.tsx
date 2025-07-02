import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/helper';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
    src, 
    alt, 
    className, 
    placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E",
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <img
            ref={imgRef}
            src={isInView ? src : placeholder}
            alt={alt}
            className={cn(
                "transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-70",
                className
            )}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            {...props}
        />
    );
};

export default LazyImage;