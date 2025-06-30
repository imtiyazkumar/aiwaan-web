import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../root/services/authService";
import { AppRoutes } from "../../routes/routes";
import { Div } from "../../components/general/BaseComponents";
import { Button, Checkbox, FormTitle, TextInput } from "../../components/UiComponents";
import AnimatedBackground from "../../components/ui/AnimatedBackground";
import GlassCard from "../../components/ui/GlassCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SignUp: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!agreeTerms) {
            setError("You must agree to the Terms of Service and Privacy Policy");
            setIsLoading(false);
            return;
        }

        try {
            await createAccount(email, password, fullName);
            setSuccess(true);
            setTimeout(() => {
                navigate(AppRoutes.SignIn);
            }, 3000);
        } catch (err: any) {
            let errorMessage = "Failed to create account";
            if (err.code === 409) {
                errorMessage = "Email already in use. Please use a different email";
            } else if (err.code === 400) {
                errorMessage = "Password should be at least 8 characters";
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
                <Div className="max-w-[550px] mx-auto">
                    <GlassCard className="p-8">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="py-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <CheckCircle size={64} className="text-success-500 mx-auto mb-4" />
                                </motion.div>
                                <h3 className="text-24 font-bold text-success-700 mb-2">Account Created Successfully!</h3>
                                <p className="text-16 text-success-600 mb-6">You will be redirected to sign in page shortly.</p>
                                <Link
                                    to={AppRoutes.SignIn}
                                    className="text-primary-base hover:text-primary-600 font-medium transition-colors"
                                >
                                    Sign In Now
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <FormTitle
                                    title="Create"
                                    highlight="Account"
                                    description="Join Aiwaan to access premium architectural design services"
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

                                <form onSubmit={handleSignUp} className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <TextInput
                                            id="fullName"
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            icon={<User size={20} className="text-neutral-400" />}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
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
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="relative"
                                    >
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            label="Password"
                                            placeholder="Create a password (min. 8 characters)"
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
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <Checkbox
                                            id="agreeTerms"
                                            label="I agree to the Terms of Service and Privacy Policy"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full group"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <Div className="flex items-center justify-center">
                                                    <LoadingSpinner size="sm" color="text-white" />
                                                    <span className="ml-2">Creating Account...</span>
                                                </Div>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <ArrowRight size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                        className="text-center"
                                    >
                                        <p className="text-14 text-secondary-600">
                                            Already have an account?{" "}
                                            <Link
                                                to={AppRoutes.SignIn}
                                                className="text-primary-base hover:text-primary-600 font-medium transition-colors"
                                            >
                                                Sign In
                                            </Link>
                                        </p>
                                    </motion.div>
                                </form>
                            </motion.div>
                        )}
                    </GlassCard>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
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

export default SignUp;
