import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '~/lib/api';
// import type { User } from '@supabase/supabase-js'; // Removed dependency

interface User {
    id: string;
    aud: string;
    role?: string;
    email?: string;
    email_confirmed_at?: string;
    phone?: string;
    confirmation_sent_at?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata: {
        provider?: string;
        [key: string]: any;
    };
    user_metadata: {
        [key: string]: any;
    };
    identities?: {
        id: string;
        user_id: string;
        identity_data?: {
            [key: string]: any;
        };
        provider: string;
        last_sign_in_at?: string;
        created_at?: string;
        updated_at?: string;
    }[];
    created_at: string;
    updated_at: string;
}

interface Profile {
    id: string;
    email: string | undefined;
    full_name: string | null;
    avatar_url: string | null;
    is_admin: boolean;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    async function checkSession() {
        const token = api.getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const { user } = await api.get<{ user: User }>('/auth/me');
            if (user) {
                setUser(user);
                await fetchProfile(user.id);
            } else {
                api.removeToken();
                setUser(null);
                setProfile(null);
            }
        } catch (error) {
            console.error("Session check failed:", error);
            api.removeToken();
            setUser(null);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }

    async function fetchProfile(userId: string) {
        try {
            // We need a profile endpoint, or just query the users table via a generic endpoint
            // Let's assume we use the server's /users/me or similar if exists,
            // or just use api.get('/users/' + userId) if allowed.
            // But wait, the server likely has RLS.
            // Let's try fetching from /users/{id}

            // NOTE: Ideally we should have a specific /profile endpoint. 
            // For now, let's try to fetch from a generic users endpoint or similar.
            // Checking existing server routes: users, projects, etc.
            // Let's assume we can fetch our own profile.

            // To make this robust, we might need to add `users.get('/:id')` to server if not there.
            // I will assume for now I can GET /users/:id or I need to add it.
            // For this moment, I'll define it as GET /users/me in the server or similar.
            // Actually, let's just make a dedicated call.

            // If the server doesn't have it, this will fail. I'll add it to the server in the next step if needed.
            // Checking: src/routes/users.ts was imported in index.ts.
            const { data } = await api.get<{ data: Profile }>('/users/me'); // We should implement /users/me
            if (data) {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    async function login(email: string, password: string) {
        const response = await api.post<{ data: { session: { access_token: string, user: User } } }>('/auth/signin', {
            email,
            password,
        });

        const { session } = response.data;
        api.setToken(session.access_token);
        setUser(session.user);
        await fetchProfile(session.user.id);
    }

    async function register(email: string, password: string, name: string) {
        const response = await api.post<{ data: { session: { access_token: string, user: User } | null, user: User | null } }>('/auth/signup', {
            email,
            password,
            full_name: name,
        });

        // Supabase sign up might not return a session immediately if email confirmation is on.
        // But if it does:
        if (response.data.session) {
            api.setToken(response.data.session.access_token);
            setUser(response.data.user);
            // Profile creation should be handled by DB trigger as per migration file, 
            // but we might want to fetch it.
        }
    }

    async function logout() {
        try {
            // Optional: Call server logout to revoke token if needed? Supabase tokens are JWTs.
            // Usually just clearing client side is enough for JWT unless we have blacklist.
            // We can just clear local state.
        } catch (e) {
            // ignore
        }
        api.removeToken();
        setUser(null);
        setProfile(null);
    }

    async function resetPassword(email: string) {
        // We need an endpoint for this
        // await api.post('/auth/recruit-password', { email });
        console.warn("Reset password not implemented on server yet");
        // Throw to let UI know
        throw new Error("Password reset not yet supported via new server");
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, login, register, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

