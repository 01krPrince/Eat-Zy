import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    ShieldCheck, Users, Store, BarChart3, Settings,
    LogOut, Menu as MenuIcon, X, Database, Search, Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// 1. Updated Sidebar Item to handle mobile auto-close
const AdminSidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <Link
        to={path}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
            ? "bg-orange-50 text-orange-600 font-semibold shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
    >
        <Icon size={20} className={`transition-colors ${active ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"}`} />
        <span className="text-sm">{label}</span>
    </Link>
);

const AdminLayout = () => {
    // 2. Default to false so mobile doesn't start with menu blocking screen
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { state, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // 3. Logout handler
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    // 4. Close sidebar when clicking outside (Backdrop handler)
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans relative">

            {/* --- MOBILE OVERLAY BACKDROP --- */}
            {/* Only shows on mobile when sidebar is open. High Z-index but lower than sidebar. */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* --- ADMIN SIDEBAR --- */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 
                `}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100 justify-between lg:justify-start">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-600 p-1.5 rounded-lg shadow-sm">
                            <ShieldCheck size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-900 tracking-tight">
                            Admin<span className="text-orange-600">Panel</span>
                        </span>
                    </div>
                    {/* Close button only visible on mobile inside the drawer */}
                    <button onClick={closeSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Overview</p>

                    <AdminSidebarItem
                        icon={BarChart3}
                        label="Dashboard"
                        path="/admin"
                        active={location.pathname === "/admin"}
                        onClick={closeSidebar} // Close on mobile click
                    />
                    <AdminSidebarItem
                        icon={Store}
                        label="Kitchen Partners"
                        path="/admin/kitchen-partners"
                        active={location.pathname.includes("/admin/kitchen-partners")}
                        onClick={closeSidebar}
                    />
                    <AdminSidebarItem
                        icon={Users}
                        label="User Base"
                        path="/admin/users"
                        active={location.pathname.includes("/admin/users")}
                        onClick={closeSidebar}
                    />

                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">System</p>
                    <AdminSidebarItem
                        icon={Database}
                        label="System Health"
                        path="/admin/system"
                        active={location.pathname === "/admin/system"}
                        onClick={closeSidebar}
                    />
                    <AdminSidebarItem
                        icon={Settings}
                        label="Settings"
                        path="/admin/settings"
                        active={location.pathname === "/admin/settings"}
                        onClick={closeSidebar}
                    />

                    {/* Footer / Logout */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                        >
                            <LogOut size={20} />
                            <span className="text-sm font-medium">Log Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">

                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu - Visible only on Mobile/Tablet */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <MenuIcon size={24} />
                        </button>

                        {/* Search Bar - Hidden on very small screens, visible on tablet+ */}
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-orange-200 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="relative p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">{state.user?.name || "Administrator"}</p>
                                <p className="text-xs text-gray-500 mt-1">Super Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-100 to-orange-200 border-2 border-white shadow-sm flex items-center justify-center text-orange-700 font-bold text-sm">
                                {state.user?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;