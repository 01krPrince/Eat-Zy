import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

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
    /* Use neutral-bg for a bright, fresh look */
    <section className="py-24 bg-neutral-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- CLEAN PROFESSIONAL HEADING --- */}
            <RevealOnScroll direction="down">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">
                        Chef's Selection
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-text tracking-tighter">
                        Trending <span className="text-primary italic font-serif font-light">Kitchens</span>
                    </h2>
                    <p className="mt-4 text-neutral-muted text-sm font-medium">Discover the highest-rated local chefs serving your neighborhood</p>
                </div>
            </RevealOnScroll>

            {/* Professional Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {kitchens.map((kitchen, idx) => (
                    <RevealOnScroll key={kitchen.id} delay={idx * 100} direction="up">
                        {/* Card: White surface with modern radius and soft shadow */}
                        <div className="group bg-neutral-surface rounded-max overflow-hidden border border-gray-100 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-500">

                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={kitchen.img}
                                    alt={kitchen.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Badges Overlay */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1.5 shadow-sm text-neutral-text">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        {kitchen.rating}
                                    </div>
                                    {kitchen.certified && (
                                        <div className="bg-success px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase flex items-center gap-1.5 shadow-md">
                                            <ShieldCheck size={12} /> Certified
                                        </div>
                                    )}
                                </div>

                                {/* Save Button */}
                                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-colors">
                                    <Heart size={16} className="text-neutral-muted hover:text-red-500 hover:fill-red-500 transition-all" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-base font-bold text-neutral-text truncate pr-2 tracking-tight">
                                        {kitchen.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-neutral-muted">
                                        <Clock size={12} />
                                        <span className="text-[10px] font-bold">{kitchen.time}</span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-neutral-muted font-semibold uppercase tracking-widest mb-6">
                                    {kitchen.type}
                                </p>

                                {/* Action Button: Using Primary Brand Color */}
                                <button className="w-full py-3 bg-gray-50 hover:bg-primary text-neutral-text hover:text-white text-[11px] font-black uppercase tracking-[0.1em] rounded-xl transition-all duration-300 border border-gray-100 hover:border-primary shadow-sm">
                                    View Full Menu
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>

            {/* Bottom Footer Call to Action */}
            <div className="mt-20 text-center">
                <Link to="/explore" className="inline-flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 rounded-full text-[11px] font-black uppercase tracking-widest text-neutral-text hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-sm">
                    Discover More Kitchens
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </div>
    </section>
);

export default TrendingKitchens;