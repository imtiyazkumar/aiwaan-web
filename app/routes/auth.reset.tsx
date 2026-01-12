import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "~/lib/supabase";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Optional: Check if we have a session (which implies the recovery link worked)
        // If not, might redirect to login, but let's assume the flow handles it.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // If no session, the link might be invalid or expired, 
                // but checking this immediately might be racy with the auto-recovery.
                // Let's just let the user try to update.
            }
        });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password: password });
            if (error) throw error;

            // Success
            navigate("/auth/sign-in");
        } catch (err: any) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex className="min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <Div className="w-full max-w-md">
                <Div className={`${wrapperBaseClass} px-6 sm:px-8 py-8 sm:py-10`}>
                    <FlexColumn className="text-center mb-6 gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                            Reset Password
                        </h1>
                        <p className="text-sm text-secondary-600">
                            Enter your new password below
                        </p>
                    </FlexColumn>

                    {error && (
                        <Div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </Div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <TextInput
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary_filled"
                            height="large"
                            className="w-full mt-2 disabled:opacity-60"
                        >
                            {loading ? "Resetting…" : "Reset Password"}
                        </Button>
                    </form>

                    <Div className="mt-6 text-center text-sm text-secondary-600">
                        <Link
                            to="/auth/sign-in"
                            className="font-medium text-primary-base hover:text-primary-dark transition-colors"
                        >
                            Back to Sign In
                        </Link>
                    </Div>
                </Div>
            </Div>
        </Flex>
    );
}
