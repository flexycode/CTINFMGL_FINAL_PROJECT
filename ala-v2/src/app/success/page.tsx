"use client";

import { motion } from "framer-motion";
import { CheckCircle, Plane, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 p-12 text-center space-y-8"
            >
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/30"
                    >
                        <CheckCircle className="w-12 h-12" />
                    </motion.div>

                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full -m-4"
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-slate-900">Booking Confirmed!</h1>
                    <p className="text-slate-500 font-medium">Your journey with Artificial Ledger Airlines is about to begin. Pack your bags!</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between text-left">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                        <p className="font-bold text-slate-900">#ALA-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    </div>
                    <Plane className="w-5 h-5 text-blue-500 rotate-45" />
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/dashboard" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                        View My Bookings
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/" className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-black hover:bg-slate-200 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">A confirmation email has been sent.</p>
            </motion.div>
        </div>
    );
}
