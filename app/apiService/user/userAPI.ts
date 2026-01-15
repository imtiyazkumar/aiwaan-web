import { api } from "~/lib/api";
import type { IProfile } from "../../types/user";

const getProfile = async (userId: string) => {
    // If userId matches current user we could use /users/me, generally /users/:id works if we added it.
    // We added /users/:id to server.
    const { data } = await api.get<{ data: IProfile }>(`/users/${userId}`);
    return data;
};

const updateProfile = async (profile: Partial<IProfile> & { id: string }) => {
    // We only implemented PUT /users/me. So we can only update OURSELF.
    // If the profile.id matches current user, we use /users/me endpoint logic on client side 
    // OR we should have added PUT /users/:id on server.
    // The server currently only has PUT /me.
    // Let's assume this is for self update.
    const { data } = await api.put<{ data: IProfile }>('/users/me', profile);
    return data;
};

export default {
    getProfile,
    updateProfile,
};
