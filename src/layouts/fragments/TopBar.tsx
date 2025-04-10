import React, { useState, useEffect } from "react";
import { Div } from "../../components/general/BaseComponents";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const TopBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Track scroll position for styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when navigating
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Main navigation links
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Services", path: "/services" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    // Services dropdown items
    const serviceLinks = [
        { name: "2D Floor Plans", path: "/services/2d-floor-plans" },
        { name: "3D Modeling", path: "/services/3d-modeling" },
        { name: "Interior Design", path: "/services/interior-design" },
        { name: "Exterior Renders", path: "/services/exterior-renders" },
    ];

    return (
        <Div className={`fixed top-0 right-0 left-0 md:left-[250px] z-40 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
            <Div className="container mx-auto px-4">
                <Div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-24 font-bold text-primary-base">ARCH<span className="text-secondary-500">VISTA</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <Div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-16 font-medium hover:text-primary-base transition-colors ${location.pathname === link.path ? "text-primary-base" : "text-secondary-500"}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="bg-primary-base text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors"
                        >
                            Get a Quote
                        </Link>
                    </Div>

                    {/* Mobile Menu Button */}
                    <Div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-secondary-500 hover:bg-primary-100 rounded-md transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </Div>
                </Div>
            </Div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <Div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fadeIn">
                    <Div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`py-2 px-3 rounded-md text-16 font-medium ${location.pathname === link.path ? "bg-primary-100 text-primary-base" : "text-secondary-500 hover:bg-neutral-100"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Services Section with Nested Links */}
                            <Div className="py-2">
                                <Div className="px-3 font-medium text-16 text-secondary-500 mb-2 flex items-center">
                                    <span>Services</span>
                                    <ChevronDown size={16} className="ml-2" />
                                </Div>
                                <Div className="ml-3 border-l-2 border-neutral-200 pl-3 space-y-2">
                                    {serviceLinks.map((service) => (
                                        <Link
                                            key={service.name}
                                            to={service.path}
                                            className="block py-1 text-14 text-neutral-600 hover:text-primary-base"
                                        >
                                            {service.name}
                                        </Link>
                                    ))}
                                </Div>
                            </Div>

                            <Link
                                to="/contact"
                                className="bg-primary-base text-white py-3 px-4 rounded-md text-center font-medium mt-2"
                            >
                                Get a Quote
                            </Link>
                        </nav>
                    </Div>
                </Div>
            )}
        </Div>
    );
};

export default TopBar;
