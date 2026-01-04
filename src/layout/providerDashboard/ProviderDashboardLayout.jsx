import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard, UtensilsCrossed, ClipboardList, IndianRupee,
    Settings, LogOut, Menu as MenuIcon, X, Bell, ChefHat
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// 1. Updated SidebarItem to accept onClick for mobile auto-close
const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <Link
        to={path}
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group border-r-4 ${active
            ? "bg-primary/10 border-primary text-primary"
            : "border-transparent text-neutral-muted hover:bg-gray-50 hover:text-neutral-text"
            }`}
    >
        <Icon size={20} className={active ? "text-primary" : "text-neutral-muted group-hover:text-primary transition-colors"} />
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </Link>
);

const ProviderDashboardLayout = () => {
    // 2. Default to false so mobile doesn't start with menu blocking screen
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { state, dispatch } = useAuth();
    const location = useLocation();

    // --- DEBUGGING LOGS ---
    useEffect(() => {
        console.group("🖥️ ProviderDashboardLayout MOUNTED");
        console.log("Current Path:", location.pathname);
        console.log("Auth User State:", state.user);
        console.groupEnd();
    }, [location.pathname, state.user]);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.replace("/login");
    };

    // 3. Helper to close sidebar on mobile only
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen w-full bg-neutral-bg text-neutral-text overflow-hidden relative">

            {/* --- MOBILE BACKDROP OVERLAY --- */}
            {/* Only visible on mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-surface border-r border-gray-100 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 
                `}
            >
                <div className="h-20 flex items-center px-6 border-b border-gray-100 justify-between lg:justify-start">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            <ChefHat size={18} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase italic text-neutral-text">
                            Kitchen<span className="text-primary">.Hub</span>
                        </span>
                    </Link>
                    {/* Close button for Mobile inside sidebar */}
                    <button onClick={closeSidebar} className="lg:hidden text-neutral-muted hover:text-primary">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-8 flex flex-col h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Overview"
                        path="/dashboard"
                        active={location.pathname === "/dashboard"}
                        onClick={closeSidebar}
                    />
                    <SidebarItem
                        icon={UtensilsCrossed}
                        label="Manage Menu"
                        path="/dashboard/menu"
                        active={location.pathname === "/dashboard/menu"}
                        onClick={closeSidebar}
                    />
                    {/* Add other SidebarItems here with onClick={closeSidebar} */}

                    <div className="mt-auto border-t border-gray-100 pt-4 pb-4">
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-neutral-muted hover:text-red-500 hover:bg-red-50 transition-all group">
                            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="flex-grow flex flex-col h-full min-w-0">

                {/* Header */}
                <header className="h-20 flex-shrink-0 border-b border-gray-100 bg-neutral-surface/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        {/* Toggle Button (Visible only on Mobile) */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-primary p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <MenuIcon size={24} />
                        </button>

                        {/* Optional: Page Title for Mobile context */}
                        <span className="lg:hidden font-bold text-gray-700">Dashboard</span>
                    </div>

                    {/* User Info */}
                    <div className="ml-auto flex items-center gap-4">
                        <button className="relative p-2 text-neutral-muted hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-neutral-text">{state.user?.name || "Guest"}</p>
                            <p className="text-xs text-neutral-muted uppercase">{state.user?.role || "No Role"}</p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {state.user?.name?.charAt(0) || "U"}
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <main className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-neutral-bg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProviderDashboardLayout;