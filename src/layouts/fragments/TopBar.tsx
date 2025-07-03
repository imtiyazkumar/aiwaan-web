import React, { useState, useEffect } from "react";
import { Div, Flex, Span } from "../../components/general/BaseComponents";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Settings, FolderOpen, CreditCard } from "lucide-react";
import { AppRoutes, RouteDefinitions } from "../../routes/routes";
import { useAuth } from "../../root/providers/AuthProvider";

const TopBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth();
    const isAuthenticated = !!user;

    useEffect(() => {
        setIsMenuOpen(false);
        setIsAdminOpen(false);
    }, [location]);

    const serviceLinks = [
        { name: "2D Floor Plans", path: AppRoutes.Servises },
        { name: "3D Modeling", path: AppRoutes.Servises },
        { name: "Interior Design", path: AppRoutes.Servises },
        { name: "Exterior Renders", path: AppRoutes.Servises },
    ];

    const adminLinks = [
        { name: "Admin Projects", path: AppRoutes.AdminProjects, icon: <FolderOpen size={16} /> },
        { name: "Billing", path: AppRoutes.Billing, icon: <CreditCard size={16} /> },
    ];

    return (
        <Div className="w-full sticky top-0 z-50 transition-all duration-300 shadow-md bg-white/95 backdrop-blur-sm">
            <Flex className="w-full max-w-[1200px] mx-auto px-3 py-3 justify-between">
                <Link to="/" className="flex items-center group">
                    <Span className="text-24 font-bold text-secondary-500 transition-all duration-300 group-hover:scale-105">
                        AI<Span className="text-primary-base">WAAN</Span>
                    </Span>
                </Link>

                <Div className="hidden md:flex items-center space-x-6">
                    {RouteDefinitions.filter((link) => link.showInTopbar).map((link) => (
                        <NavLink
                            to={link.key}
                            key={link.key}
                            className={({ isActive }) => `text-16 font-medium transition-all duration-300 hover:scale-105 ${isActive ? "text-primary-base border-b-2 border-primary-base" : "text-secondary-500 hover:text-primary-base"}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Admin Dropdown - Only for authenticated users */}
                    {isAuthenticated && (
                        <Div className="relative">
                            <button
                                onClick={() => setIsAdminOpen(!isAdminOpen)}
                                className="flex items-center text-16 font-medium text-secondary-500 hover:text-primary-base transition-all duration-300 hover:scale-105"
                            >
                                <Settings size={18} className="mr-1" />
                                Admin
                                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isAdminOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isAdminOpen && (
                                <Div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 animate-slide-down">
                                    {adminLinks.map((adminLink) => (
                                        <NavLink
                                            key={adminLink.path}
                                            to={adminLink.path}
                                            className={({ isActive }) => `flex items-center px-4 py-2 text-14 transition-all duration-300 hover:bg-primary-50 hover:text-primary-base ${isActive ? "bg-primary-100 text-primary-base" : "text-secondary-600"}`}
                                        >
                                            {adminLink.icon}
                                            <span className="ml-2">{adminLink.name}</span>
                                        </NavLink>
                                    ))}
                                </Div>
                            )}
                        </Div>
                    )}

                    <NavLink
                        to={AppRoutes.Contact}
                        className={({ isActive }) => `px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 ${isActive ? "bg-primary-600 text-white" : "bg-primary-base text-white hover:bg-primary-600"}`}
                    >
                        Get a Quote
                    </NavLink>
                </Div>

                <Div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md transition-all duration-300 focus:outline-none text-secondary-500 hover:bg-primary-100 hover:scale-110"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </Div>
            </Flex>

            {isMenuOpen && (
                <Div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-slide-down">
                    <Div className="container mx-auto px-3 py-3 max-w-[1200px]">
                        <nav className="flex flex-col space-y-2">
                            {RouteDefinitions.filter((link) => link.showInTopbar).map((link) => (
                                <NavLink
                                    key={link.key}
                                    to={link.key}
                                    className={({ isActive }) => `py-2 px-2 rounded-md text-16 font-medium transition-all duration-300 hover:scale-105 ${isActive ? "bg-primary-100 text-primary-base" : "text-secondary-500 hover:bg-neutral-100"}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <Div className="py-2">
                                <Div className="px-2 font-medium text-16 text-secondary-500 mb-2 flex items-center">
                                    <Span>Services</Span>
                                    <ChevronDown size={16} className="ml-2" />
                                </Div>
                                <Div className="ml-2 border-l-2 border-neutral-200 pl-2 space-y-1">
                                    {serviceLinks.map((service) => (
                                        <NavLink
                                            key={service.name}
                                            to={service.path}
                                            className={({ isActive }) => `block py-1 text-14 transition-all duration-300 ${isActive ? "text-primary-base font-medium" : "text-neutral-600 hover:text-primary-base"}`}
                                        >
                                            {service.name}
                                        </NavLink>
                                    ))}
                                </Div>
                            </Div>

                            {/* Admin Section - Mobile */}
                            {isAuthenticated && (
                                <Div className="py-2">
                                    <Div className="px-2 font-medium text-16 text-secondary-500 mb-2 flex items-center">
                                        <Settings size={16} className="mr-2" />
                                        <Span>Admin</Span>
                                        <ChevronDown size={16} className="ml-2" />
                                    </Div>
                                    <Div className="ml-2 border-l-2 border-neutral-200 pl-2 space-y-1">
                                        {adminLinks.map((adminLink) => (
                                            <NavLink
                                                key={adminLink.path}
                                                to={adminLink.path}
                                                className={({ isActive }) => `flex items-center py-1 text-14 transition-all duration-300 ${isActive ? "text-primary-base font-medium" : "text-neutral-600 hover:text-primary-base"}`}
                                            >
                                                {adminLink.icon}
                                                <span className="ml-2">{adminLink.name}</span>
                                            </NavLink>
                                        ))}
                                    </Div>
                                </Div>
                            )}

                            <NavLink
                                to={AppRoutes.Contact}
                                className={({ isActive }) => `py-2 px-3 rounded-md text-center font-medium mt-2 transition-all duration-300 hover:scale-105 ${isActive ? "bg-primary-600 text-white" : "bg-primary-base text-white hover:bg-primary-600"}`}
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
