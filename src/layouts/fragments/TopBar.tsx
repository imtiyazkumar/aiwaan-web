import React, { useState, useEffect } from "react";
import { Div, Flex, Span } from "../../components/general/BaseComponents";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AppRoutes, RouteDefinitions } from "../../routes/routes";

const TopBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const serviceLinks = [
        { name: "2D Floor Plans", path: "/services/2d-floor-plans" },
        { name: "3D Modeling", path: "/services/3d-modeling" },
        { name: "Interior Design", path: "/services/interior-design" },
        { name: "Exterior Renders", path: "/services/exterior-renders" },
    ];

    return (
        <Div className="w-full sticky top-0 z-50 transition-all duration-300 shadow-md">
            <Flex className="w-full max-w-[1200px] mx-auto px-4 py-4 bg-white justify-between">
                <Link to="/" className="flex items-center">
                    <Span className="text-24 font-bold text-secondary-500">
                        AI<Span className="text-primary-base">WAAN</Span>
                    </Span>
                </Link>
                <Div className="hidden md:flex items-center space-x-8">
                    {RouteDefinitions.filter((link) => link.showInTopbar).map((link) => (
                        <NavLink
                            to={link.key}
                            key={link.key}
                            className={({ isActive }) => `text-16 font-medium transition-colors ${isActive ? "text-primary-base border-b-2 border-primary-base" : "text-secondary-500 hover:text-primary-base"}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to={AppRoutes.Contact}
                        className={({ isActive }) => `px-6 py-2 rounded-md transition-colors ${isActive ? "bg-primary-600 text-white" : "bg-primary-base text-white hover:bg-primary-600"}`}
                    >
                        Get a Quote
                    </NavLink>
                </Div>
                <Div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md transition-colors focus:outline-none text-secondary-500 hover:bg-primary-100"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </Div>
            </Flex>

            {isMenuOpen && (
                <Div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fadeIn">
                    <Div className="container mx-auto px-4 py-4 max-w-[1200px]">
                        <nav className="flex flex-col space-y-3">
                            {RouteDefinitions.filter((link) => link.showInTopbar).map((link) => (
                                <NavLink
                                    key={link.key}
                                    to={link.key}
                                    className={({ isActive }) => `py-2 px-3 rounded-md text-16 font-medium ${isActive ? "bg-primary-100 text-primary-base" : "text-secondary-500 hover:bg-neutral-100"}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <Div className="py-2">
                                <Div className="px-3 font-medium text-16 text-secondary-500 mb-2 flex items-center">
                                    <Span>Services</Span>
                                    <ChevronDown size={16} className="ml-2" />
                                </Div>
                                <Div className="ml-3 border-l-2 border-neutral-200 pl-3 space-y-2">
                                    {serviceLinks.map((service) => (
                                        <NavLink
                                            key={service.name}
                                            to={service.path}
                                            className={({ isActive }) => `block py-1 text-14 ${isActive ? "text-primary-base font-medium" : "text-neutral-600 hover:text-primary-base"}`}
                                        >
                                            {service.name}
                                        </NavLink>
                                    ))}
                                </Div>
                            </Div>

                            <NavLink
                                to={AppRoutes.Contact}
                                className={({ isActive }) => `py-3 px-4 rounded-md text-center font-medium mt-2 ${isActive ? "bg-primary-600 text-white" : "bg-primary-base text-white hover:bg-primary-600"}`}
                            >
                                Get a Quote
                            </NavLink>
                        </nav>
                    </Div>
                </Div>
            )}
        </Div>
    );
};

export default TopBar;
