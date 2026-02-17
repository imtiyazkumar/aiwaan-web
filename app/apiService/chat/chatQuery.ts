import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ChatAPI from "./chatAPI";
import type { IChatThread } from "~/types/chat";

export enum CHAT_Query_Key {
    THREADS = 'CHAT_THREADS',
    MESSAGES = 'CHAT_MESSAGES'
}

const useQueryGetThreads = () => {
    return useQuery({
        queryKey: [CHAT_Query_Key.THREADS],
        queryFn: () => ChatAPI.getThreads(),
    });
};

const useQueryGetAdminThreads = () => {
    return useQuery({
        queryKey: [CHAT_Query_Key.THREADS, 'admin'],
        queryFn: () => ChatAPI.getAdminThreads(),
    });
};

const useQueryGetMessages = (threadId: string | undefined) => {
    return useQuery({
        queryKey: [CHAT_Query_Key.MESSAGES, threadId],
        queryFn: () => ChatAPI.getMessages(threadId!),
        enabled: !!threadId,
    });
};

const useMutationCreateThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (subject: string) => ChatAPI.createThread(subject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CHAT_Query_Key.THREADS] });
        },
    });
};

const useMutationSendMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ threadId, message }: { threadId: string, message: string }) => ChatAPI.sendMessage(threadId, message),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [CHAT_Query_Key.MESSAGES, variables.threadId] });
        },
    });
};

const ChatQuery = {
    useQueryGetThreads,
    useQueryGetAdminThreads,
    useQueryGetMessages,
    useMutationCreateThread,
    useMutationSendMessage
};

export default ChatQuery;
