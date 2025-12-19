import React from 'react'
import { Flex } from '~/components/general/BaseComponents'

interface ITitleCardProps {
    title: string
    className?: string
}

const TitleCard: React.FC<ITitleCardProps> = ({ title, className }) => {
    return (
        <Flex className={`items-center bg-primary-light text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-12 sm:text-14 font-medium sm:mb-6 w-fit mx-auto ${className}`}>
            {title}
        </Flex>
    )
}

export default TitleCard
