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
        <FlexColumn className="w-full p-3 sm:p-4 lg:p-5 text-center rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Div className="text-primary mb-2 sm:mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
                {icon}
            </Div>

            <Div className="font-bold text-24 sm:text-28 lg:text-32 text-secondary-800 mb-1 transition-colors group-hover:text-primary">
                {number}
            </Div>

            <Div className="text-13 sm:text-14 text-secondary-600 font-medium mb-1">
                {label}
            </Div>

            {description && (
                <Div className="text-12 sm:text-13 text-secondary-500 leading-relaxed">
                    {description}
                </Div>
            )}
        </FlexColumn>
    )
}

export default StatCard
