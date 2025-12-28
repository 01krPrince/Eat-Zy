import React from "react";
import { Quote, Star } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

const TESTIMONIALS_DATA = [
    { name: "Riya Sharma", role: "Student, Kota", text: "Moving to Kota for studies was hard, but finding 'Ghar ka khana' wasn't. The weekly plan saved my life!" },
    { name: "Vikram Malhotra", role: "IT Professional", text: "I tried 3 different kitchens before settling on 'Maa Ki Rasoi'. The flexibility to pause is amazing." },
    { name: "Anjali Gupta", role: "Banker", text: "Healthy, less oil, and on time. Exactly what I needed for my office lunches. Highly recommended!" },
];

const Testimonials = () => (
    /* Use neutral-bg for a bright, professional feel */
    <section className="py-32 bg-neutral-bg relative overflow-hidden">

        {/* Soft Background Accents */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-primary-light/20 -skew-x-12 -translate-x-20 z-0 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RevealOnScroll direction="down">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                        Community
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-text tracking-tighter">
                        Client <span className="text-primary italic font-serif font-light">Stories</span>
                    </h2>
                    <p className="mt-4 text-neutral-muted text-sm font-medium">Voices of our satisfied family</p>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS_DATA.map((t, idx) => (
                    <RevealOnScroll key={idx} delay={idx * 150} direction="up">
                        {/* Card: White surface with modern shadow and radius */}
                        <div className="group bg-neutral-surface p-10 rounded-max relative border border-gray-100 shadow-soft hover:shadow-xl transition-all duration-500 h-full flex flex-col">

                            {/* Quote Icon - subtle brand integration */}
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 fill-current" />

                            {/* Trust Rating */}
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>

                            {/* Testimonial Text - using neutral-text for readability */}
                            <p className="text-neutral-text font-medium leading-relaxed italic mb-8 flex-grow">
                                "{t.text}"
                            </p>

                            {/* User Info Branding */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                <div className="relative">
                                    {/* Subtle glow on hover */}
                                    <div className="absolute -inset-1 bg-primary rounded-full blur opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${idx + 32}`}
                                        alt={t.name}
                                        className="relative w-12 h-12 rounded-full border border-gray-100 object-cover shadow-sm"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-text text-sm tracking-tight">{t.name}</h4>
                                    <p className="text-[10px] font-black text-neutral-muted uppercase tracking-widest mt-1">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>

            {/* Bottom Proof Bar */}
            <div className="mt-20 flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase italic">Online<span className="text-primary">.Safety</span></div>
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase italic text-primary">Certified<span className="text-neutral-text">.Fresh</span></div>
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase italic">Quality<span className="text-primary">.Tested</span></div>
            </div>
        </div>
    </section>
);

export default Testimonials;