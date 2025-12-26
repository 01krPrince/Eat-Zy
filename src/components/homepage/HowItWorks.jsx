import React from "react";
import { Search, ShoppingBag, Clock, PackageCheck, ArrowRight } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";

const STEPS = [
    {
        icon: <Search />,
        title: "Discover Flavors",
        desc: "Based on your area, explore a curated menu of local home-chefs.",
        tag: "Step 01"
    },
    {
        icon: <ShoppingBag />,
        title: "Personalize Order",
        desc: "Select your favorite meals and customize your subscription plan.",
        tag: "Step 02"
    },
    {
        icon: <Clock />,
        title: "Schedule Timing",
        desc: "Choose your preferred delivery window for breakfast, lunch, or dinner.",
        tag: "Step 03"
    },
    {
        icon: <PackageCheck />,
        title: "Doorstep Delivery",
        desc: "Enjoy hot, authentic home-cooked meals delivered exactly on time.",
        tag: "Step 04"
    },
];

const HowItWorks = () => (
    <section id="about" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
                        The Experience
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-6">
                        Dining <span className="font-serif italic font-light text-orange-50">Simplified</span>
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">
                        No manual searches. Set your pincode in the header and let our kitchens come to you.
                    </p>
                </div>
            </RevealOnScroll>

            {/* 4-Step Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                {/* Connecting Gradient Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-24 left-10 right-10 h-[1px] bg-gradient-to-r from-orange-600/0 via-white/10 to-orange-600/0 -z-10"></div>

                {STEPS.map((step, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        <div className="group relative flex flex-col items-center text-center">

                            {/* Step Indicator */}
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-orange-500 transition-colors duration-500 mb-6">
                                {step.tag}
                            </span>

                            {/* Icon Container */}
                            <div className="relative w-28 h-28 mb-8">
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-600/5 transition-all duration-500 flex items-center justify-center text-white shadow-2xl group-hover:-translate-y-2">
                                    {React.cloneElement(step.icon, {
                                        size: 28,
                                        strokeWidth: 1.5,
                                        className: "group-hover:text-orange-500 transition-colors duration-500"
                                    })}
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] font-medium">
                                {step.desc}
                            </p>

                            {/* Mobile Arrow indicators */}
                            {idx !== 3 && (
                                <div className="lg:hidden mt-8 text-white/5 rotate-90 lg:rotate-0">
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;