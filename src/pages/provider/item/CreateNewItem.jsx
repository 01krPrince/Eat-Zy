import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Tag, Info, Utensils, ToggleRight } from "lucide-react";
import CustomDropdown from "../../../shared/CustomDropdown";
import ItemService from "../../../service/menuServices";

const CreateNewItem = ({ mode = "create", menuId }) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        foodType: "VEG",        // Enum: VEG / NON_VEG
        mealType: "LUNCH",      // Enum: BREAKFAST / LUNCH / DINNER
        orderType: "BOTH",       // Enum: TIFFIN / CASUAL / BOTH
        includedInTiffin: false,
        optionalAddon: false,
        available: true,
        tags: ""
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags ?? ""
        }));
    }, []);


    const [loading, setLoading] = useState(false);

    // Standard input handler for text and checkboxes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Helper for CustomDropdown selections
    const handleDropdownSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestPayload = {
                ...formData,
                price: Number(formData.price),
                tags: (formData.tags || "")
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean)
            };

            if (mode === "create") {
                await ItemService.createItem(requestPayload);
                alert("Dish created successfully!");
            } else {
                await ItemService.updateItem(formData.id, requestPayload);
                alert("Dish updated successfully!");
            }

        } catch (error) {
            console.error("Error saving item:", error);
            alert(error?.message || "Failed to save dish");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20 transition-all duration-500">
            {/* Header */}
            <div className="border-b border-gray-100 pb-6">
                <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">
                    {mode === "create" ? "Add New dish" : "Edit Item"}
                </h2>
                <p className="text-neutral-muted text-sm font-medium">Configure dish details according to your inventory.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- LEFT: MAIN FORM --- */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Item Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                required
                                placeholder="e.g. Paneer Butter Masala"
                                className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium focus:border-primary transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Describe the ingredients, taste, or portion size..."
                                className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium focus:border-primary transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Price (₹)</label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full px-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-bold"
                                />
                            </div>

                            <CustomDropdown
                                label="Food Type"
                                options={["VEG", "NON_VEG"]}
                                selected={formData.foodType}
                                onSelect={(val) => handleDropdownSelect("foodType", val)}
                            />
                        </div>
                    </div>

                    {/* Context & Tags */}
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <CustomDropdown
                                label="Meal Type"
                                options={["BREAKFAST", "LUNCH", "DINNER"]}
                                selected={formData.mealType}
                                onSelect={(val) => handleDropdownSelect("mealType", val)}
                            />

                            <CustomDropdown
                                label="Order Context"
                                options={["TIFFIN", "CASUAL", "BOTH"]}
                                selected={formData.orderType}
                                onSelect={(val) => handleDropdownSelect("orderType", val)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1">Dietary Tags</label>
                            <div className="relative">
                                <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-muted" size={16} />
                                <input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="spicy, healthy, diabetic (comma separated)"
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-neutral-bg border border-gray-100 outline-none font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: CONFIG & ACTIONS --- */}
                <div className="space-y-6">
                    <div className="bg-neutral-surface p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                            <ToggleRight size={14} /> Logic & Status
                        </h4>

                        <label className="flex items-center justify-between p-4 bg-neutral-bg rounded-2xl cursor-pointer group hover:bg-gray-50 transition-all">
                            <span className="text-xs font-bold text-neutral-text">Available Now</span>
                            <input
                                name="available"
                                checked={formData.available}
                                onChange={handleInputChange}
                                type="checkbox"
                                className="w-5 h-5 accent-success"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-neutral-bg rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                            <span className="text-xs font-bold text-neutral-text">Part of Tiffin Plan</span>
                            <input
                                name="includedInTiffin"
                                checked={formData.includedInTiffin}
                                onChange={handleInputChange}
                                type="checkbox"
                                className="w-5 h-5 accent-primary"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-neutral-bg rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-neutral-text">Optional Add-on</span>
                                <span className="text-[8px] text-neutral-muted uppercase">Extra charges apply</span>
                            </div>
                            <input
                                name="optionalAddon"
                                checked={formData.optionalAddon}
                                onChange={handleInputChange}
                                type="checkbox"
                                className="w-5 h-5 accent-primary"
                            />
                        </label>
                    </div>

                    {/* Image Upload Placeholder */}
                    <div className="bg-neutral-surface p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-full aspect-square bg-neutral-bg border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-neutral-muted hover:border-primary transition-all cursor-pointer group">
                            <ImageIcon size={32} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase">Dish Image</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-3 py-5 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <Save size={18} /> {loading ? "Saving..." : (mode === "create" ? "Save dish" : "Update dish")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewItem;