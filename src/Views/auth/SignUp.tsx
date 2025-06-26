import React, { useState } from "react";
import { Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AppRoutes } from "../../routes/routes";
import { Div } from "../../components/general/BaseComponents";
import { Button, Checkbox, FormContainer, FormGroup, FormTitle, TextInput } from "../../components/UiComponents";
import { auth } from "../../lib/firebase";

const SignUp: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with name
            await updateProfile(userCredential.user, {
                displayName: fullName
            });

            setSuccess(true);
            setTimeout(() => {
                navigate(AppRoutes.SignIn);
            }, 3000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            let errorMessage = "Failed to create account";
            if (err.code === "auth/email-already-in-use") {
                errorMessage = "Email already in use. Please use a different email";
            } else if (err.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters";
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <Div className="max-w-[1200px] mx-auto w-full px-4 py-12">
                <Div className="max-w-[500px] mx-auto">
                    <FormContainer>
                        {success ? (
                            <Div className="py-8 text-center">
                                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                                <h3 className="text-24 font-bold text-green-700 mb-2">Account Created Successfully!</h3>
                                <p className="text-16 text-green-600 mb-6">You will be redirected to sign in page shortly.</p>
                                <Link
                                    to={AppRoutes.SignIn}
                                    className="text-primary-500 hover:text-primary-600 font-medium"
                                >
                                    Sign In Now
                                </Link>
                            </Div>
                        ) : (
                            <form onSubmit={handleSignUp}>
                                <FormTitle
                                    title="Create"
                                    highlight="Account"
                                    description="Join Aiwaan to access architectural design services"
                                />

                                {error && (
                                    <Div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                                        <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
                                        <p className="text-red-700 text-14">{error}</p>
                                    </Div>
                                )}

                                <Div className="mb-6">
                                    <TextInput
                                        id="fullName"
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        icon={<User size={20} className="text-neutral-400" />}
                                    />
                                </Div>

                                <FormGroup columns={1} className="mb-6">
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
                                </FormGroup>

                                <FormGroup columns={1} className="mb-6">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Create a password (min. 6 characters)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        icon={<Lock size={20} className="text-neutral-400" />}
                                    />
                                </FormGroup>

                                <Div className="mb-8">
                                    <Checkbox
                                        id="agreeTerms"
                                        label="I agree to the Terms of Service and Privacy Policy"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                    />
                                </Div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    isLoading={isLoading}
                                >
                                    Create Account <ArrowRight size={16} className="ml-2 inline" />
                                </Button>

                                <Div className="mt-8 text-center">
                                    <p className="text-14 text-secondary-600">
                                        Already have an account?{" "}
                                        <Link to={AppRoutes.SignIn} className="text-primary-500 hover:text-primary-600 font-medium">
                                            Sign In
                                        </Link>
                                    </p>
                                </Div>
                            </form>
                        )}
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

export default SignUp;
