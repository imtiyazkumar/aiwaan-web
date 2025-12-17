import React from 'react'
import { Div, Span } from '~/components/general/BaseComponents'


interface TitleProps {
    title: string;
    subtitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
    return (
        <Div className="text-32 md:text-48 font-bold  mb-4 font-display flex flex-row justify-center gap-2">
            <Span className='text-secondary-800'>{title}</Span>
            <Span className='text-primary-600'>{subtitle}</Span>
        </Div>
    )
}

export default Title
