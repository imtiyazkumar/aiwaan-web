import React from "react";
import { Div } from "../../components/general/BaseComponents";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Div className="bg-secondary-500 text-white md:ml-[250px]">
            {/* Footer for larger screens */}
            <Div className="hidden md:block container mx-auto py-8 px-6">
                <Div className="flex justify-between items-center">
                    <Div className="text-14 text-neutral-300">
                        &copy; {currentYear} ArchVista. All rights reserved.
                    </Div>

                    <Div className="flex space-x-4">
                        <Link to="/privacy-policy" className="text-14 text-neutral-300 hover:text-primary-base transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-14 text-neutral-300 hover:text-primary-base transition-colors">
                            Terms of Service
                        </Link>
                    </Div>

                    <Div className="flex space-x-3">
                        <a href="#" className="text-neutral-300 hover:text-primary-base transition-colors">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="text-neutral-300 hover:text-primary-base transition-colors">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="text-neutral-300 hover:text-primary-base transition-colors">
                            <Twitter size={18} />
                        </a>
                    </Div>
                </Div>
            </Div>

            {/* Mobile Footer */}
            <Div className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary-500 shadow-lg z-40">
                <Div className="flex justify-between items-center px-4 py-3">
                    <a href="tel:+1234567890" className="flex flex-col items-center text-neutral-300">
                        <Phone size={20} />
                        <span className="text-10 mt-1">Call</span>
                    </a>

                    <a href="mailto:info@archvista.com" className="flex flex-col items-center text-neutral-300">
                        <Mail size={20} />
                        <span className="text-10 mt-1">Email</span>
                    </a>

                    <a href="#" className="flex flex-col items-center text-neutral-300">
                        <MapPin size={20} />
                        <span className="text-10 mt-1">Location</span>
                    </a>

                    <Link to="/contact" className="bg-primary-base text-white px-4 py-2 rounded-md text-12">
                        Contact Us
                    </Link>
                </Div>
            </Div>
        </Div>
    );
};

export default Footer;
