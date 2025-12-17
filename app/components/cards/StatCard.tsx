import React from 'react'
import { Div, FlexColumn } from '~/components/general/BaseComponents'

interface StatCardProps {
    icon: React.ReactNode
    number: string
    label: string
    description?: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label, description }) => {
    return (
        <FlexColumn className="  p-4 text-center rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full">
            <Div className="text-primary mb-2 flex cursor-pointer justify-center group-hover:scale-110 transition-transform">
                {icon}
            </Div>

            <Div className="text-32 font-bold text-secondary-800  cursor-pointer mb-1 group-hover:text-primary transition-colors">
                {number}
            </Div>

            <Div className="text-14 text-secondary-600 font-medium mb-1">
                {label}
            </Div>

            {description && (
                <Div className="text-12 text-secondary-500">
                    {description}
                </Div>
            )}
        </FlexColumn>
    )
}

export default StatCard;
