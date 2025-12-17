import { useParams, Link } from 'react-router';

export default function ServiceView() {
    const { id } = useParams();

    const service = {
        id: id,
        title: 'Custom Web Development',
        description: 'We create custom web applications tailored to your business needs. Our team of experienced developers uses the latest technologies to build scalable, secure, and high-performance web solutions.',
        detailedDescription: 'Our custom web development service encompasses the entire development lifecycle, from initial concept and design to deployment and ongoing maintenance. We specialize in creating responsive, user-friendly applications that drive business growth and enhance user engagement.',
        icon: '🌐',
        price: 'Starting at $5,000',
        duration: '4-12 weeks',
        features: [
            'Responsive design for all devices',
            'Custom backend development',
            'Database design and integration',
            'API development and integration',
            'Security implementation',
            'Performance optimization',
            'Ongoing support and maintenance'
        ],
        processSteps: [
            {
                title: 'Discovery & Planning',
                description: 'We work with you to understand your requirements and create a detailed project plan.'
            },
            {
                title: 'Design & Prototyping',
                description: 'Our designers create mockups and prototypes for your approval.'
            },
            {
                title: 'Development',
                description: 'Our developers bring the designs to life with clean, maintainable code.'
            },
            {
                title: 'Testing & QA',
                description: 'Rigorous testing ensures your application works flawlessly.'
            },
            {
                title: 'Deployment & Support',
                description: 'We deploy your application and provide ongoing support.'
            }
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
        benefits: [
            'Tailored solution for your specific needs',
            'Scalable architecture for future growth',
            'Modern, maintainable codebase',
            'Dedicated support team'
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <Link to="/services" className="text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Back to Services
                </Link>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                        <div className="flex items-center mb-4">
                            <span className="text-6xl mr-4">{service.icon}</span>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
                                <p className="text-blue-100">Service ID: {service.id}</p>
                            </div>
                        </div>
                        <p className="text-xl text-blue-50">{service.description}</p>
                    </div>

                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Starting Price</p>
                                <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Timeline</p>
                                <p className="text-2xl font-bold text-gray-900">{service.duration}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">{service.detailedDescription}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Process</h2>
                            <div className="space-y-4">
                                {service.processSteps.map((step, index) => (
                                    <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
                            <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech, index) => (
                                    <span key={index} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                            <ul className="space-y-2">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to="/get-quote"
                                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold transition"
                            >
                                Get a Quote
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-300 font-semibold transition"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
