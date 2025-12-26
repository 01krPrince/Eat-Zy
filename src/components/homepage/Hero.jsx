import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Play, ShieldCheck } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";
import LimitedOffer from "./LimitedOffer";
import DailySpecials from "./DailySpecials";
import ExploreButton from "../../shared/ExploredButton";

const Hero = () => {
    return (
        <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-[#0a0a0a]">
            {/* Background Layer - Increased opacity slightly for depth */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
                    alt="Premium Culinary"
                    className="w-full h-full object-cover scale-105 opacity-30"
                />
                {/* Smoother Gradients to prevent the "Split" look */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>

            <LimitedOffer />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* CHANGED: justify-start and lg:gap-20 instead of justify-between */}
                <div className="flex flex-col lg:flex-row items-center justify-start lg:gap-20">

                    {/* Left Content - Optimized width */}
                    <div className="lg:w-[55%] xl:w-3/5">
                        <RevealOnScroll direction="right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
                                <span className="text-gray-300 text-xs font-medium tracking-wide">
                                    <span className="text-orange-500 font-bold">4.9/5</span> Trusted by 10k+ locals
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-8">
                                <span className="block text-[12px] lg:text-[14px] font-black text-orange-500 mb-4 uppercase tracking-[0.5em]">
                                    The Art of Home Cooking
                                </span>

                                <span className="block font-semibold tracking-tighter">
                                    Authentic
                                    <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">
                                        home flavors
                                    </span>
                                </span>
                            </h1>

                            <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed font-light">
                                Experience the soul of home-cooked meals. Curated by master home chefs, delivered with uncompromising precision to your doorstep.
                            </p>

                            <div className="flex flex-wrap items-center gap-8">
                                <Link to="/explore">
                                    <ExploreButton text="Explore Kitchens" />
                                </Link>
                                <button className="flex items-center gap-4 text-white font-bold text-sm uppercase tracking-widest group">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-orange-500 transition-all duration-500">
                                        <Play size={16} fill="white" />
                                    </div>
                                    <span className="group-hover:text-orange-500 transition-colors">Our Story</span>
                                </button>
                            </div>

                            {/* Trust Badges - Tightened spacing */}
                            <div className="mt-12 flex items-center gap-6 border-t border-white/5 pt-8">
                                <div className="flex items-center gap-3">
                                    <div className="text-orange-500">
                                        <ShieldCheck size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">FSSAI Certified</span>
                                        <span className="text-gray-500 text-[9px] font-medium tracking-tight">Safety Audited</span>
                                    </div>
                                </div>

                                <div className="w-px h-6 bg-white/10"></div>

                                <div className="flex items-center gap-3">
                                    <div className="text-orange-500">
                                        <Star size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">Chef Verified</span>
                                        <span className="text-gray-500 text-[9px] font-medium tracking-tight">Quality Tested</span>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column - Now brought closer and slightly offset for a more organic feel */}
                    <div className="lg:w-[35%] xl:w-2/5 hidden lg:block relative">
                        <RevealOnScroll direction="up" delay={300}>
                            {/* Subtle Glow behind Daily Specials to bridge the gap */}
                            <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[80px] -z-10"></div>
                            <DailySpecials />
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;