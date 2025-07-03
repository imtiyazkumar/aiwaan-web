import { Award, Heart, Target, Users } from 'lucide-react';

export const OurValuesSection = () => {
    const values = [
        {
            icon: <Target className="h-8 w-8 text-teal-600" />,
            title: 'Excellence',
            description: 'We strive for perfection in every project, ensuring the highest standards of design and construction.',
        },
        {
            icon: <Heart className="h-8 w-8 text-teal-600" />,
            title: 'Sustainability',
            description: 'Environmental responsibility is at the core of our design philosophy, creating eco-friendly spaces.',
        },
        {
            icon: <Users className="h-8 w-8 text-teal-600" />,
            title: 'Collaboration',
            description: 'We work closely with our clients, understanding their vision and bringing it to life through design.',
        },
        {
            icon: <Award className="h-8 w-8 text-teal-600" />,
            title: 'Innovation',
            description: 'Embracing new technologies and design trends while respecting traditional architectural values.',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Values
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    These core principles guide everything we do, from initial concept to final construction.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300 space-y-4">
                        <div className="flex justify-center">
                            {value.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
