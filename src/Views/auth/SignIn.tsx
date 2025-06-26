import React, { useState } from "react";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, FormContainer, FormTitle, TextInput } from "../../components/UiComponents";
import { Div } from "../../components/general/BaseComponents";
import { AppRoutes } from "../../routes/routes";
import { auth as firebaseAuth } from "../../lib/firebase";
import { useAuth } from "../../root/providers/AuthProvider";


const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
            auth.setToken(res.user?.accessToken);
            // navigate(AppRoutes.Home);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            let errorMessage = "Failed to sign in";

            console.log(err);
            if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
                errorMessage = "Invalid email or password";
            } else if (err.code === "auth/too-many-requests") {
                errorMessage = "Too many unsuccessful login attempts. Please try again later";
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <Div className="max-w-[1200px] mx-auto w-full px-4 py-12">
                <Div className="max-w-[450px] mx-auto">
                    <FormContainer>
                        <form onSubmit={handleSignIn}>
                            <FormTitle
                                title="Welcome"
                                highlight="Back"
                                description="Sign in to your account to continue"
                            />

                            {error && (
                                <Div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                                    <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
                                    <p className="text-red-700 text-14">{error}</p>
                                </Div>
                            )}

                            <Div className="mb-6">
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
                            </Div>

                            <Div className="mb-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    icon={<Lock size={20} className="text-neutral-400" />}
                                />
                            </Div>

                            <Div className="flex justify-end mb-6">
                                <Link to={AppRoutes.ResetPassword} className="text-14 text-primary-500 hover:text-primary-600">
                                    Forgot password?
                                </Link>
                            </Div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                Sign In <ArrowRight size={16} className="ml-2 inline" />
                            </Button>

                            <Div className="mt-8 text-center">
                                <p className="text-14 text-secondary-600">
                                    Don't have an account?{" "}
                                    <Link to={AppRoutes.SignUp} className="text-primary-500 hover:text-primary-600 font-medium">
                                        Sign Up
                                    </Link>
                                </p>
                            </Div>
                        </form>
                    </FormContainer>

                    <Div className="mt-8 text-center">
                        <Link to={AppRoutes.Home} className="text-14 text-secondary-500 hover:text-secondary-700">
                            ← Back to Home
                        </Link>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default SignIn;
