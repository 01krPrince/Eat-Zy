import React from "react";
import { Save, Image as ImageIcon, Sparkles } from "lucide-react";

const CreateNewItem = ({ mode = "create" }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">
                    {mode === "create" ? "Add New Item" : "Update Item"}
                </h2>
                <p className="text-neutral-muted text-sm font-medium">Define dish details, pricing, and dietary tags.</p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Item Name</label>
                            <input type="text" placeholder="e.g. Garlic Naan" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Base Price (₹)</label>
                                <input type="number" placeholder="0.00" className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Food Type</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-bold text-xs">
                                    <option>VEG</option>
                                    <option>NON_VEG</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Dietary Tags (Comma separated)</label>
                            <div className="relative">
                                <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-muted" size={16} />
                                <input type="text" placeholder="spicy, high-protein, keto" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Tiffin Configuration</h4>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center justify-between p-4 bg-neutral-bg rounded-2xl cursor-pointer">
                                <span className="text-xs font-bold text-neutral-text">Include in standard Tiffin?</span>
                                <input type="checkbox" className="w-5 h-5 accent-primary" />
                            </label>
                            <label className="flex items-center justify-between p-4 bg-neutral-bg rounded-2xl cursor-pointer">
                                <span className="text-xs font-bold text-neutral-text">Set as optional Add-on?</span>
                                <input type="checkbox" className="w-5 h-5 accent-primary" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-neutral-surface p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-full aspect-square bg-neutral-bg border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-neutral-muted">
                            <ImageIcon size={32} />
                            <span className="text-[10px] font-black uppercase">Item Image</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20">
                        <Save size={18} /> {mode === "create" ? "Save Item" : "Update Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewItem;