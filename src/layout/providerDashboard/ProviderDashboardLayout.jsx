import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    UtensilsCrossed,
    ClipboardList,
    IndianRupee,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    Bell,
    ChefHat
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
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
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { state, dispatch } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.replace("/login");
    };

    return (
        /* FIX 1: added 'h-screen' and 'overflow-hidden' to the main container 
           to prevent the entire browser window from scrolling.
        */
        <div className="flex h-screen w-full bg-neutral-bg text-neutral-text overflow-hidden transition-colors duration-500">

            {/* --- SIDEBAR --- */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-surface border-r border-gray-100 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="h-20 flex items-center px-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            <ChefHat size={18} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase italic text-neutral-text">
                            Kitchen<span className="text-primary">.Hub</span>
                        </span>
                    </Link>
                </div>

                <nav className="mt-8 flex flex-col h-[calc(100vh-160px)]">
                    <SidebarItem icon={LayoutDashboard} label="Overview" path="/dashboard" active={location.pathname === "/dashboard"} />
                    <SidebarItem icon={UtensilsCrossed} label="Manage Menu" path="/dashboard/menu" active={location.pathname === "/dashboard/menu"} />
                    <SidebarItem icon={UtensilsCrossed} label="Manage Item" path="/dashboard/item" active={location.pathname === "/dashboard/item"} />
                    <SidebarItem icon={ClipboardList} label="Active Orders" path="/dashboard/orders" active={location.pathname === "/dashboard/orders"} />
                    <SidebarItem icon={IndianRupee} label="Earnings" path="/dashboard/earnings" active={location.pathname === "/dashboard/earnings"} />

                    <div className="mt-auto border-t border-gray-100 pt-4 pb-4">
                        <SidebarItem icon={Settings} label="Settings" path="/dashboard/settings" active={location.pathname === "/dashboard/settings"} />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 text-neutral-muted hover:text-red-500 hover:bg-red-50 transition-all group"
                        >
                            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            {/* FIX 2: Ensure the content container takes up the full width 
                and has its own vertical scrollbar. 
            */}
            <div className="flex-grow flex flex-col h-full min-w-0">
                {/* Dashboard Header - Fixed at top of content area */}
                <header className="h-20 flex-shrink-0 border-b border-gray-100 bg-neutral-surface/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-primary p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>

                    <div className="flex items-center gap-6 ml-auto">
                        <button className="relative p-2 text-neutral-muted hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-neutral-surface"></span>
                        </button>

                        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-neutral-muted uppercase tracking-widest leading-none mb-1">Kitchen Master</p>
                                <p className="text-xs font-bold text-neutral-text tracking-tight">{state.user?.name || "Provider"}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">
                                {state.user?.name?.charAt(0) || "P"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* FIX 3: This main area now independently scrolls. 
                    Added 'overflow-y-auto' to allow scrolling of children.
                */}
                <main className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProviderDashboardLayout;