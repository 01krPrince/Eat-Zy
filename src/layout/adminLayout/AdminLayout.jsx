import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Users,
    Store,
    BarChart3,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    Database
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 border-l-4 ${active
                ? "bg-red-600/10 border-red-600 text-white"
                : "border-transparent text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
    >
        <Icon size={20} className={active ? "text-red-500" : ""} />
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </Link>
);

const AdminLayout = () => {
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
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* --- ADMIN SIDEBAR --- */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/5 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}>
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-600 p-1.5 rounded-lg shadow-lg shadow-red-600/20">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase italic">
                            Admin<span className="text-red-600">.Panel</span>
                        </span>
                    </div>
                </div>

                <nav className="mt-8 flex flex-col h-[calc(100vh-160px)]">
                    <AdminSidebarItem icon={BarChart3} label="Dashboard" path="/admin" active={location.pathname === "/admin"} />
                    <AdminSidebarItem icon={Store} label="Kitchen Partners" path="/admin/providers" active={location.pathname === "/admin/providers"} />
                    <AdminSidebarItem icon={Users} label="User Base" path="/admin/users" active={location.pathname === "/admin/users"} />
                    <AdminSidebarItem icon={Database} label="System Health" path="/admin/system" active={location.pathname === "/admin/system"} />

                    <div className="mt-auto border-t border-white/5 pt-4">
                        <AdminSidebarItem icon={Settings} label="Configuration" path="/admin/settings" active={location.pathname === "/admin/settings"} />
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-gray-600 hover:text-red-500 transition-all">
                            <LogOut size={20} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Exit Panel</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-grow flex flex-col min-w-0">
                <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex items-center justify-between px-8">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-red-500">
                        {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Root Authority</p>
                            <p className="text-xs font-bold text-white">{state.user?.name || "Administrator"}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white shadow-lg shadow-red-600/20">
                            AD
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;