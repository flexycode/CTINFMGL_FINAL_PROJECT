"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plane, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get("message");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen grid md:grid-cols-2">
            {/* Left Side: Branding & Info */}
            <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/philippineTrip.mp4" type="video/mp4" />
                </video>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Plane className="w-8 h-8 rotate-45 text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-bold tracking-tighter">ALA</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6 text-right">
                    <h2 className="text-5xl font-bold leading-tight">
                        Welcome Back <br /> Voyager.
                    </h2>
                    <p className="text-xl text-slate-300 ml-auto max-w-md">
                        Sign in to manage your bookings and explore new destinations across the globe.
                    </p>
                </div>

                <div className="relative z-10 flex gap-8 py-4 border-t border-white/10 ml-auto">
                    <p className="text-sm text-slate-400 italic font-medium">
                        "The world is a book and those who do not travel read only one page."
                    </p>
                </div>
            </div>

            {/* Right Side: Sign In Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
                        <p className="text-slate-500 underline decoration-blue-500/30">Welcome back! Please enter your details</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        {message && (
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                                <Link href="#" className="text-xs text-blue-600 font-bold hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-blue-600 font-bold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
