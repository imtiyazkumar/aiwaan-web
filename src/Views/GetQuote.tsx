import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Div } from "../components/general/BaseComponents";
import { Button, FormContainer, FormGroup, FormTitle, Radio, Select, TextArea, TextInput } from "../components/UiComponents";

const GetQuote: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    // Project type options
    const projectTypeOptions = [
        { value: "residential-interior", label: "Residential Interior" },
        { value: "residential-exterior", label: "Residential Exterior" },
        { value: "commercial-space", label: "Commercial Space" },
        { value: "office-interior", label: "Office Interior" },
        { value: "landscape-design", label: "Landscape Design" },
        { value: "custom-project", label: "Custom Project" }
    ];

    return (
        <Div className=" mx-auto">
            {/* Hero Section */}
            <Div className="relative overflow-hidden rounded-lg">
                <Div className="absolute inset-0 bg-gradient-to-r from-secondary-500/90 to-primary-base/80 z-10" />
                <Div className="absolute inset-0">
                    <img
                        src="/api/placeholder/1200/300"
                        alt="Request a Quote"
                        className="w-full h-full object-cover"
                    />
                </Div>
                <Div className="container mx-auto px-6 py-16 relative z-20">
                    <Div className="">
                        <h1 className="text-32 md:text-48 font-bold text-white leading-tight mb-4">
                            Request a <span className="text-primary-200">Quote</span>
                        </h1>
                        <p className="text-16 md:text-18 text-neutral-100">
                            Tell us about your project, and we'll provide you with a detailed estimate.
                        </p>
                    </Div>
                </Div>
            </Div>

            {/* Quote Form Section */}
            <Div className="py-12 ">
                {formSubmitted ? (
                    <FormContainer className=" py-12">
                        <Div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                            <h3 className="text-20 font-bold text-green-700 mb-2">Quote Request Submitted!</h3>
                            <p className="text-16 text-green-600 mb-4">Thank you for your request. Our team will review your project details and get back to you within 48 hours.</p>
                        </Div>
                    </FormContainer>
                ) : (
                    <FormContainer className="">
                        <form onSubmit={handleSubmit}>
                            <FormTitle
                                title="Request a"
                                highlight="Quote"
                                description="Fill out the form below with your project details"
                            />

                            {/* Personal Information */}
                            <Div className="mb-8">
                                <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">Personal Information</h3>

                                <FormGroup>
                                    <TextInput
                                        id="fullName"
                                        label="Full Name"
                                        placeholder="Your name"
                                        required
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        label="Phone Number"
                                        placeholder="+91 900 000 0000"
                                        required
                                    />
                                    <TextInput
                                        id="location"
                                        label="Address"
                                        placeholder="City, State"
                                    />
                                </FormGroup>
                            </Div>

                            {/* Project Information */}
                            <Div className="mb-8">
                                <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">Project Information</h3>

                                <FormGroup>
                                    <Select
                                        id="projectType"
                                        label="Project Type"
                                        options={projectTypeOptions}
                                        required
                                    />
                                    <TextInput
                                        id="projectSize"
                                        label="Project Size (sq. ft)"
                                        placeholder="Approximate size in sq. ft"
                                    />
                                </FormGroup>

                                <Div className="mt-6">
                                    <TextArea
                                        id="projectDescription"
                                        label="Project Description"
                                        placeholder="Please describe your project requirements and expectations..."
                                        rows={4}
                                        required
                                    />
                                </Div>

                                <Div className="mt-6">
                                    <label className="block text-secondary-700 mb-2">Have you worked with an architectural firm before?</label>
                                    <Div className="flex space-x-6">
                                        <Radio
                                            id="prevWorkYes"
                                            name="previousWork"
                                            value="yes"
                                            label="Yes"
                                        />
                                        <Radio
                                            id="prevWorkNo"
                                            name="previousWork"
                                            value="no"
                                            label="No"
                                        />
                                    </Div>
                                </Div>
                            </Div>

                            <Div className="text-right">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                >
                                    Submit Request <Send size={16} className="ml-2 inline" />
                                </Button>
                            </Div>
                        </form>
                    </FormContainer>
                )}
            </Div>

            {/* What Happens Next Section */}
            <Div className="px-4 pb-16">
                <Div className=" mx-auto bg-primary-100 rounded-lg p-6">
                    <h3 className="text-18 font-bold text-secondary-700 mb-4">What Happens Next?</h3>
                    <Div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Div className="bg-white p-4 rounded-lg shadow-sm">
                            <Div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold mb-3">1</Div>
                            <h4 className="text-16 font-semibold text-secondary-700 mb-1">Review</h4>
                            <p className="text-14 text-secondary-600">We'll review your project requirements within 48 hours.</p>
                        </Div>
                        <Div className="bg-white p-4 rounded-lg shadow-sm">
                            <Div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold mb-3">2</Div>
                            <h4 className="text-16 font-semibold text-secondary-700 mb-1">Quote</h4>
                            <p className="text-14 text-secondary-600">We'll prepare a detailed quote based on your specifications.</p>
                        </Div>
                        <Div className="bg-white p-4 rounded-lg shadow-sm">
                            <Div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold mb-3">3</Div>
                            <h4 className="text-16 font-semibold text-secondary-700 mb-1">Consultation</h4>
                            <p className="text-14 text-secondary-600">Schedule a call to discuss the quote and next steps.</p>
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default GetQuote;
