import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '~/components/buttons/Button';
import { Div, Flex, Span } from '~/components/general/BaseComponents'
import type { IService } from '~/types/service';


interface IServiceCardProps {
    index: number;
    service: IService;
}

const ServiceCard: React.FC<IServiceCardProps> = ({ service, index }) => {
    const navigate = useNavigate();

    return (
        <Flex className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21px)] min-h-100 sm:min-h-112.5 lg:min-h-125 overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl">
            <img
                src={service.imageUrl}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <Div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-slate-900/90 transition-colors duration-500 group-hover:from-black/30 group-hover:via-emerald-900/50" />

            <Div className="absolute inset-0 z-10 flex flex-col justify-end text-white p-6 sm:p-8">
                <Div className="space-y-3 sm:space-y-4">
                    <Span className="inline-block rounded-full bg-white/20 px-3 sm:px-4 py-1 sm:py-1.5 text-10 sm:text-xs font-bold tracking-widest backdrop-blur">
                        {index}/{service.tag}
                    </Span>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                        {service.title}
                    </h3>

                    {/* Expandable content on hover */}
                    <Div className="max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-out group-hover:max-h-75 group-hover:opacity-100">
                        <p className="mb-4 text-sm sm:text-base text-white/90 leading-relaxed">
                            {service.description}
                        </p>
                        <Flex className="flex-wrap gap-2">
                            {service?.features?.map(item => (
                                <Span key={item} className="rounded-full bg-white/20 px-3 py-1.5 text-xs backdrop-blur">
                                    {item}
                                </Span>
                            ))}
                        </Flex>
                    </Div>
                </Div>

                {/* Explore button */}
                <Div className="mt-6 translate-y-8 opacity-0 transition-all  duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <Button
                        onClick={() => navigate(`/services/${service.id}`)}
                        variant="primary_filled"
                        height="medium"
                        className="border-2 border-white/10 w-full sm:w-auto ml-auto"
                    >
                        <Flex className="items-center justify-center gap-2">
                            <span>Explore</span>
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Flex>
                    </Button>
                </Div>
            </Div>
        </Flex>
    )
};

export default ServiceCard
