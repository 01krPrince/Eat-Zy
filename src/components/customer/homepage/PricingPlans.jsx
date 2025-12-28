import React from "react";
import { CheckCircle2, Zap, Crown, Star } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

const plans = [
    {
        name: "The Trial",
        type: "Daily",
        price: "₹120",
        per: "/meal",
        features: ["Ideal for Eat-Zy", "Standard Packaging", "Any Kitchen Access"],
        recommended: false,
        icon: <Star size={20} className="text-gray-400" />
    },
    {
        name: "Weekly Lite",
        type: "Weekly",
        price: "₹110",
        per: "/meal",
        features: ["5% Discount applied", "Fixed Menu Rotation", "Free Cancellation"],
        recommended: true,
        icon: <Zap size={20} className="text-orange-500" />
    },
    {
        name: "Pro Monthly",
        type: "Monthly",
        price: "₹99",
        per: "/meal",
        features: ["Best Value (15% off)", "Customizable Menu", "Priority Delivery"],
        recommended: false,
        icon: <Crown size={20} className="text-gray-400" />
    },
];

const PricingPlans = () => (
    <section id="subscriptions" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
                        Subscription
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter text-white">
                        Curated <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">meal plans</span>
                    </h2>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                {plans.map((plan, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        <div className={`relative h-full p-10 rounded-[2.5rem] transition-all duration-700 group border ${plan.recommended
                                ? "bg-[#111] border-orange-500 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] scale-105 z-20"
                                : "bg-white/[0.03] border-white/5 z-10"
                            }`}>

                            {/* Clean Recommended Tag */}
                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-5 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-2">{plan.type}</h3>
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h4>
                                </div>
                                <div className={`p-3 rounded-2xl ${plan.recommended ? "bg-orange-600/10" : "bg-white/5"}`}>
                                    {plan.icon}
                                </div>
                            </div>

                            <div className="flex items-baseline mb-10">
                                <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                <span className="text-gray-500 text-sm font-bold ml-2 uppercase tracking-widest">{plan.per}</span>
                            </div>

                            <div className="h-px w-full bg-white/5 mb-8"></div>

                            <ul className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600 mr-4 shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${plan.recommended
                                    ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-700"
                                    : "bg-white/5 text-white border-white/10 hover:bg-white hover:text-black"
                                }`}>
                                Select {plan.type}
                            </button>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default PricingPlans;