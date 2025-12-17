import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { useNavigate } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";
import TitleCard from "~/components/cards/TitleCard";

interface Project {
    id: number;
    title: string;
    location: string;
    category: string;
    image: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Alpine Modern Villa",
        location: "Gulmarg, Kashmir",
        category: "Residential",
        image: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 2,
        title: "Heritage Restoration",
        location: "Downtown Srinagar",
        category: "Restoration",
        image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 3,
        title: "Urban Commercial Complex",
        location: "Residency Road",
        category: "Commercial",
        image: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 4,
        title: "Lakeside Resort",
        location: "Nigeen Lake",
        category: "Hospitality",
        image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 5,
        title: "Eco-Friendly Cottage",
        location: "Pahalgam",
        category: "Residential",
        image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
];

export default function FeaturedProjects() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const next = () => {
        if (animating) return;
        setDirection("right");
        setAnimating(true);
        setCurrent((c) => (c + 1) % projects.length);
    };

    const prev = () => {
        if (animating) return;
        setDirection("left");
        setAnimating(true);
        setCurrent((c) => (c - 1 + projects.length) % projects.length);
    };

    useEffect(() => {
        if (animating) {
            const t = setTimeout(() => setAnimating(false), 600);
            return () => clearTimeout(t);
        }
    }, [animating]);

    const getSlides = () =>
        [-1, 0, 1].map((offset) => {
            const index = (current + offset + projects.length) % projects.length;
            return { index, offset };
        });

    const navigate = useNavigate();

    return (
        <FlexColumn className={`${wrapperBaseClass}`}>
            <TitleCard title="Featured Projects" />

            <Flex className="w-full flex justify-center items-center gap-6 relative pt-2 min-h-[650px]">
                {getSlides().map(({ index, offset }) => {
                    const isCenter = offset === 0;
                    const project = projects[index];
                    const sideClass =
                        offset === -1 ? "side-left" : offset === 1 ? "side-right" : "";
                    const animClass =
                        animating && direction === "right" ? "animate-slide-left" : animating && direction === "left" ? "animate-slide-right" : "";

                    return (
                        <Div
                            key={`${index}-${offset}`}
                            onClick={() => {
                                if (offset === 1) next();
                                if (offset === -1) prev();
                            }}
                            className={`cursor-pointer flex flex-col overflow-hidden h-[650px] relative rounded-3xl shadow-xl transition-all duration-700 ease-in-out ${animClass} ${isCenter
                                ? "min-w-[70%] z-20 scale-100 opacity-100"
                                : "min-w-[15%] z-10 scale-90 opacity-60 blur-[1px] grayscale-[30%]"
                                } ${sideClass}`}
                        >
                            <Div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />

                            <Div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 text-white transition-opacity duration-500 flex flex-col gap-2 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                                <h3 className="text-3xl font-bold font-heading tracking-wide">{project.title}</h3>
                                <Div className="flex items-center gap-4 text-gray-200 mt-2">
                                    <Div className="flex items-center gap-1">
                                        <MapPin size={18} className="text-primary-base" />
                                        <span className="text-sm font-medium">{project.location}</span>
                                    </Div>
                                    <Div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                    <span className="text-sm font-medium text-primary-base uppercase tracking-wider">{project.category}</span>
                                </Div>
                            </Div>
                        </Div>
                    );
                })}
            </Flex>

            <Div className="flex items-center justify-center gap-8 mt-4">
                <button
                    onClick={prev}
                    className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex justify-center items-center text-gray-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                    aria-label="Previous project"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <Div className="flex gap-2.5">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            aria-label={`Go to project ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${idx === current
                                ? "w-12 bg-emerald-500 shadow-md"
                                : "w-2.5 bg-gray-200 hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </Div>

                <button
                    onClick={next}
                    className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex justify-center items-center text-gray-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                    aria-label="Next project"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </Div>

            <Button onClick={() => navigate("/contact")} variant="primary_filled" height="large" className="border-2 border-primary-base/10 w-fit mt-4" >
                <Flex>
                    Start Your Project
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Flex>
            </Button>
        </FlexColumn>
    );
}
