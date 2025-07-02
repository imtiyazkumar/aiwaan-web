import React from "react";
import { Shield, Eye, Lock, Users, Mail, Phone } from "lucide-react";
import { Div } from "../components/general/BaseComponents";
import HeroSection from "../components/sections/HeroSection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const PrivacyPolicy: React.FC = () => {
    const sections = [
        {
            icon: <Shield size={24} className="text-primary-base" />,
            title: "Information We Collect",
            content: [
                "Personal information you provide when contacting us or requesting quotes (name, email, phone number, address)",
                "Project details and requirements you share with us",
                "Communication records between you and our team",
                "Website usage data through cookies and analytics tools",
                "Payment information when processing transactions (securely handled by third-party processors)"
            ]
        },
        {
            icon: <Eye size={24} className="text-primary-base" />,
            title: "How We Use Your Information",
            content: [
                "To provide architectural visualization services and project consultations",
                "To communicate with you about your projects and our services",
                "To send project updates, quotes, and relevant information",
                "To improve our services and website functionality",
                "To comply with legal obligations and protect our business interests",
                "To send occasional newsletters and service updates (with your consent)"
            ]
        },
        {
            icon: <Lock size={24} className="text-primary-base" />,
            title: "Information Protection",
            content: [
                "We implement industry-standard security measures to protect your data",
                "All sensitive information is encrypted during transmission and storage",
                "Access to your personal information is limited to authorized personnel only",
                "We regularly update our security protocols and conduct security audits",
                "Payment information is processed through secure, PCI-compliant payment processors",
                "We maintain backup systems to prevent data loss"
            ]
        },
        {
            icon: <Users size={24} className="text-primary-base" />,
            title: "Information Sharing",
            content: [
                "We do not sell, trade, or rent your personal information to third parties",
                "We may share information with trusted service providers who assist in our operations",
                "Information may be disclosed if required by law or to protect our legal rights",
                "Project details may be shared with contractors or consultants involved in your project (with your consent)",
                "Anonymized data may be used for business analysis and service improvement"
            ]
        },
        {
            icon: <Mail size={24} className="text-primary-base" />,
            title: "Your Rights",
            content: [
                "Right to access: You can request copies of your personal data",
                "Right to rectification: You can request correction of inaccurate information",
                "Right to erasure: You can request deletion of your personal data",
                "Right to restrict processing: You can request limitation of data processing",
                "Right to data portability: You can request transfer of your data",
                "Right to object: You can object to certain types of data processing"
            ]
        },
        {
            icon: <Phone size={24} className="text-primary-base" />,
            title: "Contact Information",
            content: [
                "If you have questions about this privacy policy, please contact us:",
                "Email: privacy@aiwaan.com",
                "Phone: +91 900 000 0000",
                "Address: Sopore, Jammu and Kashmir, India",
                "We will respond to privacy-related inquiries within 30 days"
            ]
        }
    ];

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Privacy"
                subtitle="Policy"
                description="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our architectural visualization services."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Contact Us"
                primaryButtonLink="/contact"
                secondaryButtonText="Back to Home"
                secondaryButtonLink="/"
                height="md"
            />

            {/* Policy Content */}
            <Div

                className="py-16 px-4"
            >
                <Div className="text-center mb-12">
                    <div
                        className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"

                    >
                        Our <GradientText>Commitment</GradientText>
                    </div>
                    <Div
                        className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"

                    >
                        We are committed to protecting your privacy and ensuring the security of your personal information.
                        This policy was last updated on January 1, 2024.
                    </Div>
                </Div>

                <Div className="space-y-8">
                    {sections.map((section, index) => (
                        <Div
                            key={index}

                        >
                            <GlassCard className="p-8">
                                <Div className="flex items-start mb-6">
                                    <Div className="bg-primary-100 p-3 rounded-lg mr-4">
                                        {section.icon}
                                    </Div>
                                    <Div className="flex-1">
                                        <h3 className="text-24 font-bold text-secondary-800 mb-4">
                                            {section.title}
                                        </h3>
                                        <Div className="space-y-3">
                                            {section.content.map((item, itemIndex) => (
                                                <Div key={itemIndex} className="flex items-start">
                                                    <Div className="w-2 h-2 bg-primary-base rounded-full mt-2 mr-3 flex-shrink-0"></Div>
                                                    <p className="text-14 text-secondary-600 leading-relaxed">
                                                        {item}
                                                    </p>
                                                </Div>
                                            ))}
                                        </Div>
                                    </Div>
                                </Div>
                            </GlassCard>
                        </Div>
                    ))}
                </Div>

                {/* Additional Information */}
                <Div

                    className="mt-12"
                >
                    <GlassCard className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
                        <Div className="text-center">
                            <h3 className="text-24 font-bold text-secondary-800 mb-4">
                                Policy Updates
                            </h3>
                            <p className="text-14 text-secondary-600 leading-relaxed mb-6">
                                We may update this privacy policy from time to time to reflect changes in our practices
                                or for other operational, legal, or regulatory reasons. We will notify you of any material
                                changes by posting the updated policy on our website and updating the "last updated" date.
                            </p>
                            <p className="text-12 text-secondary-500">
                                By continuing to use our services after any changes to this policy,
                                you acknowledge that you have read and agree to the updated privacy policy.
                            </p>
                        </Div>
                    </GlassCard>
                </Div>
            </Div>
        </Div>
    );
};

export default PrivacyPolicy;
