const OurTeam = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Meet Our Team
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Our diverse team of architects, designers, and engineers brings together decades
                    of combined experience and fresh perspectives.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1, 2, 3].map((member) => (
                    <div key={member} className="text-center space-y-6">
                        <div className="w-40 h-40 bg-gradient-to-br from-teal-100 to-amber-100 rounded-full mx-auto overflow-hidden shadow-lg">
                            <img
                                src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
                                alt="Team member"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Senior Architect
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Leading innovative design solutions with 15+ years of experience in sustainable architecture.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
}

export default OurTeam
