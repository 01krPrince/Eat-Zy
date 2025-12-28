import React from "react";
import { Plus, Eye, Edit3, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MenuCard = ({ menu }) => (
    <div className="bg-neutral-surface border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
        <div className="relative h-48 overflow-hidden">
            <img
                src={menu.menuImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                alt={menu.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${menu.active ? "bg-success text-white" : "bg-gray-400 text-white"
                    }`}>
                    {menu.active ? "Active" : "Disabled"}
                </span>
            </div>
        </div>

        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{menu.mealType} • {menu.foodType}</span>
                <span className="text-sm font-bold text-neutral-text">₹{menu.pricePerDay}/day</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-text mb-2 truncate">{menu.name}</h3>
            <p className="text-neutral-muted text-xs line-clamp-2 mb-4 h-8">{menu.description}</p>

            <div className="flex items-center gap-4 py-3 border-t border-gray-50 mb-4">
                <div className="flex items-center gap-1 text-neutral-muted">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold">{menu.deliveryTimeSlot}</span>
                </div>
                {menu.adminApproved ? (
                    <div className="flex items-center gap-1 text-success">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-bold">Verified</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-orange-400">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold">Pending Approval</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Link to={`/dashboard/menu/${menu.id}`} className="flex items-center justify-center gap-2 py-2 bg-gray-50 text-neutral-text text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors">
                    <Eye size={14} /> View Details
                </Link>
                <button className="flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Edit3 size={14} /> Edit
                </button>
            </div>
        </div>
    </div>
);

const ViewAllMenus = () => {
    // Mock data based on your Java Model
    const menus = [
        { id: "1", name: "Premium Veg Lunch", mealType: "LUNCH", foodType: "VEG", pricePerDay: 120, active: true, adminApproved: true, deliveryTimeSlot: "12:30 PM - 1:30 PM", description: "Fresh seasonal vegetables, handmade rotis, and special daal." },
        { id: "2", name: "North Indian Dinner", mealType: "DINNER", foodType: "BOTH", pricePerDay: 150, active: true, adminApproved: false, deliveryTimeSlot: "7:30 PM - 8:30 PM", description: "Authentic North Indian experience with Paneer/Chicken options." }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">Menu Management</h2>
                    <p className="text-neutral-muted text-sm font-medium">Create and manage your tiffin or casual meal offerings.</p>
                </div>
                <Link to="/dashboard/menu/create" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Plus size={18} /> Create New Menu
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menus.map(menu => <MenuCard key={menu.id} menu={menu} />)}
            </div>
        </div>
    );
};

export default ViewAllMenus;