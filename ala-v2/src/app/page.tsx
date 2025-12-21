"use client";

import HeroVideo from "@/components/HeroVideo";
import { Search, MapPin, Calendar, Users, ShoppingCart, User, Plane, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 text-white bg-gradient-to-b from-black/50 to-transparent">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="w-8 h-8 rotate-45 text-blue-400" />
          <span className="text-2xl font-bold tracking-tighter">ALA</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/flights" className="hover:text-blue-400 transition-colors">Flights</Link>
          <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors font-bold uppercase text-[10px] tracking-widest hidden sm:block">
            Support
          </button>
          <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition-all border border-white/10">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/signin" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30">
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </nav>

      <HeroVideo />

      {/* Quick Search Section */}
      <section className="relative z-30 -mt-20 max-w-5xl mx-auto px-4">
        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Origin</label>
              <input
                type="text"
                placeholder="From where?"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Departure</label>
              <input
                type="date"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-blue-600 text-white p-4 h-[58px] rounded-2xl font-black hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                <Search className="w-5 h-5 stroke-[3px]" />
                Search
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Featured Destinations (Placeholder for now) */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Popular Destinations</h2>
            <p className="text-slate-500 text-lg">Explore the most booked flights this month</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20 text-white transform group-hover:translate-y-[-10px] transition-transform">
                <h3 className="text-2xl font-bold mb-1 italic">Adventure awaits...</h3>
                <p className="text-white/70">From $299.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
