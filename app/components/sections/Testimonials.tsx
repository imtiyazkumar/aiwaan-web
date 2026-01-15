import { Star, Quote } from "lucide-react";
import { Div, Flex, FlexColumn } from "../general/BaseComponents";
import { wrapperBaseClass } from "~/utils/constants";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";

const Testimonials = () => {
    const { data, isLoading } = TestimonialQuery.useQueryGetFeaturedTestimonials();
    const testimonials = data?.testimonials || [];

    // Fallback data for preview if no db data
    const displayTestimonials = testimonials.length > 0 ? testimonials : [
        {
            id: '1',
            name: 'Sarah Khan',
            role: 'Homeowner',
            content: "Aiwaan transformed our vision into reality. Their attention to detail and understanding of traditional Kashmiri architecture specifically is unmatched.",
            rating: 5,
            image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
            is_featured: true,
            created_at: ''
        },
        {
            id: '2',
            name: 'Faizan Ahmed',
            role: 'Developer',
            content: "Professional, creative, and efficient. The 3D visualizations helped us sell our project before the foundation was even laid.",
            rating: 5,
            image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
            is_featured: true,
            created_at: ''
        },
        {
            id: '3',
            name: 'Dr. Bilal',
            role: 'Clinic Owner',
            content: "The interior design for my clinic strikes the perfect balance between modern functionality and a welcoming atmosphere.",
            rating: 5,
            image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
            is_featured: true,
            created_at: ''
        }
    ];

    return (
        <FlexColumn className="w-full bg-secondary-50 py-20">
            <Div className={`${wrapperBaseClass}`}>
                <FlexColumn className="text-center gap-4 mb-16">
                    <span className="text-primary-base font-semibold tracking-wider uppercase text-sm">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">What Our Clients Say</h2>
                    <p className="text-secondary-600 max-w-2xl mx-auto">
                        We take pride in building lasting relationships with our clients through exceptional design and service.
                    </p>
                </FlexColumn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
                            <Quote size={40} className="absolute top-6 right-6 text-primary-base/10 group-hover:text-primary-base/20 transition-colors" />

                            <Flex className="gap-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < testimonial.rating ? "currentColor" : "none"}
                                        className={i < testimonial.rating ? "" : "text-gray-300"}
                                    />
                                ))}
                            </Flex>

                            <p className="text-secondary-700 italic mb-8 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <Flex className="gap-4 items-center mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-base/20">
                                    <img
                                        src={testimonial.image_url || `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-secondary-900 text-sm">{testimonial.name}</span>
                                    <span className="text-secondary-500 text-xs">{testimonial.role}</span>
                                </div>
                            </Flex>
                        </div>
                    ))}
                </div>
            </Div>
        </FlexColumn>
    );
};

export default Testimonials;
