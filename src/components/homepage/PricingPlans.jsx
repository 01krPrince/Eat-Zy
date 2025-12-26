import React from "react";
import { CheckCircle2, Zap, Crown, Star } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";

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
        {/* Background Decorative Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.05),transparent_70%)] -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Centered Dual-Font Heading */}
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
                        Subscription
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter text-white">
                        Curated
                        <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">
                            meal plans
                        </span>
                    </h2>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-white/10"></div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Flexible terms. Pause anytime.</p>
                        <div className="h-px w-12 bg-white/10"></div>
                    </div>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                {plans.map((plan, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        <div className={`relative p-10 rounded-[2.5rem] transition-all duration-500 group border ${plan.recommended
                                ? "bg-[#111] border-orange-500/50 shadow-[0_20px_50px_rgba(234,88,12,0.15)] scale-105 z-20"
                                : "bg-white/[0.03] border-white/5 hover:border-white/20 z-10"
                            }`}>

                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl shadow-orange-600/20">
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

                            <ul className="space-y-5 mb-12">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600 mr-4 shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${plan.recommended
                                    ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-700 hover:shadow-[0_10px_30px_rgba(234,88,12,0.3)]"
                                    : "bg-white/5 text-white border-white/10 hover:bg-white hover:text-black hover:border-white"
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