import React from 'react';
import { Star, User, PenTool, Plus } from 'lucide-react';
import type { ITestimonial } from '~/types/testimonial';
import { useNavigate } from 'react-router';

interface TestimonialCardProps {
    testimonial: ITestimonial;
    showActions?: boolean;
    onDelete?: (id: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, showActions = false, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            size={14}
                            fill={index < testimonial.rating ? 'currentColor' : 'none'}
                            className={index < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}
                        />
                    ))}
                </div>

                {showActions && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={() => navigate(`/add-edit-testimonial?id=${testimonial.id}`)}
                            className="text-gray-400 hover:text-blue-600 p-1"
                        >
                            <PenTool size={14} />
                        </button>

                        {onDelete && (
                            <button
                                type="button"
                                onClick={() => onDelete(testimonial.id)}
                                className="text-gray-400 hover:text-red-600 p-1"
                            >
                                <div className="rotate-45">
                                    <Plus size={14} />
                                </div>
                            </button>
                        )}
                    </div>
                )}
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
                        {testimonial.client_name || 'Anonymous'}
                    </p>

                    {testimonial.verified_at && (
                        <span className="text-10 text-green-600 font-medium">
                            Verified User
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
