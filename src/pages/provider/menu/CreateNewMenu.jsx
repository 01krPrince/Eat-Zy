import React, { useState, useMemo } from "react";
import {
    Save, ImageIcon, Clock, Calendar,
    IndianRupee, Info, Plus, Trash2, CheckCircle2,
    Search, Utensils, ChefHat, XCircle
} from "lucide-react";

const CreateNewMenu = () => {
    // 1. State strictly following the Java Menu Model
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        menuImage: "",              // String
        menuType: "TIFFIN",         // Enum
        mealType: "LUNCH",          // Enum
        foodType: "VEG",            // Enum
        subscriptionEnabled: true,  // boolean
        activeDays: ["MON", "TUE", "WED", "THU", "FRI"], // List<String>
        deliveryTimeSlot: "",       // String
        pricePerDay: "",            // Double
        monthlyPrice: "",           // Double
        active: true,               // boolean
    });

    // 2. Separate state for Items (UI Logic only)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItemIds, setSelectedItemIds] = useState([]);

    // Mock Inventory (MenuItem objects)
    const inventoryItems = [
        { id: "101", name: "Yellow Dal Tadka", foodType: "VEG", price: 60 },
        { id: "102", name: "Shahi Paneer", foodType: "VEG", price: 140 },
        { id: "103", name: "Butter Chicken", foodType: "NON_VEG", price: 180 },
        { id: "104", name: "Basmati Rice", foodType: "VEG", price: 50 },
        { id: "105", name: "Tawa Roti", foodType: "VEG", price: 8 },
    ];

    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    // Sorting Logic: Keep selected items at the top
    const sortedAndFilteredItems = useMemo(() => {
        return [...inventoryItems]
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                const aSelected = selectedItemIds.includes(a.id);
                const bSelected = selectedItemIds.includes(b.id);
                return bSelected - aSelected; // True (1) comes before False (0)
            });
    }, [searchTerm, selectedItemIds]);

    // --- Handlers ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const toggleDay = (day) => {
        const newDays = formData.activeDays.includes(day)
            ? formData.activeDays.filter(d => d !== day)
            : [...formData.activeDays, day];
        setFormData({ ...formData, activeDays: newDays });
    };

    const toggleItemSelection = (itemId) => {
        setSelectedItemIds(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">
                        Configure <span className="text-primary">Menu Offer</span>
                    </h2>
                    <p className="text-neutral-muted text-sm font-medium">Map your plan to the Java Menu Model and link inventory items.</p>
                </div>
                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Save size={18} /> Publish Menu
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* --- LEFT: MENU MODEL FIELDS (8 Columns) --- */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Basic Info Block */}
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Info size={16} className="text-primary" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-muted">Basic Information</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Menu Name</label>
                                <input name="name" onChange={handleInputChange} type="text" placeholder="e.g. Corporate Lunch Tiffin" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 font-bold outline-none focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Description</label>
                                <textarea name="description" onChange={handleInputChange} rows="3" placeholder="Describe the meal context..." className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 font-medium outline-none focus:border-primary transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Menu Type</label>
                                <select name="menuType" onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl bg-neutral-bg border border-gray-100 font-bold text-xs uppercase">
                                    <option value="TIFFIN">TIFFIN</option>
                                    <option value="CASUAL">CASUAL</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Meal Context</label>
                                <select name="mealType" onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl bg-neutral-bg border border-gray-100 font-bold text-xs uppercase">
                                    <option value="LUNCH">LUNCH</option>
                                    <option value="DINNER">DINNER</option>
                                    <option value="BREAKFAST">BREAKFAST</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Food Category</label>
                                <select name="foodType" onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl bg-neutral-bg border border-gray-100 font-bold text-xs uppercase">
                                    <option value="VEG">VEG</option>
                                    <option value="NON_VEG">NON_VEG</option>
                                    <option value="BOTH">BOTH</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tiffin Specifics & Pricing */}
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-primary" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-muted">Tiffin Configuration</h3>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Active Delivery Days</label>
                            <div className="flex flex-wrap gap-2">
                                {daysOfWeek.map(day => (
                                    <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all border ${formData.activeDays.includes(day) ? "bg-primary border-primary text-white shadow-md shadow-primary/20" : "bg-neutral-bg border-gray-100 text-neutral-muted hover:border-primary/40"}`}>
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1 flex items-center gap-2"><Clock size={12} /> Delivery Slot</label>
                                <input name="deliveryTimeSlot" onChange={handleInputChange} type="text" placeholder="e.g. 12:30 PM – 1:30 PM" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1 flex items-center gap-2"><IndianRupee size={12} /> Daily Price (Double)</label>
                                <input name="pricePerDay" onChange={handleInputChange} type="number" placeholder="100.00" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none focus:border-primary font-bold" />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <div className="flex-grow p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-text">Enable Monthly Subscription</span>
                                <input name="subscriptionEnabled" checked={formData.subscriptionEnabled} onChange={handleInputChange} type="checkbox" className="w-6 h-6 accent-primary cursor-pointer" />
                            </div>
                            {formData.subscriptionEnabled && (
                                <div className="flex-grow animate-in slide-in-from-left-2 duration-300">
                                    <input name="monthlyPrice" onChange={handleInputChange} type="number" placeholder="Monthly Total Price" className="w-full px-6 py-[1.1rem] rounded-2xl bg-neutral-bg border border-gray-100 outline-none focus:border-primary font-bold" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: UNIFIED ITEM CHECKLIST (4 Columns) --- */}
                <div className="lg:col-span-4 space-y-6 sticky top-28">

                    {/* Integrated List */}
                    <div className="bg-neutral-surface rounded-3xl border border-gray-100 shadow-md flex flex-col h-[740px]">
                        <div className="p-6 border-b border-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-muted">Add Items</h3>
                                <div className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                                    {selectedItemIds.length} Selected
                                </div>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-muted" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search Dal, Paneer..."
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-bg border border-gray-50 rounded-xl text-xs font-medium outline-none focus:border-primary/50"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {sortedAndFilteredItems.map(item => {
                                const isSelected = selectedItemIds.includes(item.id);
                                return (
                                    <label
                                        key={item.id}
                                        className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border group ${isSelected
                                                ? "bg-primary/5 border-primary shadow-sm"
                                                : "bg-white border-transparent hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div onClick={() => toggleItemSelection(item.id)} className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? "bg-primary border-primary" : "bg-white border-gray-200"
                                                }`}>
                                                {isSelected && <CheckCircle2 className="text-white" size={14} />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs font-bold text-neutral-text">{item.name}</p>
                                                    {isSelected && <span className="text-[8px] font-black text-primary uppercase bg-primary/10 px-1.5 py-0.5 rounded">Added</span>}
                                                </div>
                                                <p className="text-[9px] font-black text-neutral-muted uppercase tracking-tighter">₹{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${item.foodType === 'VEG' ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {item.foodType}
                                            </span>
                                            {isSelected && (
                                                <button onClick={() => toggleItemSelection(item.id)} className="p-1 text-neutral-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <XCircle size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-gray-50 bg-neutral-bg/30 text-center">
                            <p className="text-[9px] font-black text-neutral-muted uppercase">Selected items are moved to the top</p>
                        </div>
                    </div>

                    {/* Image Banner Upload Placeholder */}
                    <div className="bg-neutral-surface p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                        <div className="w-full aspect-video bg-neutral-bg border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-neutral-muted hover:border-primary transition-all cursor-pointer">
                            <ImageIcon size={24} />
                            <span className="text-[10px] font-black uppercase">Menu Banner (String)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewMenu;