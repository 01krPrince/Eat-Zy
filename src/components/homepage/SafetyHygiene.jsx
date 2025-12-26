import React from "react";
import { ShieldCheck, CheckCircle2, Award, Zap } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";
import kitchenHygiene from "../../assets/img/woman-holding-rag-detergent-cleaning-cooker.jpg"


const SAFETY_FEATURES = [
    "Daily Temperature Checks for Chefs",
    "Mandatory Hair Nets & Gloves",
    "Sanitized Kitchen Surfaces",
    "Contactless Delivery Options",
];

const SafetyHygiene = () => {
    return (
        <section id="safety" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] -z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left Side: Visual Glassmorphic Image */}
                    <div className="lg:w-1/2 w-full">
                        <RevealOnScroll direction="left">
                            <div className="relative group">
                                <div className="absolute -inset-4 border border-white/5 rounded-[2.5rem] -z-10 group-hover:border-orange-500/20 transition-all duration-700"></div>

                                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                                    <img
                                        src={kitchenHygiene}
                                        alt="Safety Standards"
                                        className="w-full object-cover h-[500px] opacity-70 group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                </div>

                                {/* Floating Verification Badge (The "Cool" part from the new design) */}
                                <div className="absolute -bottom-6 -right-6 lg:right-10 bg-white/5 backdrop-blur-2xl p-5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
                                    <div className="bg-orange-600 p-3 rounded-xl">
                                        <ShieldCheck className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-1">100% Verified</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">FSSAI Registered</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Side: Original List Design (Clean & Direct) */}
                    <div className="lg:w-1/2 w-full">
                        <RevealOnScroll direction="right">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                <Zap size={12} className="fill-current" /> Safety Protocol
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-tight mb-8">
                                Hygiene isn't a feature, <br />
                                <span className="font-serif italic font-light text-orange-50">it's our heritage.</span>
                            </h2>

                            <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
                                We curate with clinical precision. Every kitchen partner undergoes a
                                <span className="text-white"> rigorous 25-point quality audit</span> before listing.
                            </p>

                            {/* BACK TO ORIGINAL LIST STYLE (Clean & Professional) */}
                            <ul className="space-y-6">
                                {SAFETY_FEATURES.map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                                            <CheckCircle2 className="text-orange-500 group-hover:text-white w-4 h-4 transition-colors" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Trust Badge Row */}
                            <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
                                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                    <Award className="text-gray-400" size={18} />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Certified Safe</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                                    <ShieldCheck className="text-gray-400" size={18} />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure Logistics</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SafetyHygiene;