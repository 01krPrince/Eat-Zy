import React from "react";
import { Search, ShoppingBag, Clock, PackageCheck, ArrowRight } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

const STEPS = [
    {
        icon: <Search />,
        title: "Discover Flavors",
        desc: "Based on your area, explore a curated menu of local home-chefs.",
        tag: "Step 01",
        color: "text-primary" // Using your orange brand color
    },
    {
        icon: <ShoppingBag />,
        title: "Personalize Order",
        desc: "Select your favorite meals and customize your subscription plan.",
        tag: "Step 02",
        color: "text-blue-500" // Trust blue
    },
    {
        icon: <Clock />,
        title: "Schedule Timing",
        desc: "Choose your preferred delivery window for any meal.",
        tag: "Step 03",
        color: "text-orange-400" // Soft orange
    },
    {
        icon: <PackageCheck />,
        title: "Doorstep Delivery",
        desc: "Enjoy hot, authentic home-cooked meals delivered exactly on time.",
        tag: "Step 04",
        color: "text-success" // Emerald freshness
    },
];

const HowItWorks = () => (
    /* Use neutral-bg for the section background */
    <section id="about" className="py-32 bg-neutral-bg relative overflow-hidden">

        {/* Background Decorative Accents (Soft and Professional) */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-light/30 -skew-x-12 translate-x-20 z-0 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                        Our Process
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-text tracking-tighter mb-6">
                        Dining <span className="text-primary italic font-serif font-light">Simplified</span>
                    </h2>
                    <p className="text-neutral-muted max-w-lg mx-auto text-base font-medium leading-relaxed">
                        Experience a seamless journey from browsing to your first bite. We handle the complexity so you can enjoy the flavor.
                    </p>
                </div>
            </RevealOnScroll>

            {/* 4-Step Grid with Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                {/* Connecting Line (Desktop Only - Clean and Subtle) */}
                <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-px border-t border-dashed border-gray-200 -z-0"></div>

                {STEPS.map((step, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        {/* Card using neutral-surface */}
                        <div className="group relative flex flex-col items-center text-center bg-neutral-surface p-8 rounded-max shadow-soft border border-gray-100 hover:shadow-xl transition-all duration-500 z-10">

                            {/* Step Indicator */}
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-muted group-hover:text-primary transition-colors duration-300 mb-6">
                                {step.tag}
                            </span>

                            {/* Icon Container with subtle background matching the step color */}
                            <div className="relative w-20 h-20 mb-6 mx-auto">
                                <div className="absolute inset-0 bg-gray-50 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg">
                                    {React.cloneElement(step.icon, {
                                        size: 28,
                                        strokeWidth: 2,
                                        className: `${step.color} transition-transform duration-500`
                                    })}
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-lg font-bold text-neutral-text mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-neutral-muted text-xs leading-relaxed font-medium">
                                {step.desc}
                            </p>

                            {/* Mobile Indicators */}
                            {idx !== 3 && (
                                <div className="lg:hidden mt-6 text-primary opacity-20 rotate-90">
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