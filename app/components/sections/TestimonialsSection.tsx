
import React from "react";
import { Div, Flex, FlexColumn } from "../general/BaseComponents";
import Title from "~/components/general/Title";
import { MessageCircle, PenTool, Star, User } from "lucide-react";
import Button from "~/components/buttons/Button";
import { useNavigate } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import { useAuth } from "~/contexts/AuthContext";

interface TestimonialsSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundColor?: "transparent" | "gradient" | "white";
    topTitle?: string;
    topIcon?: React.ReactNode;
}

const bgClass = {
    transparent: "",
    gradient: "bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl",
    white: "bg-white rounded-2xl shadow-lg"
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
    title = "Client",
    subtitle = "Stories",
    description = "Hear from our satisfied clients about their experience working with us.",
    backgroundColor = "transparent",
    topTitle = "Testimonials",
    topIcon = <MessageCircle size={16} />
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: testimonialData, isLoading } = TestimonialQuery.useQueryGetTestimonials();

    // Show only first 3 or 4 testimonials for the section
    const testimonials = (testimonialData?.testimonials || []).slice(0, 4);

    const handleWriteReview = () => {
        if (!user) {
            navigate("/auth/sign-in");
        } else {
            navigate("/add-edit-testimonial");
        }
    };

    return (
        <FlexColumn className={`${wrapperBaseClass} ${bgClass[backgroundColor]}`}>
            <Flex className="items-center bg-primary-light text-primary px-4 py-2 gap-2 rounded-full text-14 font-medium w-max mx-auto">
                {topIcon}
                {topTitle}
            </Flex>
            <Div className="text-center px-6">
                <Title title={title} subtitle={subtitle} />
                <Div className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed mb-10">
                    {description}
                </Div>
            </Div>

            <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 relative z-10 w-full">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-500">Loading testimonials...</div>
                ) : testimonials.length > 0 ? (
                    testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        size={14}
                                        fill={starIndex < (t.rating || 5) ? "currentColor" : "none"}
                                        className={starIndex < (t.rating || 5) ? "text-yellow-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow italic line-clamp-4">"{t.content}"</p>
                            <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                                <div className="bg-gray-100 rounded-full p-2 mr-3">
                                    <User size={16} className="text-gray-500" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900 text-sm">{t.client_name || "Anonymous"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No reviews yet. Be the first!</p>
                    </div>
                )}
            </Div>

            <Flex className="gap-4 mt-10 justify-center flex-wrap">
                <Button onClick={() => navigate("/testimonials")} variant="secondary_filled" className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200">
                    View All Stories
                </Button>
                <Button onClick={handleWriteReview} variant="primary_filled">
                    <PenTool size={18} className="mr-2" />
                    Write a Review
                </Button>
            </Flex>
        </FlexColumn>
    );
};

export default TestimonialsSection;
