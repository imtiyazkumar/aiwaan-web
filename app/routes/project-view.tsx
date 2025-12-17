import { useParams, Link } from 'react-router';

export default function ProjectView() {
  const { id } = useParams();

  const project = {
    id: id,
    title: 'Modern E-Commerce Platform',
    description: 'A comprehensive e-commerce solution built with cutting-edge technologies. This platform provides seamless shopping experience with real-time inventory management, secure payment processing, and advanced analytics.',
    category: 'Web Development',
    status: 'Completed',
    imageUrl: 'https://via.placeholder.com/800x400',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    client: 'Tech Corp Inc.',
    completedDate: '2024-03-15',
    features: [
      'Responsive design for all devices',
      'Secure payment gateway integration',
      'Real-time inventory tracking',
      'Advanced search and filtering',
      'User authentication and authorization',
      'Admin dashboard with analytics'
    ],
    technologies: [
      { name: 'React', description: 'Frontend framework' },
      { name: 'Node.js', description: 'Backend runtime' },
      { name: 'MongoDB', description: 'Database' },
      { name: 'Tailwind CSS', description: 'Styling' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Link to="/projects" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Projects
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <p className="text-gray-600">Project ID: {project.id}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-semibold text-gray-900">{project.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Client</p>
                <p className="font-semibold text-gray-900">{project.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="font-semibold text-gray-900">{project.completedDate}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
