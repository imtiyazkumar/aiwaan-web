import React from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Div } from '~/components/general/BaseComponents';
import { ourServices } from '~/utils/constants';
import FeaturedServices from '~/components/sections/FeaturedServices';
import ButtonBanner from '~/components/sections/BottomBanner';

export default function ServiceView() {
    const { id } = useParams<{ id: string }>();
    const service = ourServices.find(s => s.id === id);

    if (!service) {
        return (
            <Div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <Div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                    >
                        <ArrowLeft size={20} />
                        Back to Services
                    </Link>
                </Div>
            </Div>
        );
    }

    const featuresList = service.features || [];

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <Div className="relative h-64 sm:h-80 md:h-96 lg:h-112 w-full overflow-hidden">
                <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                />
                <Div className="absolute inset-0 bg-linear-to-t from-gray-900/95 via-gray-900/60 to-transparent" />

                <Div className="absolute top-8 right-8 hidden lg:block">
                    <Sparkles className="text-white/30 w-12 h-12 animate-pulse" />
                </Div>

                <Div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12">
                    <Div className="max-w-4xl">
                        {service.tag && (
                            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase border border-white/30 mb-4">
                                {service.tag}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                            {service.title}
                        </h1>
                    </Div>
                </Div>
            </Div>

            <Div className="p-6 sm:p-8 md:p-10 lg:p-12">
                <Div className="mb-10 lg:mb-14 max-w-4xl">
                    <Div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <Div className="w-1 h-8 bg-linear-to-b from-blue-600 to-blue-400 rounded-full" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Overview</h2>
                    </Div>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {service.description}
                    </p>
                </Div>

                {featuresList.length > 0 && (
                    <Div className="mb-12 lg:mb-16">
                        <Div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <Div className="w-1 h-8 bg-linear-to-b from-emerald-600 to-emerald-400 rounded-full" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Key Features</h2>
                        </Div>

                        <Div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {featuresList.map((feature, index) => (
                                <Div
                                    key={index}
                                    className="group flex items-start gap-4 p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1"
                                >
                                    <Div className="bg-emerald-100 text-emerald-600 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                        <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                                    </Div>
                                    <span className="text-gray-700 font-medium pt-2 leading-snug">
                                        {feature}
                                    </span>
                                </Div>
                            ))}
                        </Div>
                    </Div>
                )}

                <ButtonBanner
                    title="Inspired by This Service?"
                    description="Let us design and visualize your dream space with the same precision and creativity."
                    primaryButtonText="Let us serve you"
                    primaryButtonLink="/contact"
                />

                <FeaturedServices />
            </Div>
        </Div>
    );
}
