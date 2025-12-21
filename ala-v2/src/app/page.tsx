import HeroVideo from "@/components/HeroVideo";
import { Plane, Search, User, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 text-white bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-2">
          <Plane className="w-8 h-8 rotate-45 text-blue-400" />
          <span className="text-2xl font-bold tracking-tighter">ALA</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#" className="hover:text-blue-400 transition-colors">Flights</a>
          <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all">
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </div>
      </nav>

      <HeroVideo />

      {/* Quick Search Section */}
      <section className="relative z-30 -mt-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">From</label>
              <input type="text" placeholder="Origin City" className="w-full p-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">To</label>
              <input type="text" placeholder="Destination City" className="w-full p-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">Date</label>
              <input type="date" className="w-full p-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Find Flights
              </button>
            </div>
          </div>
        </div>
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
