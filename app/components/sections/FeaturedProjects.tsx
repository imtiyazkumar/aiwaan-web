import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TitleCard from "~/components/cards/TitleCard";
import projectQuery from "~/apiService/project/projectQuery";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function FeaturedProjects() {
    const { data, isLoading, error, refetch } = projectQuery.useQueryGetProjects({});
    const projects = useMemo(() => data?.projects.filter(project => project.is_featured) || [], [data?.projects]);
    const carousel = useRef<SwiperInstance | null>(null);
    const [current, setCurrent] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const navigate = useNavigate();
    const canSlide = projects.length > 1;

    // Enough physical slides for a continuous loop, including two-project collections.
    // Cards stay mounted throughout each transition; only their transforms change.
    const slides = useMemo(() => {
        const copies = projects.length > 1 ? Math.ceil(6 / projects.length) : 1;
        return Array.from({ length: copies }, (_, copy) => projects.map(project => ({ project, key: `${project.id}-${copy}` }))).flat();
    }, [projects]);

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(preference.matches);
        update();
        preference.addEventListener("change", update);
        return () => preference.removeEventListener("change", update);
    }, []);

    const move = (direction: "previous" | "next") => {
        const instance = carousel.current;
        if (!canSlide || !instance || instance.destroyed || instance.animating) return;
        if (direction === "next") instance.slideNext();
        else instance.slidePrev();
    };

    return (
        <FlexColumn className={`${wrapperBaseClass} min-w-0 px-4 sm:px-6 lg:px-10`}>
            <TitleCard title="Featured Projects" />

            {isLoading ? (
                <Div role="status" className="featured-projects-placeholder flex w-full items-center justify-center rounded-3xl bg-slate-100 text-gray-600">Loading featured projects...</Div>
            ) : error ? (
                <Div role="alert" className="w-full py-16 text-center text-gray-600">
                    <p className="mb-4">Unable to load featured projects.</p>
                    <Button variant="dark_outlined" className="mx-auto" onClick={() => refetch()}>Try Again</Button>
                </Div>
            ) : !projects.length ? (
                <Div className="w-full py-16 text-center text-gray-600">No featured projects yet.</Div>
            ) : (
                <section
                    className="w-full min-w-0"
                    aria-label="Featured projects"
                    aria-roledescription="carousel"
                    tabIndex={canSlide ? 0 : undefined}
                    onKeyDown={event => {
                        if (canSlide && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                            event.preventDefault();
                            move(event.key === "ArrowLeft" ? "previous" : "next");
                        }
                    }}
                >
                    <Swiper
                        key={projects.map(project => project.id).join(":")}
                        className={`featured-projects-carousel ${canSlide ? "" : "featured-projects-single"}`}
                        modules={[EffectCoverflow]}
                        effect="coverflow"
                        coverflowEffect={{ rotate: 0, stretch: 0, depth: 0, scale: 0.9, modifier: 1, slideShadows: false }}
                        slidesPerView="auto"
                        centeredSlides
                        spaceBetween={16}
                        breakpoints={{ 640: { spaceBetween: 24 }, 1024: { spaceBetween: 32 } }}
                        speed={reducedMotion ? 0 : 750}
                        loop={canSlide}
                        loopPreventsSliding
                        allowTouchMove={canSlide}
                        grabCursor={canSlide}
                        threshold={8}
                        preventClicks
                        preventClicksPropagation
                        lazyPreloadPrevNext={2}
                        onSwiper={instance => { carousel.current = instance; setCurrent(instance.realIndex % projects.length); }}
                        onSlideChange={instance => setCurrent(instance.realIndex % projects.length)}
                        onBeforeDestroy={() => { carousel.current = null; }}
                    >
                        {slides.map(({ project, key }, index) => (
                            <SwiperSlide key={key}>
                                {({ isActive }) => (
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="featured-project-card relative block h-full overflow-hidden rounded-2xl bg-slate-800 shadow-lg sm:rounded-3xl focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-emerald-400"
                                        aria-label={`View ${project.title}`}
                                        aria-hidden={!isActive}
                                        tabIndex={isActive ? 0 : -1}
                                        draggable={false}
                                        onClick={event => {
                                            if (!isActive) {
                                                event.preventDefault();
                                                if (!carousel.current?.animating) carousel.current?.slideToLoop(index);
                                            }
                                        }}
                                    >
                                        {project.cover_image && <img src={project.cover_image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" draggable={false} />}
                                        <Div className="pointer-events-none absolute inset-0 bg-black/10" />
                                        <Div className="featured-project-caption absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-black/90 via-black/55 to-transparent p-5 pt-20 text-white sm:p-7 sm:pt-24 lg:p-9 lg:pt-28">
                                            <h3 className="text-xl font-bold tracking-wide sm:text-2xl lg:text-3xl">{project.title}</h3>
                                            <Div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-200">
                                                {project.location && <Flex className="gap-1.5"><MapPin size={16} className="shrink-0 text-emerald-300" /><span className="text-xs font-medium sm:text-sm">{project.location}</span></Flex>}
                                                {project.category && <span className="text-xs font-medium uppercase tracking-wider text-emerald-300 sm:text-sm">{project.category}</span>}
                                            </Div>
                                            <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium">View project <ArrowRight size={16} /></span>
                                        </Div>
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {canSlide && (
                        <Div className="mt-5 flex items-center justify-center gap-6 sm:mt-6 sm:gap-8">
                            <button type="button" onClick={() => move("previous")} aria-label="Previous featured project" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-sm transition-colors duration-200 hover:bg-emerald-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 sm:h-12 sm:w-12"><ChevronLeft size={22} /></button>
                            <p aria-live="polite" aria-atomic="true" className="min-w-12 text-center text-sm tabular-nums text-slate-500"><span className="font-semibold text-slate-900">{current + 1}</span> / {projects.length}</p>
                            <button type="button" onClick={() => move("next")} aria-label="Next featured project" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-sm transition-colors duration-200 hover:bg-emerald-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 sm:h-12 sm:w-12"><ChevronRight size={22} /></button>
                        </Div>
                    )}
                </section>
            )}

            <Button onClick={() => navigate("/contact")} variant="primary_filled" height="large" className="mx-auto mt-5 w-fit border-2 border-primary-base/10 sm:mt-6">
                <Flex className="items-center text-sm sm:text-base">Start Your Project <ArrowRight size={18} className="ml-2" /></Flex>
            </Button>
        </FlexColumn>
    );
}
