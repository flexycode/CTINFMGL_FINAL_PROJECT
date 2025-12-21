"use client";

import { useEffect, useState } from "react";
import { getCartItems, removeFromCart, createBooking, clearCart } from "@/lib/services";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plane, ArrowRight, ChevronLeft, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCart = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/signin?message=Please sign in to view your cart");
                return;
            }
            setUser(user);
            const cartData = await getCartItems(user.id);
            setItems(cartData);
            setLoading(false);
        };
        fetchCart();
    }, [router]);

    const handleRemove = async (id: number) => {
        const success = await removeFromCart(id);
        if (success) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleCheckout = async () => {
        if (!user || items.length === 0) return;

        setCheckoutLoading(true);
        try {
            // Create a booking for each item in the cart
            for (const item of items) {
                await createBooking(user.id, item.flight_id, item.seat_id);
            }

            // Clear the cart
            await clearCart(user.id);

            // Redirect to success
            router.push("/success");
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setCheckoutLoading(false);
        }
    };

    const totalPrice = items.reduce((sum, item) => sum + (Number(item.flight.base_price) + (item.seat ? Number(item.seat.price) : 0)), 0);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 p-6 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/flights" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                            Your Cart
                        </h1>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{items.length} Items</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 space-y-8">
                {items.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto opacity-50">
                            <ShoppingCart className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
                        <p className="text-slate-500 max-w-xs mx-auto">Looks like you haven't added any flights yet. Start exploring now!</p>
                        <Link href="/flights" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-black hover:bg-blue-700 transition-all uppercase text-xs tracking-widest">
                            Explore Flights
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors">
                                                <Plane className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors rotate-45" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.seat?.class || 'Economy'}</span>
                                                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seat {item.seat?.seat_number || '--'}</span>
                                                </div>
                                                <h3 className="font-black text-slate-900">{item.flight.departure_city} → {item.flight.arrival_city}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(item.flight.flight_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <p className="font-black text-blue-600 text-lg">₱{(Number(item.flight.base_price) + (item.seat ? Number(item.seat.price) : 0)).toLocaleString()}</p>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <aside className="space-y-6">
                            <div className="bg-slate-900 rounded-3xl text-white p-8 space-y-6">
                                <h3 className="font-black uppercase tracking-widest text-sm border-b border-white/10 pb-4">Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                        <span className="font-bold">₱{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Taxes & Fees (12%)</span>
                                        <span className="font-bold">₱{(totalPrice * 0.12).toLocaleString()}</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total</span>
                                        <span className="text-2xl font-black">₱{(totalPrice * 1.12).toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading}
                                    className="w-full bg-blue-600 disabled:bg-slate-700 text-white py-4 rounded-xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                                >
                                    {checkoutLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4" />
                                            Checkout Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}
