import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Info, CheckCircle2, XCircle } from "lucide-react";

const ItemDetails = () => {
    const { id } = useParams();

    const item = {
        name: "Special Dal Fry",
        description: "Yellow lentils tempered with cumin, garlic, and dry red chilies. A protein-rich comfort dish.",
        price: 80,
        foodType: "VEG",
        mealType: "LUNCH",
        orderType: "BOTH",
        includedInTiffin: true,
        optionalAddon: false,
        available: true,
        rating: 4.5,
        ratingCount: 88,
        tags: ["healthy", "protein", "low-fat"],
        imageUrl: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6"
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <Link to="/dashboard/items" className="inline-flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={16} /> Back to Inventory
            </Link>

            <div className="bg-neutral-surface rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="md:w-2/5 h-64 md:h-auto">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-8 md:w-3/5 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.foodType} • {item.mealType}</span>
                            <h1 className="text-3xl font-black text-neutral-text italic uppercase">{item.name}</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-neutral-text">₹{item.price}</p>
                            <p className="text-[8px] font-black text-neutral-muted uppercase">Per Plate</p>
                        </div>
                    </div>

                    <p className="text-neutral-muted text-sm leading-relaxed">{item.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-bg rounded-xl border border-gray-100">
                            <p className="text-[8px] font-black text-neutral-muted uppercase mb-1">Order Mode</p>
                            <p className="text-xs font-bold text-neutral-text">{item.orderType}</p>
                        </div>
                        <div className="p-4 bg-neutral-bg rounded-xl border border-gray-100">
                            <p className="text-[8px] font-black text-neutral-muted uppercase mb-1">Status</p>
                            <div className="flex items-center gap-1">
                                {item.available ? <CheckCircle2 size={12} className="text-success" /> : <XCircle size={12} className="text-red-500" />}
                                <p className="text-xs font-bold text-neutral-text">{item.available ? "Available" : "Stock Out"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-1 text-primary">
                            <Star size={18} fill="currentColor" />
                            <span className="font-black text-lg">{item.rating}</span>
                            <span className="text-[10px] text-neutral-muted font-bold ml-1">({item.ratingCount} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;