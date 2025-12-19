import { Link, NavLink } from "react-router";
import { Div, Flex } from "~/components/general/BaseComponents";
import { useAuth } from "~/contexts/AuthContext";
import { RouteDefinitions } from "~/utils/constants";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block w-full rounded-md px-4 py-3 text-base font-medium transition-all ${isActive ? "bg-primary-base/10 text-primary-base" : "text-gray-700 hover:bg-gray-100 hover:text-primary-base"}`;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-md">
            <Div className="px-4 sm:px-6 lg:px-8">
                <Flex className="h-12 md:h-16 items-center justify-between">
                    <Flex className="gap-8">
                        <Link to="/" className="text-xl font-bold text-gray-900">
                            Aiwaan
                        </Link>

                        <Flex className="hidden md:flex items-center gap-6">
                            {RouteDefinitions.filter(l => l.showInTopbar).map(link => (
                                <NavLink key={link.key} to={link.key} className={({ isActive }) => `text-sm font-medium transition-all ${isActive ? "text-primary-base border-b-2 border-primary-base" : "text-secondary-500 hover:text-primary-base"}`}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </Flex>
                    </Flex>

                    <Flex className="gap-2">
                        <Flex className="hidden md:flex  items-center gap-4">
                            {user ?
                                <>
                                    {RouteDefinitions.filter(l => l.isAdmin).map(link => (
                                        <NavLink key={link.key} to={link.key} className={({ isActive }) => `text-sm font-medium transition-all ${isActive ? "text-primary-base border-b-2 border-primary-base" : "text-secondary-500 hover:text-primary-base"}`}>
                                            {link.label}
                                        </NavLink>
                                    ))}
                                    <button onClick={logout} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                                        Logout
                                    </button>
                                </> :
                                <>
                                    <Link to="/auth/sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sign In
                                    </Link>
                                    <Link to="/auth/sign-up" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                        Sign Up
                                    </Link>
                                </>
                            }
                        </Flex>

                        <button onClick={() => setOpen(!open)} className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </Flex>
                </Flex>
            </Div>

            {open && (
                <Div className="md:hidden border-t bg-white px-4 py-4">
                    <Div className="space-y-2">
                        {RouteDefinitions.filter(l => l.showInTopbar).map(link => (
                            <NavLink key={link.key} to={link.key} onClick={() => setOpen(false)} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </Div>

                    <Div className="mt-6 border-t pt-4 space-y-2">
                        {user ?
                            <>
                                {RouteDefinitions.filter(l => l.isAdmin).map(link => (
                                    <NavLink key={link.key} to={link.key} onClick={() => setOpen(false)} className={linkClass}>
                                        {link.label}
                                    </NavLink>
                                ))}
                                <button onClick={logout} className="w-full rounded-md bg-red-600 px-4 py-3 text-base font-medium text-white hover:bg-red-700">
                                    Logout
                                </button>
                            </> :
                            <>
                                <Link to="/auth/sign-in" onClick={() => setOpen(false)} className="block w-full rounded-md px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100">
                                    Sign In
                                </Link>
                                <Link to="/auth/sign-up" onClick={() => setOpen(false)} className="block w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </>
                        }
                    </Div>
                </Div>
            )}
        </nav>
    );
};

export default Navbar;
