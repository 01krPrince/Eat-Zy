import React, { useState, useEffect } from "react";
import { X, Gift, Sparkles, ArrowRight } from "lucide-react";

const LimitedOffer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-0 right-0 z-[100] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isVisible ? "translate-x-0 translate-y-0 opacity-100" : "translate-x-full translate-y-full opacity-0"
            }`}>

            {/* Main Arc Container */}
            <div className="group relative w-80 h-80 bg-white/95 backdrop-blur-xl shadow-[-20px_-20px_60px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white"
                style={{ borderRadius: '100% 0 0 0' }}>

                {/* Content Container (Pushed slightly up to make room for bottom button) */}
                <div className="absolute bottom-20 right-8 text-right flex flex-col items-end w-full px-6">

                    {/* Icon */}
                    <div className="bg-orange-600 p-4 rounded-full text-white shadow-lg mb-4 group-hover:animate-none animate-bounce transition-all">
                        <Gift size={24} />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-end gap-2">
                            <Sparkles size={12} className="text-orange-500" />
                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.25em]">Exclusive</span>
                        </div>

                        <h4 className="text-2xl font-black text-gray-900 leading-[0.9] mb-2 tracking-tighter uppercase">
                            Free Trial <br />
                            <span className="text-orange-600">Meal</span>
                        </h4>

                        <p className="text-[10px] text-gray-400 font-bold max-w-[160px] leading-tight uppercase tracking-wider">
                            First 50 members only. <br />
                            Limited slots available.
                        </p>
                    </div>

                    {/* Main CTA */}
                    <button className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 group/btn border-b-2 border-orange-500 pb-1">
                        Claim Now
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* --- FULL WIDTH CLOSE BUTTON AT BOTTOM --- */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute bottom-0 w-full bg-gray-100 group-hover:bg-gray-200 py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-orange-600 transition-all duration-300"
                >
                    <X size={12} strokeWidth={3} />
                    Dismiss Offer
                </button>

                {/* Decorative background element */}
                <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -z-10 group-hover:bg-orange-500/10 transition-colors"></div>
            </div>
        </div>
    );
};

export default LimitedOffer;