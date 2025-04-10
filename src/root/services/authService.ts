/**
 * Project Ouma Health
 *
 * @author      Moin Khan
 * @copyright   Teleperinatal, Inc.
 *
 * Built by Eonyx Infotech LLP.
 * @link https://eonyx.io
 *
 */

import axios from "axios";

export enum LocalStorage {
    AuthToken = "authToken",
}

export const initAuthToken = (token: string): void => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setAuthToken = (token: string): void => {
    localStorage.setItem(LocalStorage.AuthToken, token);
    initAuthToken(token);

    if (!token) clearAuthToken();
};

export const getAuthToken = (): string => localStorage.getItem(LocalStorage.AuthToken) ?? "";

export const clearAuthToken = (): void => localStorage.removeItem(LocalStorage.AuthToken);
