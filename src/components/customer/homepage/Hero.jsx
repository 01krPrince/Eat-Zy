import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Play, CheckCircle2, ShieldCheck } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";
import LimitedOffer from "./LimitedOffer";
import ExploreButton from "../../../shared/ExploredButton";

const FOOD_IMAGES = [
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000"
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % FOOD_IMAGES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        /* The bg-neutral-bg now points to var(--neutral-bg) which changes in dark mode */
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-neutral-bg transition-colors duration-500">

            {/* Background Accent: Uses primary-light which turns darker/muted in dark mode */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-light -skew-x-12 translate-x-20 z-0 hidden lg:block opacity-30 dark:opacity-10 transition-opacity duration-500" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="lg:w-[55%]">
                        <RevealOnScroll direction="right">

                            {/* Trust Badge: Swaps surface colors automatically */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-surface shadow-sm border border-gray-100 dark:border-white/5 mb-8 transition-all">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <img
                                            key={i}
                                            className="w-7 h-7 rounded-full border-2 border-white dark:border-neutral-surface object-cover"
                                            src={`https://i.pravatar.cc/100?img=${i + 20}`}
                                            alt="user"
                                        />
                                    ))}
                                </div>
                                <p className="text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                                    Trusted by <span className="text-primary">10,000+</span> happy users
                                </p>
                            </div>

                            {/* Heading: text-neutral-text swaps from Slate to White */}
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-neutral-text leading-[1.1] tracking-tight mb-8 font-sans transition-colors duration-500">
                                Gourmet Meals, <br />
                                <span className="text-primary underline decoration-primary-light decoration-4 underline-offset-8">
                                    Home Delivered.
                                </span>
                            </h1>

                            <p className="text-lg text-neutral-muted max-w-xl mb-10 font-medium transition-colors duration-500">
                                Fresh, healthy, and chef-made tiffins delivered to you every day.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {['Chef-made Menus', 'No Delivery Fee', 'Easy Plans', 'Clean Packing'].map((text) => (
                                    <div key={text} className="flex items-center gap-2 text-neutral-text font-semibold text-sm transition-colors duration-500">
                                        <CheckCircle2 className="text-success" size={18} />
                                        {text}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-8">
                                <Link to="/explore">
                                    <ExploreButton text="See Today's Menu" />
                                </Link>
                                <button className="flex items-center gap-4 text-neutral-text font-bold text-sm uppercase group transition-colors duration-500">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center bg-neutral-surface shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Play size={16} fill="currentColor" />
                                    </div>
                                    Our Story
                                </button>
                            </div>

                            {/* Info Bar with border that adapts to theme */}
                            <div className="mt-12 flex items-center gap-10 border-t border-gray-200 dark:border-white/5 pt-8">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="text-success" size={24} />
                                    <span className="text-[10px] font-black uppercase text-neutral-muted">Safe <br /> Food</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-primary" size={24} />
                                    <span className="text-[10px] font-black uppercase text-neutral-muted">Fast <br /> Delivery</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Content: Auto-Sliding Image */}
                    <div className="lg:w-[45%] relative">
                        <RevealOnScroll direction="up" delay={300}>

                            {/* Floating Rating Card */}
                            <div className="absolute -left-12 top-10 bg-neutral-surface p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-gray-100 dark:border-white/5 transition-all">
                                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                                    <Star size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-neutral-muted uppercase leading-none mb-1">Top Rated</p>
                                    <p className="text-sm font-bold text-neutral-text">4.9/5 Rating</p>
                                </div>
                            </div>

                            {/* Main Image Container: Uses theme-based border color */}
                            <div className="relative rounded-max overflow-hidden shadow-2xl border-[12px] border-neutral-surface bg-neutral-surface aspect-[4/5] transition-all duration-500">
                                {FOOD_IMAGES.map((img, index) => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt="Fresh Food"
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            <LimitedOffer />
        </section>
    );
};

export default Hero;