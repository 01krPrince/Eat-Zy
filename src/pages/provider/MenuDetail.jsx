import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, Star, Calendar, ShieldCheck } from "lucide-react";

const MenuDetails = () => {
    const { id } = useParams();

    // Static data matching your model for the demo
    const menu = {
        id: id,
        name: "Premium Veg Lunch",
        mealType: "LUNCH",
        foodType: "VEG",
        pricePerDay: 120,
        monthlyPrice: 3200,
        deliveryTimeSlot: "12:30 PM - 1:30 PM",
        activeDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        description: "A nutritionally balanced meal containing 4 Rotis, 1 Seasonal Sabzi, 1 Daal, Jeera Rice, and Fresh Salad. Cooked with minimal oil and organic spices.",
        rating: 4.8,
        ratingCount: 154,
        menuImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            {/* Back Button */}
            <Link to="/dashboard/menu" className="flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Back to Management
            </Link>

            <div className="bg-neutral-surface rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="relative h-64 md:h-80">
                    <img src={menu.menuImage} alt={menu.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                        <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase mb-2 inline-block">
                            {menu.mealType} • {menu.foodType}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                            {menu.name}
                        </h1>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-[10px] font-black text-neutral-muted uppercase tracking-[0.3em] mb-4">Description</h3>
                            <p className="text-neutral-text leading-relaxed font-medium">{menu.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 bg-neutral-bg rounded-2xl border border-gray-100">
                                <h4 className="flex items-center gap-2 text-[10px] font-black text-primary uppercase mb-3"><Calendar size={14} /> Schedule</h4>
                                <div className="flex gap-2">
                                    {menu.activeDays.map(day => (
                                        <span key={day} className="text-[10px] font-bold text-neutral-text">{day}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-5 bg-neutral-bg rounded-2xl border border-gray-100">
                                <h4 className="flex items-center gap-2 text-[10px] font-black text-primary uppercase mb-3"><Clock size={14} /> Delivery</h4>
                                <p className="text-xs font-bold text-neutral-text">{menu.deliveryTimeSlot}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Pricing</h4>
                                <ShieldCheck size={20} className="text-primary" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-neutral-muted font-bold">Daily</span>
                                    <span className="text-2xl font-black text-neutral-text">₹{menu.pricePerDay}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-neutral-muted font-bold">Monthly</span>
                                    <span className="text-2xl font-black text-primary">₹{menu.monthlyPrice}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-around py-4 border border-gray-100 rounded-2xl">
                            <div className="text-center">
                                <div className="flex items-center gap-1 text-primary font-black text-xl">{menu.rating} <Star size={16} fill="currentColor" /></div>
                                <p className="text-[8px] font-black text-neutral-muted uppercase">Rating</p>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div className="text-center">
                                <div className="text-xl font-black text-neutral-text">{menu.ratingCount}</div>
                                <p className="text-[8px] font-black text-neutral-muted uppercase">Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;