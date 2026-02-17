import React from "react";
import { Div, Flex, FlexColumn } from "../general/BaseComponents";
import Title from "~/components/general/Title";
import { MessageCircle, PenTool } from "lucide-react";
import Button from "~/components/buttons/Button";
import { useNavigate } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import { useAuth } from "~/contexts/AuthContext";
import TestimonialCard from "~/components/cards/TestimonialCard";

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
    const { user, profile } = useAuth();

    const { data: myTestimonial } = TestimonialQuery.useQueryGetMyTestimonial();
    const { data: testimonialData, isLoading } =
        TestimonialQuery.useQueryGetTestimonials();

    const deleteMutation = TestimonialQuery.useMutationDeleteTestimonial();

    let testimonials = (testimonialData?.testimonials || []).slice(0, 4);

    if (myTestimonial && !testimonials.find(t => t.id === myTestimonial.id)) {
        testimonials.unshift(myTestimonial);
        testimonials = testimonials.slice(0, 4);
    }

    const handleWriteReview = () => {
        if (!user) {
            navigate("/auth/sign-in");
        } else if (myTestimonial) {
            navigate(`/add-edit-testimonial?id=${myTestimonial.id}`);
        } else {
            navigate("/add-edit-testimonial");
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete your review?")) {
            deleteMutation.mutate(id);
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

            <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 w-full">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-500">
                        Loading testimonials...
                    </div>
                ) : testimonials.length > 0 ? (
                    testimonials.map(t => {
                        const isOwner = user && user.id === t.user_id;
                        const isAdmin = profile?.is_admin;

                        return (
                            <TestimonialCard
                                key={t.id}
                                testimonial={t}
                                showActions={Boolean(isOwner || isAdmin)}
                                onDelete={handleDelete}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">
                            No reviews yet. Be the first!
                        </p>
                    </div>
                )}
            </Div>

            <Flex className="gap-4 mt-10 justify-center flex-wrap">
                <Button
                    onClick={() => navigate("/testimonials")}
                    variant="secondary_filled"
                    className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
                >
                    View All Stories
                </Button>

                <Button onClick={handleWriteReview} variant="primary_filled">
                    {myTestimonial ? "Edit My Review" : "Write a Review"}
                </Button>
            </Flex>
        </FlexColumn>
    );
};

export default TestimonialsSection;
