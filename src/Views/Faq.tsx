import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Div } from "../components/general/BaseComponents";
import HeroSection from "../components/sections/HeroSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const Faq: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqCategories = [
        {
            title: "General Questions",
            faqs: [
                {
                    question: "What services does Aiwaan provide?",
                    answer: "Aiwaan specializes in architectural visualization services including 2D floor plans, 3D modeling, interior design, exterior renders, and landscape design. We focus on blending traditional Kashmiri aesthetics with modern design principles."
                },
                {
                    question: "Where is Aiwaan located?",
                    answer: "We are based in Sopore, Jammu and Kashmir, with additional services available in Srinagar. We serve clients throughout Kashmir and beyond."
                },
                {
                    question: "How long has Aiwaan been in business?",
                    answer: "Aiwaan has been providing architectural visualization services for over 5 years, with a team of experienced designers and architects who understand both traditional and modern design principles."
                }
            ]
        },
        {
            title: "Project & Pricing",
            faqs: [
                {
                    question: "How much do your services cost?",
                    answer: "Our pricing varies based on project complexity, scope, and timeline. 2D floor plans start from ₹15,000, 3D renders from ₹8,000, and complete architectural design from ₹50,000. Contact us for a detailed quote."
                },
                {
                    question: "How long does a typical project take?",
                    answer: "Project timelines vary: 2D floor plans (3-7 days), 3D renders (2-5 days), 3D modeling (1-2 weeks), and complete architectural design (2-4 weeks). We'll provide a specific timeline during consultation."
                },
                {
                    question: "Do you offer revisions?",
                    answer: "Yes, we include a certain number of revisions in our packages. Additional revisions can be accommodated at reasonable rates. We work closely with clients to ensure complete satisfaction."
                },
                {
                    question: "What information do you need to start a project?",
                    answer: "We typically need site measurements, photos, your vision/requirements, budget range, and timeline. For renovations, existing floor plans are helpful. We'll guide you through the specific requirements during consultation."
                }
            ]
        },
        {
            title: "Process & Delivery",
            faqs: [
                {
                    question: "What is your design process?",
                    answer: "Our process includes: 1) Initial consultation and requirement gathering, 2) Concept development and presentation, 3) Design refinement based on feedback, 4) Final delivery with all necessary files and documentation."
                },
                {
                    question: "In what formats do you deliver final files?",
                    answer: "We provide files in multiple formats including PDF, DWG, JPG, PNG for 2D work, and additional formats like 3DS, OBJ, FBX for 3D models. We ensure compatibility with your needs."
                },
                {
                    question: "Do you provide construction support?",
                    answer: "Yes, we offer ongoing support during construction including clarifications, minor modifications, and consultation with contractors to ensure the design is implemented correctly."
                },
                {
                    question: "Can you work with existing architects or contractors?",
                    answer: "Absolutely! We collaborate effectively with architects, contractors, and other professionals. We can work from existing plans or provide our designs for their implementation."
                }
            ]
        },
        {
            title: "Technology & Specialization",
            faqs: [
                {
                    question: "What software do you use?",
                    answer: "We use industry-standard software including AutoCAD, SketchUp, 3ds Max, V-Ray, Photoshop, and other specialized tools to ensure high-quality, professional results."
                },
                {
                    question: "Do you specialize in Kashmiri architecture?",
                    answer: "Yes, we have deep expertise in traditional Kashmiri architecture including elements like intricate woodwork, traditional layouts, and local materials, while incorporating modern functionality and aesthetics."
                },
                {
                    question: "Can you create virtual walkthroughs?",
                    answer: "Yes, we create immersive virtual walkthroughs and 360-degree views that allow you to experience your space before construction. This helps in better visualization and decision-making."
                },
                {
                    question: "Do you work on commercial projects?",
                    answer: "Yes, we handle both residential and commercial projects including offices, retail spaces, restaurants, hotels, and public buildings. Our expertise spans various project types and scales."
                }
            ]
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Frequently Asked"
                subtitle="Questions"
                description="Find answers to common questions about our architectural visualization services, process, pricing, and more. Can't find what you're looking for? Contact us directly."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Contact Support"
                primaryButtonLink="/contact"
                secondaryButtonText="Get Quote"
                secondaryButtonLink="/get-quote"
                height="md"
            />

            {/* FAQ Content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-16 px-4"
            >
                <Div className="text-center mb-12">
                    <motion.h2 
                        className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Got <GradientText>Questions?</GradientText>
                    </motion.h2>
                    <motion.p 
                        className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        We've compiled answers to the most common questions about our services and process.
                    </motion.p>
                </Div>

                <Div className="space-y-12">
                    {faqCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        >
                            <GlassCard className="p-8">
                                <Div className="flex items-center mb-6">
                                    <HelpCircle size={24} className="text-primary-base mr-3" />
                                    <h3 className="text-24 font-bold text-secondary-800">{category.title}</h3>
                                </Div>
                                
                                <Div className="space-y-4">
                                    {category.faqs.map((faq, faqIndex) => {
                                        const globalIndex = categoryIndex * 100 + faqIndex;
                                        const isOpen = openFaq === globalIndex;
                                        
                                        return (
                                            <motion.div
                                                key={faqIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3, delay: faqIndex * 0.05 }}
                                                className="border border-neutral-200 rounded-lg overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleFaq(globalIndex)}
                                                    className="w-full px-6 py-4 text-left bg-white hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                                                >
                                                    <span className="text-16 font-medium text-secondary-800 group-hover:text-primary-base transition-colors">
                                                        {faq.question}
                                                    </span>
                                                    <Div className="text-primary-base">
                                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                    </Div>
                                                </button>
                                                
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        height: isOpen ? "auto" : 0,
                                                        opacity: isOpen ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                                                        <p className="text-14 text-secondary-600 leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </Div>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </Div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </Div>
            </motion.div>

            {/* CTA Section */}
            <CTASection
                title="Still Have Questions?"
                description="Can't find the answer you're looking for? Our team is here to help. Contact us directly and we'll get back to you as soon as possible."
                primaryButtonText="Contact Us"
                primaryButtonLink="/contact"
                secondaryButtonText="Schedule Call"
                secondaryButtonLink="/get-quote"
                showSecondaryButton={true}
                backgroundGradient="secondary"
            />
        </Div>
    );
};

export default Faq;