import { Award, Heart, Target, Users } from "lucide-react";
import TitleCard from "~/components/cards/TitleCard";
import { Flex, FlexColumn } from "~/components/general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";

export const OurValuesSection = () => {
    const values = [
        {
            icon: Target,
            title: "Excellence",
            description:
                "We strive for perfection in every project, ensuring the highest standards of design, detailing, and construction execution from concept to completion.",
        },
        {
            icon: Heart,
            title: "Sustainability",
            description:
                "Environmental responsibility is at the core of our design philosophy, guiding us to create eco-friendly, energy-efficient spaces that respect nature and community.",
        },
        {
            icon: Users,
            title: "Collaboration",
            description:
                "We work closely with our clients, architects, and consultants, understanding their vision and translating it into thoughtful, functional design solutions.",
        },
        {
            icon: Award,
            title: "Innovation",
            description:
                "We embrace modern technologies and evolving design trends while thoughtfully integrating traditional architectural values and cultural context.",
        },
    ];

    return (
        <FlexColumn className={`${wrapperBaseClass} space-y-14`}>
            <TitleCard title="Our Values" className="m-0" />

            <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                        <FlexColumn
                            key={index}
                            className="group gap-2 md:gap-4 rounded-2xl border border-gray-100 bg-white p-4 md:p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <Flex className="mx-auto FlexColumn h-14 w-14 items-center justify-center rounded-full bg-teal-50 transition-colors duration-300 group-hover:bg-teal-100">
                                <Icon className="h-7 w-7 text-teal-600" />
                            </Flex>

                            <h3 className="text-lg font-semibold text-gray-900">
                                {value.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-gray-600">
                                {value.description}
                            </p>
                        </FlexColumn>
                    );
                })}
            </div>
        </FlexColumn>
    );
};
