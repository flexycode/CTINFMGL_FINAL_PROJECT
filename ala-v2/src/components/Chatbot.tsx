"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm your ALA Travel Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
        } catch (error: any) {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. " + error.message }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-widest">ALA Assistant</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powered by AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
                        >
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                                            }`}>
                                            {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm font-medium ${m.role === "user"
                                                ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/20"
                                                : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 items-center text-slate-400">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-slate-600" />
                                        </div>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-xl transition-all"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${isOpen ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
}
