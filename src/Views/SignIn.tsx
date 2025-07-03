import React, { useState } from "react";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../root/providers/AuthProvider";
import { signIn } from "../root/services/authService";
import { AppRoutes } from "../routes/routes";
import { Div } from "../components/general/BaseComponents";
import GlassCard from "../components/ui/GlassCard";
import { Button, FormTitle, TextInput } from "../components/UiComponents";

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
            {/* Background gradient */}
            <Div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />

            <Div className="max-w-[1200px] mx-auto w-full px-4 py-12 relative z-10">
                <Div className="max-w-[500px] mx-auto">
                    <GlassCard className="p-8">
                        <FormTitle
                            title="Welcome"
                            highlight="Back"
                            description="Sign in to your account to continue your architectural journey"
                        />

                        {error && (
                            <Div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl flex items-start">
                                <AlertCircle size={20} className="text-error-500 mr-3 mt-0.5" />
                                <p className="text-error-700 text-14">{error}</p>
                            </Div>
                        )}

                        <form onSubmit={handleSignIn} className="space-y-6">
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

                            <Div className="relative">
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
                            </Div>

                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full md:w-auto"
                                disabled={isLoading}
                                icon={
                                    <ArrowRight
                                        size={16}
                                        className="ml-2 inline group-hover:translate-x-1 transition-transform"
                                    />
                                }
                                isLoading={isLoading}
                                label="Sign In"
                            />
                        </form>
                    </GlassCard>
                </Div>
            </Div>
        </Div>
    );
};

export default SignIn;
