import { ArrowRight } from 'lucide-react';
import Button from '~/components/buttons/Button';
import { Div, Flex, Span } from '~/components/general/BaseComponents'


interface IProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    tag: string;
    features: string[];
    buttonTitle: string;
    onClick: () => void;
    index: number;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ title, description, imageUrl, tag, index, features, buttonTitle, onClick }) => {
    return (
        <Flex className="group relative min-w-[500px] w-full min-h-[500px] max-w-[600px] max-h-[600px] overflow-hidden rounded-3xl shadow-xl">
            <img
                src={imageUrl}
                alt="Interior Design"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <Div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-slate-800/80 transition-colors duration-500 group-hover:from-black/10 group-hover:via-emerald-900/60" />
            <Div className="absolute bottom-12 left-0 z-10 w-full text-white">
                <Div className="px-8 pb-12">
                    <Span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold tracking-widest backdrop-blur">
                        {index}/{tag}
                    </Span>
                    <h3 className="mb-4 text-3xl font-extrabold leading-tight">{title}</h3>
                    <Div className="max-h-0 overflow-hidden opacity-0 transition-all duration-800 ease-out group-hover:max-h-[240px] group-hover:opacity-100">
                        <p className="mb-4 text-sm text-white/90">{description}</p>
                        <Flex className="flex-wrap gap-3">
                            {features.map(item => (
                                <Span key={item} className="rounded-full bg-white/15 px-4 py-2 text-xs backdrop-blur">
                                    {item}
                                </Span>
                            ))}
                        </Flex>
                    </Div>
                </Div>
                <Flex className="absolute bottom-1 right-4 w-full translate-y-10 opacity-0 transition-all justify-end duration-500 ease-out group-hover:translate-y-6 group-hover:opacity-100">
                    <Button onClick={onClick} variant="primary_filled" height="medium" className="border-2 border-primary-base/10 w-fit mt-4" >
                        <Flex>
                            {buttonTitle}
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Flex>
                    </Button>
                </Flex>
            </Div>
        </Flex>
    )
};

export default ProjectCard
