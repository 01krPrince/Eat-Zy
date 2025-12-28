import React, { useState } from "react";
import {
    Search, Filter, MoreVertical, MapPin, Star,
    CheckCircle, XCircle, Eye, FileText, ChevronDown,
    Store, Clock, ArrowRight
} from "lucide-react";
import ViewApplication from "./ViewApplication";
import KitchenPartnerAdmin from "./KitchenPartnerAdmin"; // <--- 1. IMPORT ADDED

// --- MOCK DATA ---
const MOCK_ACTIVE_KITCHENS = [
    { id: 1, name: "Spicy Tiffin Center", owner: "Ramesh Kumar", location: "Kankarbagh, Patna", rating: 4.5, orders: 1240, revenue: "₹4.2L", status: "ACTIVE" },
    { id: 2, name: "Maa Ki Rasoi", owner: "Sunita Devi", location: "Boring Road, Patna", rating: 4.8, orders: 3105, revenue: "₹8.5L", status: "ACTIVE" },
    { id: 3, name: "Student Point", owner: "Amit Singh", location: "Danapur", rating: 3.9, orders: 850, revenue: "₹1.2L", status: "WARNING" },
    { id: 4, name: "Healthy Bites", owner: "Priya Raj", location: "Rajendra Nagar", rating: 4.2, orders: 210, revenue: "₹45k", status: "OFFLINE" },
];

const MOCK_REQUESTS = [
    {
        id: 101, name: "Bihar Delights", owner: "Vikram Seth", email: "vikram@example.com", phone: "9876543210",
        date: "28 Dec, 10:00 AM", location: "Patna City",
        kitchenName: "Bihar Delights Kitchen",
        address: { streetAddress: "Lane 4, Chowk", city: "Patna City", state: "Bihar", postalCode: "800008" }
    },
    {
        id: 102, name: "Annapurna Mess", owner: "Rahul Verma", email: "rahul@example.com", phone: "9123456780",
        date: "27 Dec, 04:30 PM", location: "Bailey Road",
        kitchenName: "Annapurna Home Foods",
        address: { streetAddress: "Raja Bazar, Pillar 45", city: "Patna", state: "Bihar", postalCode: "800014" }
    },
];

const KitchenPartnersPage = () => {
    const [activeTab, setActiveTab] = useState("all"); // 'all' or 'requests'
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");

    // --- MODAL STATES ---
    const [selectedApp, setSelectedApp] = useState(null); // For Pending Requests
    const [selectedActiveKitchen, setSelectedActiveKitchen] = useState(null); // For Active Kitchens (2. STATE ADDED)

    // --- HANDLERS ---
    const handleOpenReview = (application) => {
        setSelectedApp(application);
    };

    const handleCloseReview = () => {
        setSelectedApp(null);
    };

    const handleApproveApp = (id, note) => {
        console.log(`Approved Application ${id} with note: ${note}`);
        alert("Application Approved Successfully!");
        setSelectedApp(null);
    };

    const handleRejectApp = (id, note) => {
        console.log(`Rejected Application ${id} with reason: ${note}`);
        alert("Application Rejected.");
        setSelectedApp(null);
    };

    return (
        <div className="space-y-6 relative">

            {/* --- 1. HEADER & STATS --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kitchen Partners</h1>
                    <p className="text-sm text-gray-500">Manage your network of tiffin providers.</p>
                </div>
                <div className="flex gap-4">
                    <StatBadge label="Total Partners" value="124" icon={Store} color="blue" />
                    <StatBadge label="Pending Requests" value="12" icon={Clock} color="orange" />
                </div>
            </div>

            {/* --- 2. TABS & CONTROLS --- */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                {/* Tabs Header */}
                <div className="border-b border-gray-200 flex px-6">
                    <TabButton
                        label="All Kitchens"
                        isActive={activeTab === 'all'}
                        onClick={() => setActiveTab('all')}
                        count={124}
                    />
                    <TabButton
                        label="New Requests"
                        isActive={activeTab === 'requests'}
                        onClick={() => setActiveTab('requests')}
                        count={12}
                        isAlert
                    />
                </div>

                {/* Toolbar (Search & Filter) */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by kitchen name, owner, or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-orange-500 cursor-pointer font-medium"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="ALL">Status: All</option>
                                <option value="ACTIVE">Active</option>
                                <option value="OFFLINE">Offline</option>
                                <option value="WARNING">Warning</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>

                        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            <Filter size={16} /> Filters
                        </button>
                    </div>
                </div>

                {/* --- 3. TABLE CONTENT --- */}
                <div className="overflow-x-auto">
                    {activeTab === 'all' ? (
                        <AllKitchensTable
                            data={MOCK_ACTIVE_KITCHENS}
                            onView={setSelectedActiveKitchen} // <--- 3. PASS HANDLER HERE
                        />
                    ) : (
                        <RequestsTable
                            data={MOCK_REQUESTS}
                            onReview={handleOpenReview}
                        />
                    )}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <span className="text-xs text-gray-500 font-medium">Showing 1-10 of 124 results</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 bg-white rounded text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 border border-gray-200 bg-white rounded text-xs font-bold text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>

            {/* --- 4. MODAL INTEGRATIONS --- */}

            {/* Modal A: Pending Application Review */}
            {selectedApp && (
                <ViewApplication
                    application={selectedApp}
                    onClose={handleCloseReview}
                    onApprove={handleApproveApp}
                    onReject={handleRejectApp}
                />
            )}

            {/* Modal B: Active Kitchen Admin Detail (4. RENDER MODAL) */}
            {selectedActiveKitchen && (
                <KitchenPartnerAdmin
                    kitchen={selectedActiveKitchen}
                    onClose={() => setSelectedActiveKitchen(null)}
                />
            )}

        </div>
    );
};

// --- SUB-COMPONENTS ---

// Updated to accept 'onView'
const AllKitchensTable = ({ data, onView }) => (
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className="bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Kitchen Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4 text-right">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.owner} • {item.location}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            {item.rating} <span className="text-gray-400 font-normal">({item.orders} orders)</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{item.revenue}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onView(item)} // <--- CLICK HANDLER
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const RequestsTable = ({ data, onReview }) => (
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className="bg-orange-50/30 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4">Documents</th>
                <th className="px-6 py-4 text-right">Action</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                <Store size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.owner} • {item.location}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} className="text-gray-400" />
                            {item.date}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => onReview(item)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <FileText size={14} /> Review Docs
                        </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => onReview(item)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-orange-200 hover:bg-orange-700 transition-colors"
                            >
                                Review Application <ArrowRight size={14} />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

// --- UTILS ---

const TabButton = ({ label, isActive, onClick, count, isAlert }) => (
    <button
        onClick={onClick}
        className={`relative px-6 py-4 text-sm font-bold transition-all border-b-2 ${isActive
            ? "border-orange-500 text-orange-600 bg-orange-50/10"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
    >
        <div className="flex items-center gap-2">
            {label}
            {count && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
                    }`}>
                    {count}
                </span>
            )}
            {isAlert && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse absolute top-3 right-3"></span>}
        </div>
    </button>
);

const StatusBadge = ({ status }) => {
    const styles = {
        ACTIVE: "bg-green-100 text-green-700 border-green-200",
        OFFLINE: "bg-gray-100 text-gray-600 border-gray-200",
        WARNING: "bg-amber-100 text-amber-700 border-amber-200",
        SUSPENDED: "bg-red-100 text-red-700 border-red-200"
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles.OFFLINE}`}>
            {status}
        </span>
    );
};

const StatBadge = ({ label, value, icon: Icon, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
    };
    return (
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <div className={`p-2 rounded-lg ${colors[color]}`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
            </div>
        </div>
    );
};

export default KitchenPartnersPage;