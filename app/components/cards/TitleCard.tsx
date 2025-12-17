import React from 'react'
import { Flex } from '~/components/general/BaseComponents'

interface ITitleCardProps {
    title: string
}

const TitleCard: React.FC<ITitleCardProps> = ({ title }) => {
    return (
        <Flex className="items-center bg-primary-light text-primary px-4 py-2 rounded-full text-14 font-medium mb-6">
            {title}
        </Flex>
    );
};

export default TitleCard;
