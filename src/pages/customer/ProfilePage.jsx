import React from "react";
import {
    User, MapPin, ChevronRight, ShoppingBag, Heart,
    CreditCard, Settings, LifeBuoy, LogOut, ChefHat, Star
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const user = state.user;

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/login");
    };

    const handleBecomeProvider = () => {
        navigate("/become-provider");
    };

    if (!user) return <div className="p-10 text-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-3xl mx-auto px-4">

                {/* --- 1. HEADER: User Identity (Clean & Minimal) --- */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-sm">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            <p className="text-gray-500 text-sm mt-0.5">+91 98765 43210</p>
                        </div>
                    </div>
                    <button className="text-orange-600 font-semibold text-sm hover:underline">
                        Edit
                    </button>
                </div>

                {/* --- 2. MAIN MENU GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT COLUMN: User Activity */}
                    <div className="space-y-6">

                        {/* Section: My Account */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">My Account</h3>
                            </div>
                            <div>
                                <MenuItem icon={<ShoppingBag size={20} />} label="Your Orders" sub="Track, view, or repeat orders" />
                                <MenuItem icon={<Heart size={20} />} label="Favorites" sub="Your favorite kitchens and dishes" />
                                <MenuItem icon={<MapPin size={20} />} label="Address Book" sub="Manage delivery areas" />
                                <MenuItem icon={<Star size={20} />} label="Hidden Gems" sub="Rated 4.5+ by you" last={true} />
                            </div>
                        </div>

                        {/* Section: Money */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payments & Refunds</h3>
                            </div>
                            <div>
                                <MenuItem icon={<CreditCard size={20} />} label="Payment Methods" />
                                <MenuItem icon={<LifeBuoy size={20} />} label="Refund Status" last={true} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Settings & Partner */}
                    <div className="space-y-6">

                        {/* Section: App Settings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">More</h3>
                            </div>
                            <div>
                                <MenuItem icon={<Settings size={20} />} label="Settings" sub="Notifications, Password" />
                                <MenuItem icon={<LifeBuoy size={20} />} label="Help & Support" last={true} />
                            </div>
                        </div>

                        {/* --- SUBTLE PROVIDER SECTION --- */}
                        {/* This is now a clean banner, not the main focus */}
                        <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-6 border border-orange-100 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <ChefHat size={18} className="text-orange-600" />
                                    <h4 className="font-bold text-gray-900">Add your Kitchen</h4>
                                </div>
                                <p className="text-xs text-gray-500 max-w-[200px]">
                                    Serve food to your neighborhood and earn money.
                                </p>
                            </div>
                            <button
                                onClick={handleBecomeProvider}
                                className="bg-white text-orange-600 border border-orange-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-orange-50 transition-colors"
                            >
                                Apply
                            </button>
                        </div>

                        {/* LOGOUT BUTTON */}
                        <button
                            onClick={handleLogout}
                            className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut size={20} />
                            Log Out
                        </button>

                        <p className="text-center text-xs text-gray-400">
                            App Version 1.0.4
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

// --- REUSABLE MENU ITEM COMPONENT ---
const MenuItem = ({ icon, label, sub, last = false }) => {
    return (
        <button className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${!last ? 'border-b border-gray-50' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    {icon}
                </div>
                <div className="text-left">
                    <h4 className="text-sm font-semibold text-gray-800">{label}</h4>
                    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
        </button>
    );
};

export default ProfilePage;