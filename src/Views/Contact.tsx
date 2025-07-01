import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, User, MessageSquare } from "lucide-react";
import { Div } from "../components/general/BaseComponents";
import { Button, FormGroup, FormTitle, Radio, Select, TextArea, TextInput } from "../components/UiComponents";
import { useContactMessages } from "../hooks/useContactMessages";
import { useToast } from "../root/providers/ToastProvider";
import HeroSection from "../components/sections/HeroSection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";
import AnimatedBackground from "../components/ui/AnimatedBackground";

const Contact: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { useCreateDocument } = useContactMessages();
    const createMessage = useCreateDocument();
    const toast = useToast();

    const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", message: "", type: "", size: "", description: "", new_to_architecture: false, });

    const projectTypeOptions = [
        { value: "residential-interior", label: "Residential Interior" },
        { value: "residential-exterior", label: "Residential Exterior" },
        { value: "commercial-space", label: "Commercial Space" },
        { value: "office-interior", label: "Office Interior" },
        { value: "landscape-design", label: "Landscape Design" },
        { value: "custom-project", label: "Custom Project" }
    ];

    const contactInfo = [
        {
            icon: <MapPin size={24} className="text-primary-base" />,
            title: "Visit Us",
            details: ["Main Office: Sopore, Kashmir", "Design Studio: Srinagar, Kashmir"]
        },
        {
            icon: <Phone size={24} className="text-primary-base" />,
            title: "Call Us",
            details: ["+91 900 000 0000", "+91 800 000 0000"]
        },
        {
            icon: <Mail size={24} className="text-primary-base" />,
            title: "Email Us",
            details: ["info@aiwaan.com", "projects@aiwaan.com"]
        },
        {
            icon: <Clock size={24} className="text-primary-base" />,
            title: "Working Hours",
            details: ["Monday-Friday: 9am - 6pm", "Saturday: 10am - 4pm"]
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const messageData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                type: formData.type,
                size: formData.size,
                description: formData.message,
                new_to_architecture: formData.new_to_architecture,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            await createMessage.mutateAsync(messageData);
            setFormSubmitted(true);
            toast.success("Message sent successfully!");

            // Reset form
            setFormData({ name: "", email: "", phone: "", address: "", message: "", type: "", size: "", description: "", new_to_architecture: false, });

            setTimeout(() => setFormSubmitted(false), 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit. Please try again.");
        }
    };

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Get in Touch"
                subtitle="With Aiwaan"
                description="Have questions about our services or ready to start a project? We're here to help bring your architectural vision to life."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Start Project"
                primaryButtonLink="#contact-form"
                secondaryButtonText="View Portfolio"
                secondaryButtonLink="/projects"
                height="md"
            />

            {/* Contact Information */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-16 px-4"
            >
                <Div className="text-center mb-12">
                    <h2 className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display">
                        Contact <GradientText>Information</GradientText>
                    </h2>
                    <p className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed">
                        Reach out to us through any of these channels. We're always ready to discuss your project.
                    </p>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlassCard className="p-6 text-center h-full">
                                <Div className="bg-primary-100 p-4 rounded-2xl w-fit mx-auto mb-4">
                                    {item.icon}
                                </Div>
                                <h3 className="text-18 font-bold text-secondary-800 mb-3">{item.title}</h3>
                                {item.details.map((detail, i) => (
                                    <p key={i} className="text-14 text-secondary-600 mb-1">{detail}</p>
                                ))}
                            </GlassCard>
                        </motion.div>
                    ))}
                </Div>
            </motion.div>

            {/* Contact/Quote Form */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="py-16 px-4 relative"
                id="contact-form"
            >
                <AnimatedBackground />

                <GlassCard className="p-8 relative z-10">
                    {formSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="py-12 text-center"
                        >
                            <CheckCircle size={64} className="text-success-500 mx-auto mb-4" />
                            <h3 className="text-24 font-bold text-success-700 mb-2">
                                contact
                            </h3>
                            <p className="text-16 text-success-600 mb-6">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                            </p>
                            <Button
                                type="submit"
                                variant="outline"
                                label=" Send Another Message"
                                className="w-full md:w-auto"
                            />
                        </motion.div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <FormTitle
                                    title="contact"
                                    highlight="us"
                                    description="Tell us about your project and we\'ll provide you with a detailed estimate."
                                />

                                {/* Personal Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200 flex items-center">
                                        <User size={20} className="mr-2 text-primary-base" />
                                        Personal Information
                                    </h3>

                                    <FormGroup>
                                        <TextInput
                                            id="name"
                                            label="Full Name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            label="Email Address"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="mt-6">
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            label="Phone Number"
                                            placeholder="+91 900 000 0000"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <TextInput
                                            id="address"
                                            label="Location/Address"
                                            placeholder="City, State"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className="mt-6">
                                        <Select
                                            id="type"
                                            label="Project Type"
                                            options={projectTypeOptions}
                                            value={formData.type}
                                            onChange={(e) => handleSelectChange("type", e.target.value)}
                                            required
                                        />
                                        <TextInput
                                            id="size"
                                            label="Project Size (sq. ft)"
                                            placeholder="Approximate size"
                                            value={formData.size}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>

                                    <Div className="mt-6">
                                        <label className="block text-secondary-700 mb-2">Have you worked with an architectural firm before?</label>
                                        <Div className="flex space-x-6">
                                            <Radio
                                                id="prevWorkYes"
                                                name="previousWork"
                                                value="yes"
                                                label="Yes"
                                                onChange={() => setFormData(prev => ({ ...prev, new_to_architecture: false }))}
                                            />
                                            <Radio
                                                id="prevWorkNo"
                                                name="previousWork"
                                                value="no"
                                                label="No"
                                                onChange={() => setFormData(prev => ({ ...prev, new_to_architecture: true }))}
                                            />
                                        </Div>
                                    </Div>


                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200 flex items-center">
                                        <MessageSquare size={20} className="mr-2 text-primary-base" />
                                        Your Message
                                    </h3>


                                    <Div className="mb-6">
                                        <TextArea
                                            id="message"
                                            label="Message"
                                            placeholder="Tell us about your inquiry or project..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-center"
                                >
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        label="Send Message"
                                        className="w-full md:w-auto"
                                        icon={<Send size={16} className="ml-2" />}
                                        isLoading={createMessage.isPending}
                                    />
                                </motion.div>
                            </form>
                        </>
                    )}
                </GlassCard>

                {/* What Happens Next */}
                {!formSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-12"
                    >
                        <GlassCard className="p-8">
                            <h3 className="text-24 font-bold text-secondary-800 mb-6 text-center">What Happens Next?</h3>
                            <Div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { step: "1", title: "Review", desc: "We'll review your project requirements within 24 hours." },
                                    { step: "2", title: "Quote", desc: "We'll prepare a detailed quote based on your specifications." },
                                    { step: "3", title: "Consultation", desc: "Schedule a call to discuss the quote and next steps." }
                                ].map((item, index) => (
                                    <Div key={index} className="text-center">
                                        <Div className="w-12 h-12 rounded-full bg-primary-base flex items-center justify-center text-white font-bold mb-3 mx-auto">
                                            {item.step}
                                        </Div>
                                        <h4 className="text-16 font-semibold text-secondary-800 mb-2">{item.title}</h4>
                                        <p className="text-14 text-secondary-600">{item.desc}</p>
                                    </Div>
                                ))}
                            </Div>
                        </GlassCard>
                    </motion.div>
                )}
            </motion.div>
        </Div>
    );
};

export default Contact;
