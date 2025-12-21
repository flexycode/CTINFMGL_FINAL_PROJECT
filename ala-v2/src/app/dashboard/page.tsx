"use client";

import { useEffect, useState } from "react";
import { getBookings } from "@/lib/services";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { LayoutDashboard, Plane, Calendar, CreditCard, ChevronRight, User, Settings, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserAndBookings = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/signin?message=Please sign in to view your dashboard");
                return;
            }
            setUser(user);
            const bookingData = await getBookings(user.id);
            setBookings(bookingData);
            setLoading(false);
        };
        fetchUserAndBookings();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col hidden lg:flex">
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-2 bg-blue-600 rounded-xl">
                        <Plane className="w-5 h-5 text-white rotate-45" />
                    </div>
                    <span className="font-black text-slate-900 tracking-tighter">ALA DASHBOARD</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm">
                        <LayoutDashboard className="w-4 h-4" />
                        Overview
                    </Link>
                    <Link href="/flights" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
                        <Plane className="w-4 h-4" />
                        Book Flights
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
                        <User className="w-4 h-4" />
                        My Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                </nav>

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-colors mt-auto"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 leading-none mb-2">Welcome back!</h1>
                        <p className="text-slate-500 font-medium">Here's what's happening with your travels.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="pr-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                            <p className="text-sm font-bold text-slate-900">{user?.email}</p>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-500" },
                        { label: "Active Flights", value: bookings.filter(b => b.status === "CONFIRMED").length, icon: Plane, color: "bg-emerald-500" },
                        { label: "Rewards Points", value: "1,250", icon: CreditCard, color: "bg-orange-500" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-6">
                            <div className={`p-4 ${stat.color} text-white rounded-2xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Recent Bookings */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest text-sm">Recent Bookings</h2>
                        <Link href="/flights" className="text-blue-600 font-bold text-sm hover:underline">Book New Flight</Link>
                    </div>

                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                    <Plane className="w-8 h-8" />
                                </div>
                                <p className="text-slate-500 font-bold">No bookings found. Time to plan your next adventure!</p>
                                <Link href="/flights" className="inline-flex bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
                                    Browse Flights
                                </Link>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all border-l-4 border-l-blue-600"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                                            <Plane className="w-8 h-8 rotate-45" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{booking.seat.class}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seat {booking.seat.seat_number}</span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 leading-tight">
                                                {booking.flight.departure_city} → {booking.flight.arrival_city}
                                            </h3>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(booking.flight.flight_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-4 md:pt-0">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group">
                                            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
