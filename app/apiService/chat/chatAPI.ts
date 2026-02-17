import { api } from "~/lib/api";
import type { IChatThread, IChatMessage } from "~/types/chat";

const getThreads = async () => {
    const { data } = await api.get<{ data: IChatThread[] }>('/chat/threads');
    return { threads: data };
};

const getAdminThreads = async () => {
    const { data } = await api.get<{ data: IChatThread[] }>('/chat/admin/threads');
    return { threads: data };
};

const getMessages = async (threadId: string) => {
    const { data } = await api.get<{ data: IChatMessage[] }>(`/chat/threads/${threadId}/messages`);
    return { messages: data };
};

const createThread = async (subject: string) => {
    const { data } = await api.post<{ data: IChatThread }>('/chat/threads', { subject });
    return data;
};

const sendMessage = async (threadId: string, message: string) => {
    const { data } = await api.post<{ data: IChatMessage }>(`/chat/threads/${threadId}/messages`, { message });
    return data;
};

export default {
    getThreads,
    getAdminThreads,
    getMessages,
    createThread,
    sendMessage
};
