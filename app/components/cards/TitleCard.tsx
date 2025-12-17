import React from 'react'
import { Flex } from '~/components/general/BaseComponents'

interface ITitleCardProps {
    title: string;
    className?: string;
}

const TitleCard: React.FC<ITitleCardProps> = ({ title, className }) => {
    return (
        <Flex className={`items-center bg-primary-light text-primary px-4 py-2 rounded-full text-14 font-medium mb-6 ${className}`}>
            {title}
        </Flex>
    );
};

export default TitleCard;
