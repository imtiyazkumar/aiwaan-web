import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserAPI from "./userAPI";
import type { IProfile } from "../../types/user";

export const enum USER_Query_Key {
    USER = "user",
}

const useQueryGetUser = (userId: string | undefined) => {
    return useQuery({
        queryKey: [USER_Query_Key.USER, userId],
        queryFn: () => UserAPI.getProfile(userId!),
        enabled: !!userId,
    });
};

const useMutationUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (profile: Partial<IProfile> & { id: string }) => UserAPI.updateProfile(profile),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [USER_Query_Key.USER, data.id] });
            // Also invalidate general user query if needed
            queryClient.invalidateQueries({ queryKey: [USER_Query_Key.USER] });
        },
    });
};

export default {
    useQueryGetUser,
    useMutationUpdateUser,
};
