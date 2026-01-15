import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { useNavigate } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";
import TitleCard from "~/components/cards/TitleCard";
import projectQuery from "~/apiService/project/projectQuery";

export default function FeaturedProjects() {
    const { data, isLoading } = projectQuery.useQueryGetProjects({});
    const projects = data?.projects.filter(p => p.is_featured) || [];

    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [dragX, setDragX] = useState(0);
    const startX = useRef<number | null>(null);

    const next = () => {
        if (animating) return;
        setDirection("right");
        setAnimating(true);
        setCurrent(c => (c + 1) % projects.length);
    };

    const prev = () => {
        if (animating) return;
        setDirection("left");
        setAnimating(true);
        setCurrent(c => (c - 1 + projects.length) % projects.length);
    };

    useEffect(() => {
        if (animating) {
            const t = setTimeout(() => {
                setAnimating(false);
                setDragX(0);
            }, 600);
            return () => clearTimeout(t);
        }
    }, [animating]);

    const getSlides = () =>
        [-1, 0, 1].map(offset => ({
            offset,
            index: (current + offset + projects.length) % projects.length
        }));

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        setDragX(e.touches[0].clientX - startX.current);
    };

    const onTouchEnd = () => {
        if (Math.abs(dragX) > 80) {
            dragX < 0 ? next() : prev();
        } else {
            setDragX(0);
        }
        startX.current = null;
    };

    const navigate = useNavigate();

    return (

        <FlexColumn className={`${wrapperBaseClass} px-4 sm:px-6 lg:px-10`}>
            <TitleCard title="Featured Projects" />

            {(isLoading || !projects.length) ? <Div className="w-full text-center py-20 text-gray-600">Loading featured projects...</Div> :
                <Flex className="w-full justify-center items-center gap-4 sm:gap-6 relative min-h-105 sm:min-h-130 lg:min-h-162.5 overflow-hidden">
                    {getSlides().map(({ index, offset }) => {
                        const isCenter = offset === 0;
                        const project = projects[index];
                        const animClass = animating && direction === "right" ? "animate-slide-left" : animating && direction === "left" ? "animate-slide-right" : "";

                        return (
                            <Div
                                key={`${index}-${offset}`}
                                onClick={() => { if (offset === 1) next(); if (offset === -1) prev(); }}
                                onTouchStart={isCenter ? onTouchStart : undefined}
                                onTouchMove={isCenter ? onTouchMove : undefined}
                                onTouchEnd={isCenter ? onTouchEnd : undefined}
                                style={{
                                    transform: isCenter ? `translateX(${dragX}px)` : undefined,
                                    transition: animating || dragX === 0 ? "transform 0.6s ease" : "none"
                                }}
                                className={`cursor-pointer flex flex-col overflow-hidden relative rounded-2xl sm:rounded-3xl shadow-xl ${animClass} ${isCenter
                                    ? "w-full sm:w-[65%] lg:w-[70%] z-20 scale-100 opacity-100"
                                    : "hidden sm:flex sm:w-[15%] z-10 scale-90 opacity-60 blur-[1px] grayscale-30"
                                    } h-105 sm:h-130 lg:h-162.5`}
                            >
                                <Div className="absolute inset-0 bg-black/20" />
                                <img src={project.cover_image ?? ""} alt={project.title} className="w-full h-full object-cover" />

                                <Div
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    className={`absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 lg:p-8 text-white transition-opacity duration-500 flex flex-col gap-2 ${isCenter ? "opacity-100" : "opacity-0"}`}>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">{project.title}</h3>
                                    <Div className="flex flex-wrap items-center gap-3 text-gray-200 mt-1 sm:mt-2">
                                        <Div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-primary-base" />
                                            <span className="text-xs sm:text-sm font-medium">{project.location}</span>
                                        </Div>
                                        <span className="text-xs sm:text-sm font-medium text-primary-base uppercase tracking-wider">{project.category}</span>
                                    </Div>
                                </Div>
                            </Div>
                        );
                    })}
                </Flex>}

            <Div className="flex items-center justify-center gap-6 sm:gap-8 mt-2 sm:mt-4">
                <button onClick={prev} className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex justify-center items-center text-gray-600 hover:bg-emerald-500 hover:text-white transition-all duration-300">
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button onClick={next} className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex justify-center items-center text-gray-600 hover:bg-emerald-500 hover:text-white transition-all duration-300">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </Div>

            <Button onClick={() => navigate("/contact")} variant="primary_filled" height="large" className="border-2 border-primary-base/10 w-fit mt-2 sm:mt-4 mx-auto">
                <Flex className="items-center text-sm sm:text-base">
                    Start Your Project
                    <ArrowRight size={18} className="ml-2 transition-transform" />
                </Flex>
            </Button>
        </FlexColumn>
    );
}
