import { Link } from 'react-router';

const dummyServices = [
  {
    id: '1',
    title: 'Custom Web Development',
    description: 'Build powerful, scalable web applications tailored to your business needs.',
    icon: '🌐',
    price: 'Starting at $5,000',
    features: ['Responsive Design', 'Custom Backend', 'API Integration']
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: '📱',
    price: 'Starting at $8,000',
    features: ['iOS & Android', 'Cross-platform', 'App Store Deployment']
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Create stunning, user-friendly interfaces that engage your audience.',
    icon: '🎨',
    price: 'Starting at $3,000',
    features: ['User Research', 'Wireframing', 'Prototyping']
  },
  {
    id: '4',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment services.',
    icon: '☁️',
    price: 'Starting at $4,000',
    features: ['AWS/Azure/GCP', 'DevOps', 'CI/CD Pipeline']
  },
  {
    id: '5',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration.',
    icon: '🛒',
    price: 'Starting at $7,000',
    features: ['Payment Gateway', 'Inventory System', 'Admin Dashboard']
  },
  {
    id: '6',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence.',
    icon: '🤖',
    price: 'Custom Pricing',
    features: ['ML Models', 'Data Analysis', 'Predictive Analytics']
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 text-lg">Comprehensive technology solutions to drive your business forward.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyServices.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
