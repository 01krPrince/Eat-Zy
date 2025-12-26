import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    UtensilsCrossed,
    ClipboardList,
    IndianRupee,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group border-r-4 ${active
                ? "bg-orange-600/10 border-orange-600 text-white"
                : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
    >
        <Icon size={20} className={active ? "text-orange-500" : "group-hover:text-orange-500 transition-colors"} />
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </Link>
);

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { state, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

   const handleLogout = () => {
    // 1. Clear Global State
    dispatch({ type: "LOGOUT" });

    // 2. Clear Local Storage completely
    localStorage.removeItem("auth"); 
    localStorage.clear(); // Optional: clears everything else like saved pincodes/theme

    // 3. HARD RESET: This prevents the back-button from returning to a cached dashboard
    window.location.replace("/login"); 
};

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            {/* --- SIDEBAR --- */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/5 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-orange-600 p-1.5 rounded-lg">
                            <LayoutDashboard size={18} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase italic">
                            Kitchen<span className="text-orange-500">.Hub</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation links */}
                <nav className="mt-8 flex flex-col h-[calc(100vh-160px)]">
                    <SidebarItem icon={LayoutDashboard} label="Overview" path="/dashboard" active={location.pathname === "/dashboard"} />
                    <SidebarItem icon={UtensilsCrossed} label="Manage Menu" path="/dashboard/menu" active={location.pathname === "/dashboard/menu"} />
                    <SidebarItem icon={ClipboardList} label="Active Orders" path="/dashboard/orders" active={location.pathname === "/dashboard/orders"} />
                    <SidebarItem icon={IndianRupee} label="Earnings" path="/dashboard/earnings" active={location.pathname === "/dashboard/earnings"} />

                    <div className="mt-auto border-t border-white/5 pt-4">
                        <SidebarItem icon={Settings} label="Settings" path="/dashboard/settings" active={location.pathname === "/dashboard/settings"} />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all group"
                        >
                            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Dashboard Header */}
                <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-orange-500 p-2 hover:bg-white/5 rounded-lg transition-colors">
                        {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>

                    <div className="flex items-center gap-6 ml-auto">
                        {/* Notification Bell */}
                        <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-[#0a0a0a]"></span>
                        </button>

                        {/* Chef Profile Summary */}
                        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Kitchen Master</p>
                                <p className="text-xs font-bold text-white tracking-tight">{state.user?.name || "Provider"}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-black text-white shadow-lg shadow-orange-600/20">
                                {state.user?.name?.charAt(0) || "P"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="p-4 md:p-8 flex-grow">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;