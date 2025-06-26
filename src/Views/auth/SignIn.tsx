import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../root/services/authService";
import { Button, FormContainer, FormTitle, TextInput } from "../../components/UiComponents";
import { Div } from "../../components/general/BaseComponents";
import { AppRoutes } from "../../routes/routes";
import { useAuth } from "../../root/providers/AuthProvider";
import AnimatedBackground from "../../components/ui/AnimatedBackground";
import GlassCard from "../../components/ui/GlassCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { session, user } = await signIn(email, password);
            auth.setToken(session.$id);
            auth.setUser(user);
            navigate(AppRoutes.Home);
        } catch (err: any) {
            let errorMessage = "Failed to sign in";
            
            if (err.code === 401) {
                errorMessage = "Invalid email or password";
            } else if (err.code === 429) {
                errorMessage = "Too many login attempts. Please try again later";
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <AnimatedBackground />
            
            {/* Background gradient */}
            <Div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-[1200px] mx-auto w-full px-4 py-12 relative z-10"
            >
                <Div className="max-w-[500px] mx-auto">
                    <GlassCard className="p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <FormTitle
                                title="Welcome"
                                highlight="Back"
                                description="Sign in to your account to continue your architectural journey"
                            />

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl flex items-start"
                                >
                                    <AlertCircle size={20} className="text-error-500 mr-3 mt-0.5" />
                                    <p className="text-error-700 text-14">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSignIn} className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <TextInput
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        icon={<Mail size={20} className="text-neutral-400" />}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="relative"
                                >
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        icon={<Lock size={20} className="text-neutral-400" />}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex justify-end"
                                >
                                    <Link 
                                        to={AppRoutes.ResetPassword} 
                                        className="text-14 text-primary-base hover:text-primary-600 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full group relative overflow-hidden"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Div className="flex items-center justify-center">
                                                <LoadingSpinner size="sm" color="text-white" />
                                                <span className="ml-2">Signing In...</span>
                                            </Div>
                                        ) : (
                                            <>
                                                Sign In 
                                                <ArrowRight size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="text-center"
                                >
                                    <p className="text-14 text-secondary-600">
                                        Don't have an account?{" "}
                                        <Link 
                                            to={AppRoutes.SignUp} 
                                            className="text-primary-base hover:text-primary-600 font-medium transition-colors"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </motion.div>
                            </form>
                        </motion.div>
                    </GlassCard>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-8 text-center"
                    >
                        <Link 
                            to={AppRoutes.Home} 
                            className="text-14 text-secondary-500 hover:text-secondary-700 transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>
                </Div>
            </motion.div>
        </Div>
    );
};

export default SignIn;