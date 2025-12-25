import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function RequestResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-2xl px-6 sm:px-10 py-10`}>
                <FlexColumn className="gap-6 w-full md:px-6">

                    {success ? (
                        <FlexColumn className="text-center gap-4">
                            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                                Check Your Email
                            </h1>
                            <p className="text-sm text-secondary-600">
                                We’ve sent a password reset link to
                                <span className="font-medium text-secondary-900"> {email}</span>.
                            </p>
                            <Link
                                to="/auth/sign-in"
                                className="font-medium text-primary-base hover:text-primary-dark transition-colors"
                            >
                                Back to Sign In
                            </Link>
                        </FlexColumn>
                    ) : (
                        <>
                            <FlexColumn className="text-center gap-2">
                                <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                                    Reset Password
                                </h1>
                                <p className="text-sm text-secondary-600">
                                    Enter your email to receive a reset link
                                </p>
                            </FlexColumn>

                            {error && (
                                <Div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </Div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <TextInput
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="primary_filled"
                                    height="large"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? "Sending…" : "Send Reset Link"}
                                </Button>
                            </form>

                            <Div className="text-center text-sm text-secondary-600">
                                <Link
                                    to="/auth/sign-in"
                                    className="font-medium text-primary-base hover:text-primary-dark transition-colors"
                                >
                                    Back to Sign In
                                </Link>
                            </Div>
                        </>
                    )}

                </FlexColumn>
            </Div>
        </Flex>
    );
}
