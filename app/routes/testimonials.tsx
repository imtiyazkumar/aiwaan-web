
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import { Div, FlexColumn, Grid } from "~/components/general/BaseComponents";
import TitleCard from "~/components/cards/TitleCard";
import Button from "~/components/buttons/Button";
import { Plus, Star, User } from "lucide-react";

export default function Testimonials() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data, isLoading } = TestimonialQuery.useQueryGetTestimonials();
    const testimonials = data?.testimonials || [];

    const handleAddClick = () => {
        if (!user) {
            // Store return URL maybe? For now just redirect.
            navigate("/auth/sign-in");
        } else {
            navigate("/add-edit-testimonial");
        }
    };

    return (
        <FlexColumn className="min-h-screen">
            {/* Header Section */}
            <div className="bg-slate-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Stories</h1>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    Hear from the people we've had the pleasure of building for. Their satisfaction is our greatest achievement.
                </p>
            </div>

            <Div className="max-w-7xl mx-auto w-full px-6 py-12">
                <div className="flex justify-between items-center mb-10">
                    <TitleCard title="What People Say" className="mb-0" />
                    <Button variant="primary_filled" onClick={handleAddClick}>
                        <Plus size={18} className="mr-2" />
                        Write a Review
                    </Button>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">Loading reviews...</div>
                ) : (
                    <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.length > 0 ? (
                            testimonials.map((t, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                size={16}
                                                fill={starIndex < (t.rating || 5) ? "currentColor" : "none"}
                                                className={starIndex < (t.rating || 5) ? "text-yellow-500" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic">"{t.content}"</p>
                                    <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                                        <div className="bg-gray-100 rounded-full p-2 mr-3">
                                            <User size={20} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{t.client_name || "Anonymous Client"}</p>
                                            <p className="text-xs text-gray-500">Verified Customer</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
                                <Button variant="dark_outlined" onClick={handleAddClick}>
                                    Write a Review
                                </Button>
                            </div>
                        )}
                    </Grid>
                )}
            </Div>
        </FlexColumn>
    );
}
