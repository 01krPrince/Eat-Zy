import React from "react";
import { ChefHat, Utensils, MapPin, Star } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

const STATS_DATA = [
    { num: "500+", label: "Verified Kitchens", icon: <ChefHat className="w-6 h-6 mb-2 mx-auto opacity-80" /> },
    { num: "1.2M+", label: "Meals Served", icon: <Utensils className="w-6 h-6 mb-2 mx-auto opacity-80" /> },
    { num: "15+", label: "Cities Active", icon: <MapPin className="w-6 h-6 mb-2 mx-auto opacity-80" /> },
    { num: "4.8/5", label: "User Rating", icon: <Star className="w-6 h-6 mb-2 mx-auto opacity-80" /> },
];

const Stats = () => (
    <section className="bg-orange-500 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-orange-400/50">
                {STATS_DATA.map((stat, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 100} direction="up">
                        <div className="flex flex-col items-center">
                            {stat.icon}
                            <h3 className="text-3xl md:text-4xl font-extrabold">{stat.num}</h3>
                            <p className="text-orange-100 text-sm uppercase tracking-wider font-semibold mt-1">
                                {stat.label}
                            </p>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Stats;