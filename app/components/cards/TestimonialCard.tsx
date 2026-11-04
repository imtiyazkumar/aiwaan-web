import { Link } from "react-router";
import React from "react";
import { Star, User } from "lucide-react";
import type { ITestimonial } from "~/types/testimonial";

interface TestimonialCardProps {
  testimonial: ITestimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={14}
              fill={index < testimonial.rating ? "currentColor" : "none"}
              className={
                index < testimonial.rating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 grow italic line-clamp-4">
        "{testimonial.content}"
      </p>

      <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
        <div className="bg-gray-100 rounded-full p-2 mr-3">
          <User size={16} className="text-gray-500" />
        </div>

        <div>
          <p className="font-semibold text-gray-900 text-sm">
            {testimonial.client_name || "Anonymous"}
          </p>

          {testimonial.verified_at && (
            <span className="text-10 text-green-600 font-medium">
              Verified User
            </span>
          )}
        </div>
      </div>
      <Link
        to={`/testimonials/${testimonial.id}`}
        className="mt-4 text-sm font-medium text-emerald-700 underline underline-offset-4"
      >
        Read review
      </Link>
    </div>
  );
};

export default TestimonialCard;
