const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

function getHeaders() {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = response.statusText;
        try {
            const errorData = await response.json() as any;
            errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {

        }
        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
        const url = new URL(`${API_URL}${endpoint}`);
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, String(params[key]));
                }
            });
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    },

    put: async <T>(endpoint: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },

    setToken: (token: string) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('access_token', token);
        }
    },

    removeToken: () => {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('access_token');
        }
    },

    getToken: () => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    }
};
