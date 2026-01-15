
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import Button from "~/components/buttons/Button";
import { Div, FlexColumn } from "~/components/general/BaseComponents";
import TitleCard from "~/components/cards/TitleCard";
import { Star } from "lucide-react";

export default function AddEditTestimonial() {
    const { user, profile, loading } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    // TODO: Fetch existing data if edit mode (missing getOne in API currently, assumes CREATE primarily)

    const [formData, setFormData] = useState({
        client_name: "",
        content: "",
        rating: 5,
    });

    const createMutation = TestimonialQuery.useMutationCreateTestimonial();
    // const updateMutation = TestimonialQuery.useMutationUpdateTestimonial();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth/sign-in");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (profile?.full_name) {
            setFormData(prev => ({ ...prev, client_name: profile.full_name || "" }));
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                // updateMutation.mutate({ id, ...formData });
            } else {
                createMutation.mutate(formData, {
                    onSuccess: () => {
                        navigate("/testimonials");
                    }
                });
            }
        } catch (error) {
            console.error("Error submitting testimonial:", error);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <FlexColumn className="max-w-2xl mx-auto py-10 px-4 w-full">
            <TitleCard title={isEditMode ? "Edit Review" : "Write a Review"} />

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <Div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input
                        type="text"
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-base focus:border-transparent outline-none"
                        placeholder="Your Name"
                        required
                    />
                </Div>

                <Div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className={`transition-colors ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                            >
                                <Star fill={formData.rating >= star ? "currentColor" : "none"} size={32} />
                            </button>
                        ))}
                    </div>
                </Div>

                <Div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-primary-base focus:border-transparent outline-none resize-none"
                        placeholder="Share your experience working with us..."
                        required
                    />
                </Div>

                <Button
                    variant="primary_filled"
                    type="submit"
                    className="w-full justify-center"
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? "Submitting..." : "Submit Review"}
                </Button>
            </form>
        </FlexColumn>
    );
}
