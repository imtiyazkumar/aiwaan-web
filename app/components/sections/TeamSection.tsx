import { Linkedin, Twitter, Share2 } from "lucide-react";
import { Div, Flex, FlexColumn } from "../general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";
import TeamQuery from "~/apiService/team/teamQuery";

const TeamSection = () => {
    const { data, isLoading } = TeamQuery.useQueryGetTeamMembers();
    const teamMembers = data?.teamMembers || [];

    // Fallback if no db data
    const displayTeam = teamMembers.length > 0 ? teamMembers : [
        {
            id: '1',
            name: 'Imtiyaz Ahmad',
            role: 'Principal Architect',
            bio: 'Leading the vision with over 10 years of experience in sustainable and modern architecture.',
            image_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
            linkedin_url: '#',
            twitter_url: '#',
            created_at: '',
            display_order: 1
        },
        {
            id: '2',
            name: 'Aisha Malik',
            role: 'Interior Designer',
            bio: 'Specializing in creating warm, functional, and aesthetically pleasing interior spaces.',
            image_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
            linkedin_url: '#',
            twitter_url: '#',
            created_at: '',
            display_order: 2
        },
        {
            id: '3',
            name: 'Rohan Sharma',
            role: '3D Visualizer',
            bio: 'Bringing architectural concepts to life with photorealistic 3D renderings and walkthroughs.',
            image_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
            linkedin_url: '#',
            twitter_url: '#',
            created_at: '',
            display_order: 3
        },
        {
            id: '4',
            name: 'Zainab Khan',
            role: 'Project Manager',
            bio: 'Ensuring smooth execution and timely delivery of complex architectural projects.',
            image_url: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
            linkedin_url: '#',
            twitter_url: '#',
            created_at: '',
            display_order: 4
        }
    ];

    return (
        <FlexColumn className="w-full py-20 bg-white">
            <Div className={`${wrapperBaseClass}`}>
                <FlexColumn className="text-center gap-4 mb-16">
                    <span className="text-primary-base font-semibold tracking-wider uppercase text-sm">Our Team</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">Meet The Minds</h2>
                    <p className="text-secondary-600 max-w-2xl mx-auto">
                        A passionate team of architects, designers, and visualizers dedicated to crafting exceptional spaces.
                    </p>
                </FlexColumn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayTeam.map((member) => (
                        <div key={member.id} className="group relative overflow-hidden rounded-2xl bg-gray-50 h-[400px]">
                            <img
                                src={member.image_url || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300"></div>

                            <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-primary-base font-medium text-sm mb-3">{member.role}</p>
                                <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                                    {member.bio}
                                </p>

                                <Flex className="gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    {member.linkedin_url && (
                                        <a href={member.linkedin_url} className="text-white hover:text-primary-base transition-colors">
                                            <Linkedin size={18} />
                                        </a>
                                    )}
                                    {member.twitter_url && (
                                        <a href={member.twitter_url} className="text-white hover:text-primary-base transition-colors">
                                            <Twitter size={18} />
                                        </a>
                                    )}
                                </Flex>
                            </div>
                        </div>
                    ))}
                </div>
            </Div>
        </FlexColumn>
    );
};

export default TeamSection;
