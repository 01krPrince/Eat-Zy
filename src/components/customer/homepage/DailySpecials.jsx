import React, { useState, useEffect } from "react";
import { Star, ChevronRight, Utensils, Coffee, Moon } from "lucide-react";

const CATEGORIES = [
    {
        id: "breakfast",
        label: "Breakfast Specials",
        icon: <Coffee size={14} />,
        items: [
            { url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600", title: "Masala Dosa", chef: "South Heritage" },
            { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", title: "Aloo Paratha", chef: "Punjab Rasoi" }
        ]
    },
    {
        id: "lunch",
        label: "Lunch Specials",
        icon: <Utensils size={14} />,
        items: [
            { url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600", title: "Executive Thali", chef: "Chef Amrita" },
            { url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600", title: "Silk Paneer", chef: "Maa's Kitchen" }
        ]
    },
    {
        id: "dinner",
        label: "Dinner Specials",
        icon: <Moon size={14} />,
        items: [
            { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600", title: "Grain Bowl", chef: "Green Bowl" },
            { url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600", title: "Dal Makhani", chef: "Heritage Kitchen" }
        ]
    }
];

const SidebarCard = ({ category, delay }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Entrance animation trigger
        const timer = setTimeout(() => setIsVisible(true), 100);

        if (isPaused) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % category.items.length);
        }, 4000 + delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [category.items.length, delay, isPaused]);

    const current = category.items[index];

    return (
        <div
            className={`relative group w-full lg:w-[350px] transition-all duration-1000 ease-out transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Card Body */}
            <div className="relative flex items-center bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] overflow-hidden h-32 hover:border-white/20 transition-all hover:bg-white/[0.05] shadow-2xl group/card">

                {/* Left: Image with Zoom-Fade effect */}
                <div className="relative w-32 h-full overflow-hidden flex-shrink-0">
                    {category.items.map((item, i) => (
                        <img
                            key={i}
                            src={item.url}
                            alt={item.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${index === i ? "opacity-100 scale-100" : "opacity-0 scale-125"
                                }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80"></div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center px-6 w-full overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500 opacity-80 animate-pulse">{category.icon}</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500">{category.label}</span>
                    </div>

                    <h4 className="text-white text-sm lg:text-base font-bold truncate leading-tight tracking-tight group-hover/card:text-orange-400 transition-colors">
                        {current.title}
                    </h4>
                    <p className="text-gray-400 text-[10px] font-medium truncate mt-1">Curated by {current.chef}</p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                            <Star size={12} className="text-orange-600 fill-orange-600" />
                            <span className="text-xs text-white/90 font-bold tracking-tighter">4.9</span>
                        </div>
                        <button className="flex items-center gap-1 text-white/20 group-hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
                            Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DailySpecialsSidebar = () => {
    return (
        <div className="flex flex-col gap-6 items-end py-4 perspective-1000">
            {CATEGORIES.map((cat, idx) => (
                <SidebarCard key={cat.id} category={cat} delay={idx * 150} />
            ))}
        </div>
    );
};

export default DailySpecialsSidebar;