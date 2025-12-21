"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plane, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign up user via Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create profile in the 'profiles' table
                const { error: profileError } = await supabase
                    .from("profiles")
                    .insert([
                        {
                            id: authData.user.id,
                            username,
                            email,
                            phone_number: phone,
                            role: "user",
                        },
                    ]);

                if (profileError) throw profileError;

                router.push("/signin?message=Check your email to confirm registration");
            }
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

                <div className="relative z-10 space-y-6">
                    <h2 className="text-5xl font-bold leading-tight">
                        Start Your Journey <br /> With Us Today.
                    </h2>
                    <p className="text-xl text-slate-300 max-w-md">
                        Join thousands of travelers who book their adventures with Artificial Ledger Airlines.
                    </p>
                </div>

                <div className="relative z-10 flex gap-8 py-4 border-t border-white/10">
                    <div>
                        <p className="text-2xl font-bold">50k+</p>
                        <p className="text-sm text-slate-400">Happy Travelers</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">120+</p>
                        <p className="text-sm text-slate-400">Destinations</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                        <p className="text-slate-500 underline decoration-blue-500/30">Enter your details to register</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="johndoe"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+63 912..."
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

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
                            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
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
                            {loading ? "Creating Account..." : "Create Account"}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-600 font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
