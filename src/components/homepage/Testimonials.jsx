import React from "react";
import { Quote, Star } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";

const TESTIMONIALS_DATA = [
    { name: "Riya Sharma", role: "Student, Kota", text: "Moving to Kota for studies was hard, but finding 'Ghar ka khana' wasn't. The weekly plan saved my life!" },
    { name: "Vikram Malhotra", role: "IT Professional", text: "I tried 3 different kitchens before settling on 'Maa Ki Rasoi'. The flexibility to pause is amazing." },
    { name: "Anjali Gupta", role: "Banker", text: "Healthy, less oil, and on time. Exactly what I needed for my office lunches. Highly recommended!" },
];

const Testimonials = () => (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.03),transparent_70%)] -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Same Heading Style as Pricing/Kitchens */}
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
                        Community
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-semibold tracking-tighter text-white">
                        Client
                        <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">
                            stories
                        </span>
                    </h2>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-white/10"></div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Voices of our satisfied family</p>
                        <div className="h-px w-12 bg-white/10"></div>
                    </div>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10">
                {TESTIMONIALS_DATA.map((t, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        <div className="group bg-white/[0.02] backdrop-blur-md p-10 rounded-[2.5rem] relative border border-white/5 hover:border-orange-500/30 transition-all duration-700">

                            {/* Quote Icon with Glow */}
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-500 fill-current" />

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-400 group-hover:text-gray-200 mb-8 relative z-10 font-medium leading-relaxed italic transition-colors duration-500">
                                "{t.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-orange-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${idx + 32}`}
                                        alt={t.name}
                                        className="relative w-12 h-12 rounded-full border border-white/10 object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm tracking-tight">{t.name}</h4>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;