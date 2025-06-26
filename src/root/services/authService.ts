import { account } from '../../lib/appwrite';
import { ID } from 'appwrite';

export enum LocalStorage {
    AuthToken = "authToken",
    User = "user",
}

export interface User {
    $id: string;
    name: string;
    email: string;
}

export const createAccount = async (email: string, password: string, name: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        
        localStorage.setItem(LocalStorage.AuthToken, session.$id);
        localStorage.setItem(LocalStorage.User, JSON.stringify(user));
        
        return { session, user };
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await account.deleteSession('current');
        localStorage.removeItem(LocalStorage.AuthToken);
        localStorage.removeItem(LocalStorage.User);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        return null;
    }
};

export const sendPasswordResetEmail = async (email: string) => {
    try {
        return await account.createRecovery(
            email,
            `${window.location.origin}/auth/reset-password`
        );
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

export const getAuthToken = (): string => localStorage.getItem(LocalStorage.AuthToken) ?? "";

export const getStoredUser = (): User | null => {
    const userStr = localStorage.getItem(LocalStorage.User);
    return userStr ? JSON.parse(userStr) : null;
};

export const clearAuthToken = (): void => {
    localStorage.removeItem(LocalStorage.AuthToken);
    localStorage.removeItem(LocalStorage.User);
};