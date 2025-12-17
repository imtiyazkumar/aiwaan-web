import { Link } from 'react-router';

const dummyProjects = [
  {
    id: '1',
    title: 'Modern E-Commerce Platform',
    description: 'A comprehensive e-commerce solution with real-time inventory and payment processing.',
    category: 'Web Development',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly banking application for iOS and Android.',
    category: 'Mobile Development',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['React Native', 'Firebase', 'Stripe']
  },
  {
    id: '3',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time analytics dashboard with machine learning insights.',
    category: 'Data Analytics',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['Python', 'TensorFlow', 'React']
  },
  {
    id: '4',
    title: 'Healthcare Management System',
    description: 'Complete hospital management system with patient records and appointment scheduling.',
    category: 'Healthcare',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['Vue.js', 'PostgreSQL', 'Docker']
  },
  {
    id: '5',
    title: 'Social Media Platform',
    description: 'A modern social networking platform with real-time messaging.',
    category: 'Social Media',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['Next.js', 'GraphQL', 'WebSocket']
  },
  {
    id: '6',
    title: 'Educational Learning Portal',
    description: 'Online learning platform with video courses and interactive quizzes.',
    category: 'Education',
    imageUrl: 'https://via.placeholder.com/400x300',
    tags: ['Angular', 'Express', 'MongoDB']
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
          <p className="text-gray-600 text-lg">Explore our portfolio of successful projects across various industries.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase">{project.category}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
