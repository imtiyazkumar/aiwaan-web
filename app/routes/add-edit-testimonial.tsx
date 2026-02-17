import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import Button from "~/components/buttons/Button";
import { Div, Flex } from "~/components/general/BaseComponents";
import TitleCard from "~/components/cards/TitleCard";
import { Star, CheckCircle } from "lucide-react";

export default function AddEditTestimonial() {
    const { user, profile, loading } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || undefined;
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        client_name: "",
        content: "",
        rating: 5
    });

    const { data: testimonialData, isLoading } =
        TestimonialQuery.useQueryGetTestimonialById(id);

    const { data: myTestimonial } =
        TestimonialQuery.useQueryGetMyTestimonial();

    const createMutation = TestimonialQuery.useMutationCreateTestimonial();
    const updateMutation = TestimonialQuery.useMutationUpdateTestimonial();
    const verifyMutation = TestimonialQuery.useMutationVerifyTestimonial();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth/sign-in");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (!loading && user && !isEditMode && myTestimonial) {
            navigate(`/admin/testimonials/edit?id=${myTestimonial.id}`);
        }
    }, [user, loading, isEditMode, myTestimonial, navigate]);

    useEffect(() => {
        if (isEditMode && testimonialData) {
            setFormData({
                client_name: testimonialData.client_name,
                content: testimonialData.content,
                rating: testimonialData.rating || 5
            });
        } else if (!isEditMode && profile?.full_name) {
            setFormData(prev => ({
                ...prev,
                client_name: profile.full_name || ""
            }));
        }
    }, [isEditMode, testimonialData, profile]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const action = isEditMode
            ? updateMutation.mutate
            : createMutation.mutate;

        const payload = isEditMode
            ? { id, ...formData }
            : { ...formData };

        action(payload as any, {
            onSuccess: () => {
                navigate(
                    profile?.is_admin
                        ? "/admin/testimonials"
                        : "/testimonials"
                );
            },
            onError: (err: any) => {
                setError(err.message || "Failed to save testimonial");
            }
        });
    };

    const handleVerify = () => {
        if (!id) return;

        verifyMutation.mutate(id, {
            onSuccess: () => {
                navigate("/admin/testimonials");
            },
            onError: (err: any) => {
                setError(err.message || "Verification failed");
            }
        });
    };

    if (loading || (isEditMode && isLoading)) {
        return (
            <Div className="w-full py-20 text-center text-gray-600">
                Loading...
            </Div>
        );
    }

    const isVerified = testimonialData?.verified_at;

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <TitleCard
                    title={isEditMode ? "Edit Testimonial" : "Add Testimonial"}
                />

                {error && (
                    <Div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
                        {error}
                    </Div>
                )}

                <Div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Display Name
                    </label>
                    <input
                        type="text"
                        value={formData.client_name}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                client_name: e.target.value
                            })
                        }
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 border-secondary-200"
                        required
                    />
                </Div>

                <Div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Rating
                    </label>
                    <Flex className="gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        rating: star
                                    })
                                }
                                className={`${formData.rating >= star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            >
                                <Star
                                    size={28}
                                    fill={
                                        formData.rating >= star
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </button>
                        ))}
                    </Flex>
                </Div>

                <Div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Testimonial
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                content: e.target.value
                            })
                        }
                        rows={5}
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 border-secondary-200 resize-none"
                        required
                    />
                </Div>

                <Flex className="gap-4 pt-4 justify-end">
                    <Button
                        type="button"
                        onClick={() =>
                            navigate(
                                profile?.is_admin
                                    ? "/admin/testimonials"
                                    : "/testimonials"
                            )
                        }
                        variant="dark_outlined"
                        height="medium"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary_filled"
                        height="medium"
                        disabled={
                            createMutation.isPending ||
                            updateMutation.isPending
                        }
                    >
                        {isEditMode
                            ? updateMutation.isPending
                                ? "Updating..."
                                : "Update Testimonial"
                            : createMutation.isPending
                                ? "Submitting..."
                                : "Submit Testimonial"}
                    </Button>

                    {profile?.is_admin && isEditMode && !isVerified && (
                        <Button
                            type="button"
                            variant="primary_filled"
                            height="medium"
                            onClick={handleVerify}
                            disabled={verifyMutation.isPending}
                        >
                            {verifyMutation.isPending
                                ? "Verifying..."
                                : "Verify"}
                        </Button>
                    )}

                    {profile?.is_admin && isEditMode && isVerified && (
                        <Div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200">
                            <CheckCircle size={16} />
                            Verified
                        </Div>
                    )}
                </Flex>
            </form>
        </Div>
    );
}
