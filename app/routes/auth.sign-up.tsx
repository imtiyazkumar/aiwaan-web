import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

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
            await register(email, password, name);
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-2xl px-6 sm:px-10 py-10`}>
                <FlexColumn className="gap-6 w-full md:px-6">

                    <FlexColumn className="text-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                            Create Account
                        </h1>
                        <p className="text-sm text-secondary-600">
                            Join Aiwaan and get started
                        </p>
                    </FlexColumn>

                    {error && (
                        <Div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </Div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <TextInput
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

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

                        <TextInput
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary_filled"
                            height="large"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Creating account…" : "Sign Up"}
                        </Button>
                    </form>

                    <Div className="text-center text-sm text-secondary-600">
                        Already have an account?
                        <Link
                            to="/auth/sign-in"
                            className="ml-1 font-medium text-primary-base hover:text-primary-dark transition-colors"
                        >
                            Sign in
                        </Link>
                    </Div>

                </FlexColumn>
            </Div>
        </Flex>
    );
}
