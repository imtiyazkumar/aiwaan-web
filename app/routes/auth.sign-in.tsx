import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
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
                            Welcome Back
                        </h1>
                        <p className="text-sm text-secondary-600">
                            Sign in to continue to Aiwaan
                        </p>
                    </FlexColumn>

                    {error && (
                        <Div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </Div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <TextInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <Flex className="justify-end">
                            <Link
                                to="/auth/request-reset"
                                className="text-xs sm:text-sm font-medium text-primary-base hover:text-primary-dark transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </Flex>

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary_filled"
                            height="large"
                            className="w-full mt-2 disabled:opacity-60"
                        >
                            {loading ? "Signing in…" : "Sign In"}
                        </Button>
                    </form>

                    <Div className="mt-6 text-center text-sm text-secondary-600">
                        Don’t have an account?
                        <Link
                            to="/auth/sign-up"
                            className="ml-1 font-medium text-primary-base hover:text-primary-dark transition-colors"
                        >
                            Create one
                        </Link>
                    </Div>
                </Div>
            </Div>
        </Flex>
    );
}
