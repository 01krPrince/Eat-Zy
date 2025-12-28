import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    ShieldCheck, Users, Store, BarChart3, Settings,
    LogOut, Menu as MenuIcon, X, Database, Search, Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
            ? "bg-orange-50 text-orange-600 font-semibold"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
    >
        <Icon size={20} className={active ? "text-orange-600" : "text-gray-400"} />
        <span className="text-sm">{label}</span>
    </Link>
);

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { state, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.replace("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">

            {/* --- ADMIN SIDEBAR --- */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                {/* Brand Header */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-600 p-1.5 rounded-lg">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-900 tracking-tight">
                            Admin<span className="text-orange-600">Panel</span>
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 flex flex-col h-[calc(100vh-64px)]">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Overview</p>
                    <AdminSidebarItem icon={BarChart3} label="Dashboard" path="/admin" active={location.pathname === "/admin"} />
                    <AdminSidebarItem icon={Store} label="Kitchen Partners" path="/admin/kitchen-partners" active={location.pathname === "/admin/kitchen-partners"} />
                    <AdminSidebarItem icon={Users} label="User Base" path="/admin/users" active={location.pathname === "/admin/users"} />

                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">System</p>
                    <AdminSidebarItem icon={Database} label="System Health" path="/admin/system" active={location.pathname === "/admin/system"} />
                    <AdminSidebarItem icon={Settings} label="Settings" path="/admin/settings" active={location.pathname === "/admin/settings"} />

                    {/* Footer / Logout */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all">
                            <LogOut size={20} />
                            <span className="text-sm font-medium">Log Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-grow flex flex-col min-w-0">

                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-500">
                            {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
                        </button>
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
                            <Search size={18} className="text-gray-400" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-500 hover:text-orange-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800">{state.user?.name || "Administrator"}</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-gray-600 font-bold text-sm">
                                {state.user?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;