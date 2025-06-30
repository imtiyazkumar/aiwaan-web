import React from "react";
// import { Mail, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";
// import { sendPasswordResetEmail } from "firebase/auth";
// // import { auth } from "../../lib/firebase";
// import { Div } from "../../components/general/BaseComponents";
// import { Button, FormContainer, FormTitle, TextInput } from "../../components/UiComponents";
// import { AppRoutes } from "../../routes/routes";

const ResetPassword: React.FC = () => {
    // const [email, setEmail] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState(false);

    // const handleResetPassword = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setError("");
    //     setIsLoading(true);

    //     try {
    //         await sendPasswordResetEmail(auth, email);
    //         setSuccess(true);
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     } catch (err: any) {
    //         let errorMessage = "Failed to send reset email";
    //         if (err.code === "auth/user-not-found") {
    //             errorMessage = "No account exists with this email address";
    //         } else if (err.code === "auth/invalid-email") {
    //             errorMessage = "Invalid email address";
    //         }
    //         setError(errorMessage);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <div></div>

    );
};

export default ResetPassword;


{/* <Div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <Div className="max-w-[1200px] mx-auto w-full px-4 py-12">
        <Div className="max-w-[450px] mx-auto">
            <FormContainer>
                <form onSubmit={handleResetPassword}>
                    <FormTitle
                        title="Reset"
                        highlight="Password"
                        description="Enter your email and we'll send you a link to reset your password"
                    />

                    {error && (
                        <Div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                            <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
                            <p className="text-red-700 text-14">{error}</p>
                        </Div>
                    )}

                    {success ? (
                        <Div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center mb-6">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                            <h3 className="text-20 font-bold text-green-700 mb-2">Email Sent!</h3>
                            <p className="text-14 text-green-600 mb-4">
                                Check your inbox for instructions to reset your password. The link will expire in 1 hour.
                            </p>
                            <p className="text-14 text-green-700">
                                Didn't receive the email? Check your spam folder or{" "}
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="text-primary-500 hover:text-primary-600 font-medium"
                                >
                                    try again
                                </button>
                            </p>
                        </Div>
                    ) : (
                        <Div className="mb-8">
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
                    )}

                    {!success && (
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Send Reset Link <ArrowRight size={16} className="ml-2 inline" />
                        </Button>
                    )}

                    <Div className="mt-8 text-center">
                        <p className="text-14 text-secondary-600">
                            Remember your password?{" "}
                            <Link to={AppRoutes.SignIn} className="text-primary-500 hover:text-primary-600 font-medium">
                                Back to Sign In
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
</Div> */}
