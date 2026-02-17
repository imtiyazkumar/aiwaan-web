import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '~/lib/api';

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
            const { data } = await api.get<{ data: Profile }>('/users/me');
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

        if (response.data.session) {
            api.setToken(response.data.session.access_token);
            setUser(response.data.user);
        }
    }

    async function logout() {
        try {

        } catch (e) {

        }
        api.removeToken();
        setUser(null);
        setProfile(null);
    }

    async function resetPassword(email: string) {
        console.warn("Reset password not implemented on server yet");
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

