import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { useFetcher } from 'react-router';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import { useAuth } from '~/contexts/AuthContext';
import type { IChatMessage } from '~/types/chat';

export default function ChatWidget() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fetcher = useFetcher();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg: IChatMessage = {
            id: Date.now().toString(),
            thread_id: threadId || '',
            sender_id: 'user',
            message: input,
            is_admin: false,
            created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const { api } = await import('~/lib/api');

            const response = await api.post<any>('/chat/message', {
                message: userMsg.message,
                thread_id: threadId
            });

            if (response.success) {
                if (!threadId) setThreadId(response.thread_id);

                const aiMsg: IChatMessage = {
                    id: Date.now().toString(),
                    thread_id: response.thread_id,
                    sender_id: 'ai',
                    message: response.message,
                    is_admin: true,
                    created_at: new Date().toISOString()
                };
                setMessages(prev => [...prev, aiMsg]);
            }
        } catch (error: any) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                thread_id: threadId || '',
                sender_id: 'system',
                message: "Error: " + error.message,
                is_admin: true,
                created_at: new Date().toISOString()
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary-base text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:scale-110 active:scale-95 animate-bounce-subtle"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <Div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl w-80 sm:w-96 flex flex-col h-125 overflow-hidden animate-slide-up-fade">
                    <Flex className="bg-primary-base/90 p-4 justify-between items-center text-white backdrop-blur-sm">
                        <Flex className="gap-3 items-center">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot size={20} />
                            </div>
                            <FlexColumn>
                                <h3 className="font-bold text-sm">Aiwaan Assistant</h3>
                                <span className="text-xs text-white/70">Always here to help</span>
                            </FlexColumn>
                        </Flex>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <X size={20} />
                        </button>
                    </Flex>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"  >
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 text-sm mt-10">
                                <p>👋 Hi there! asking me anything about architecture or our projects.</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-2 ${!msg.is_admin ? 'justify-end' : 'justify-start'}`}  >
                                {msg.is_admin && (
                                    <div className="w-8 h-8 rounded-full bg-primary-base/10 flex items-center justify-center shrink-0">
                                        <Bot size={14} className="text-primary-base" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[80%] p-3 text-sm rounded-2xl ${!msg.is_admin
                                        ? 'bg-primary-base text-white rounded-br-none'
                                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.message}
                                </div>

                                {!msg.is_admin && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                        <User size={14} className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary-base/10 flex items-center justify-center shrink-0">
                                    <Bot size={14} className="text-primary-base" />
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center">
                                    <Loader2 size={16} className="animate-spin text-primary-base" />
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 focus:border-primary-base transition-all"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-base text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </Div>
            )}
        </div>
    );
}
