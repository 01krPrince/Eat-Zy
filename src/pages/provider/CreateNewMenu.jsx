import React from "react";
import { Save, Image as ImageIcon, CheckCircle2 } from "lucide-react";

const CreateNewMenu = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">Create Offer</h2>
                <p className="text-neutral-muted text-sm font-medium">List a new tiffin plan or casual menu for your customers.</p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Left: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Menu Name</label>
                                <input type="text" placeholder="e.g. Corporate Lunch Tiffin" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Description</label>
                                <textarea rows="4" placeholder="What's special in this menu?" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 focus:border-primary transition-all outline-none font-medium" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Meal Context</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-bold text-sm">
                                    <option>LUNCH</option>
                                    <option>DINNER</option>
                                    <option>BREAKFAST</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Food Type</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-bold text-sm">
                                    <option>VEG</option>
                                    <option>NON_VEG</option>
                                    <option>BOTH</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-gray-50 pb-4">Tiffin Specific Details</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Delivery Time Slot</label>
                                <input type="text" placeholder="e.g. 1:00 PM - 2:00 PM" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Price Per Day (₹)</label>
                                <input type="number" placeholder="100" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Meta & Submit */}
                <div className="space-y-6">
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                        <div className="w-full aspect-square bg-neutral-bg border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-neutral-muted hover:border-primary hover:text-primary transition-all cursor-pointer">
                            <ImageIcon size={40} strokeWidth={1} />
                            <span className="text-[10px] font-black uppercase">Upload Menu Banner</span>
                        </div>
                    </div>

                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between p-2">
                            <span className="text-xs font-bold text-neutral-text">Enable Subscriptions</span>
                            <input type="checkbox" className="w-5 h-5 accent-primary" />
                        </div>
                        <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            <Save size={18} /> Publish Menu
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateNewMenu;