import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import TestimonialQuery from "~/apiService/testimonial/testimonialQuery";
import { Div, FlexColumn, Grid } from "~/components/general/BaseComponents";
import TitleCard from "~/components/cards/TitleCard";
import Button from "~/components/buttons/Button";
import { Plus, Star, User } from "lucide-react";

export default function Testimonials() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } =
    TestimonialQuery.useQueryGetTestimonials();
  const testimonials = data?.testimonials || [];

  const { data: myTestimonial } = TestimonialQuery.useQueryGetMyTestimonial();

  let displayTestimonials = [...testimonials];
  if (
    myTestimonial &&
    !displayTestimonials.find((t) => t.id === myTestimonial.id)
  ) {
    displayTestimonials.unshift(myTestimonial);
  }

  const userTestimonial = myTestimonial;

  const handleAddEditClick = () => {
    if (!user) {
      navigate("/auth/sign-in");
    } else if (userTestimonial) {
      navigate(`/testimonials/${userTestimonial.id}`);
    } else {
      navigate("/add-edit-testimonial");
    }
  };

  return (
    <FlexColumn className="w-full min-w-0 min-h-screen justify-start">
      {/* Header Section */}
      <div className="w-full rounded-2xl bg-slate-900 text-white py-14 sm:py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Stories</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          Hear from the people we've had the pleasure of building for. Their
          satisfaction is our greatest achievement.
        </p>
      </div>

      <Div className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center mb-10">
          <TitleCard title="What People Say" className="mb-0 sm:mb-0 mx-0" />
          <Button
            variant="primary_filled"
            onClick={handleAddEditClick}
            disabled={authLoading}
          >
            {userTestimonial ? (
              <>View My Review</>
            ) : (
              <>
                <Plus size={18} className="mr-2" />
                Write a Review
              </>
            )}
          </Button>
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center"
          >
            <p className="mb-4 text-red-800">
              We couldn't load the reviews. Please try again.
            </p>
            <Button
              variant="dark_outlined"
              className="mx-auto"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div role="status" className="text-center py-20 text-gray-500">
            Loading reviews...
          </div>
        ) : (
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.length > 0 ? (
              displayTestimonials.map((t) => {
                const isOwner = profile && profile.id === t.user_id;
                const isAdmin = profile?.is_admin;
                const showActions = isOwner || isAdmin;

                return (
                  <article
                    key={t.id}
                    className="min-w-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="flex items-center gap-1 text-yellow-500"
                        aria-label={`${t.rating ?? 5} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={16}
                            fill={
                              starIndex < (t.rating || 5)
                                ? "currentColor"
                                : "none"
                            }
                            className={
                              starIndex < (t.rating || 5)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic whitespace-pre-line wrap-anywhere">
                      "{t.content}"
                    </p>
                    <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                      <div className="bg-gray-100 rounded-full p-2 mr-3">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {t.client_name || "Anonymous Client"}
                        </p>
                        <div className="flex items-center gap-1">
                          {t.verified_at && (
                            <span className="text-xs text-green-600 font-medium">
                              Approved review
                            </span>
                          )}
                          {!t.verified_at && (
                            <span className="text-xs text-amber-700">
                              Awaiting approval · Only visible to you
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/testimonials/${t.id}`}
                      className="mt-5 text-sm font-medium text-emerald-700 underline underline-offset-4"
                    >
                      Read review
                    </Link>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">
                  No reviews yet. Be the first to share your experience!
                </p>
                <Button variant="dark_outlined" onClick={handleAddEditClick}>
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
