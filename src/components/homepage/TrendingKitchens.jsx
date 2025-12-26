import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";

const kitchens = [
    { id: 1, name: "Annapurna Kitchen", rating: 4.8, type: "North Indian", time: "30 min", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", certified: true },
    { id: 2, name: "Spice Route", rating: 4.6, type: "South Indian", time: "25 min", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800", certified: true },
    { id: 3, name: "Green Bowl", rating: 4.9, type: "Healthy Keto", time: "20 min", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", certified: false },
    { id: 4, name: "Mom's Magic", rating: 4.7, type: "Home Style", time: "40 min", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", certified: true },
    { id: 5, name: "The Curry Co.", rating: 4.5, type: "Punjabi Special", time: "35 min", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", certified: true },
    { id: 6, name: "Royal Tiffin", rating: 4.8, type: "Mughlai", time: "45 min", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800", certified: true },
    { id: 7, name: "Fit Bites", rating: 4.9, type: "Salad Bar", time: "15 min", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800", certified: false },
    { id: 8, name: "Village Plate", rating: 4.6, type: "Bengali Cuisine", time: "30 min", img: "https://images.unsplash.com/photo-1567306301498-519dde9bf48b?auto=format&fit=crop&q=80&w=800", certified: true },
];

const TrendingKitchens = () => (
    <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- CENTERED DUAL-FONT HEADING --- */}
            <RevealOnScroll direction="down">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
                        Chef's Selection
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter text-white">
                        Trending
                        <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">
                            kitchens
                        </span>
                    </h2>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-white/10"></div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Top-rated providers in your area</p>
                        <div className="h-px w-12 bg-white/10"></div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Compact 4x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kitchens.map((kitchen, idx) => (
                    <RevealOnScroll key={kitchen.id} delay={idx * 100} direction="up">
                        <div className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-500">

                            {/* Short Image Container */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={kitchen.img}
                                    alt={kitchen.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 border border-white/10">
                                        <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                                        {kitchen.rating}
                                    </div>
                                    {kitchen.certified && (
                                        <div className="bg-orange-600 px-2 py-1 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 shadow-lg">
                                            <ShieldCheck size={10} />
                                        </div>
                                    )}
                                </div>
                                <button className="absolute top-3 right-3 p-1.5 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Heart size={14} className="text-white hover:fill-red-500 transition-colors" />
                                </button>
                            </div>

                            {/* Condensed Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-black uppercase tracking-tight truncate pr-2">{kitchen.name}</h3>
                                    <span className="text-[10px] font-bold text-orange-500">{kitchen.time}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                                    {kitchen.type}
                                </p>

                                <button className="w-full py-2.5 bg-white/5 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 border border-white/5 hover:border-orange-600">
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-16 text-center">
                <Link to="/explore" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-orange-500 transition-colors group">
                    View all kitchens <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </section>
);

export default TrendingKitchens;