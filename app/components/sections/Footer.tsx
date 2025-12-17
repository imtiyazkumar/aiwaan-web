import React from "react";
import { Div, Flex, FlexColumn } from "../../components/general/BaseComponents";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, X } from "lucide-react";
import { Link } from "react-router";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Div className="bg-secondary-800 text-white mt-8 w-full">
            <Div className="hidden md:block  mx-auto py-8 px-4 ">
                <Div className="grid grid-cols-4 gap-6 mb-6">
                    <FlexColumn className="space-y-3">
                        <h3 className="text-20 font-bold text-white">AIWAAN</h3>
                        <p className="text-14 text-neutral-300">
                            Premium architectural visualization services based in Sopore, Jammu and Kashmir.
                        </p>
                        <Div className="flex space-x-2 mt-3">
                            <a href="#" className="bg-primary-base/20 p-2 rounded-full text-primary-300 hover:bg-primary/40 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="bg-primary-base/20 p-2 rounded-full text-primary-300 hover:bg-primary/40 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="bg-primary-base/20 p-2 rounded-full text-primary-300 hover:bg-primary/40 transition-colors">
                                <X size={18} />
                            </a>
                        </Div>
                    </FlexColumn>

                    <FlexColumn className="space-y-3">
                        <h3 className="text-16 font-bold text-primary-200">Quick Links</h3>
                        <Link to="/projects" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            Our Projects
                        </Link>
                        <Link to="/services" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            Services
                        </Link>
                        <Link to="/about" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            Contact
                        </Link>
                    </FlexColumn>

                    <FlexColumn className="space-y-3">
                        <h3 className="text-16 font-bold text-primary-200">Services</h3>
                        <Link to="/services" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            2D Floor Plans
                        </Link>
                        <Link to="/services" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            3D Modeling
                        </Link>
                        <Link to="/services" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            Interior Design
                        </Link>
                        <Link to="/services" className="text-14 text-neutral-300 hover:text-primary-300 transition-colors">
                            Exterior Renders
                        </Link>
                    </FlexColumn>

                    <FlexColumn className="space-y-3">
                        <h3 className="text-16 font-bold text-primary-300">Contact Us</h3>
                        <Flex className="text-14 text-neutral-300 items-start">
                            <MapPin size={18} className="mr-2 mt-1 text-primary-300" />
                            <span>Sopore, Jammu and Kashmir, India</span>
                        </Flex>
                        <Flex className="text-14 text-neutral-300 items-center">
                            <Phone size={18} className="mr-2 text-primary-300" />
                            <span>+91 123 456 7890</span>
                        </Flex>
                        <Flex className="text-14 text-neutral-300 items-center">
                            <Mail size={18} className="mr-2 text-primary-300" />
                            <span>info@aiwaan.com</span>
                        </Flex>
                    </FlexColumn>
                </Div>

                <Div className="border-t border-neutral-700 pt-4 flex justify-between items-center">
                    <Div className="text-14 text-neutral-300">
                        &copy; {currentYear} Aiwaan. All rights reserved.
                    </Div>

                    <Div className="flex space-x-4">
                        <Link to="/privacy-policy" className="text-14 text-neutral-300 hover:text-primary-200 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-14 text-neutral-300 hover:text-primary-200 transition-colors">
                            Terms of Service
                        </Link>
                    </Div>
                </Div>
            </Div>

            {/* Mobile Footer */}
            <Div className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary-500 shadow-lg z-40">
                <Div className="flex justify-between items-center px-3 py-2">
                    <a href="tel:+911234567890" className="flex flex-col items-center text-neutral-300">
                        <Phone size={20} className="text-primary-200" />
                        <span className="text-10 mt-1">Call</span>
                    </a>

                    <a href="mailto:info@aiwaan.com" className="flex flex-col items-center text-neutral-300">
                        <Mail size={20} className="text-primary-200" />
                        <span className="text-10 mt-1">Email</span>
                    </a>

                    <a href="https://maps.app.goo.gl" className="flex flex-col items-center text-neutral-300">
                        <MapPin size={20} className="text-primary-200" />
                        <span className="text-10 mt-1">Location</span>
                    </a>

                    <Link to="/contact" className="bg-primary-base text-white px-3 py-2 rounded-md text-12">
                        Contact Us
                    </Link>
                </Div>
            </Div>
        </Div>
    );
};

export default Footer;
