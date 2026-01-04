import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search, Filter, MapPin, Star,
    Eye, FileText, ChevronDown,
    Store, Clock, ArrowRight, RefreshCw, Ban
} from "lucide-react";

// Components
import ViewApplication from "./ViewApplication";

// Service (Default Import matching your userService.js)
import KitchenPartnerService from "../../service/userService";

const KitchenPartnersPage = () => {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState("all"); // 'all' or 'requests'

    // Data States
    const [kitchens, setKitchens] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters & Search
    const [searchTerm, setSearchTerm] = useState("");
    const [activeStatusFilter, setActiveStatusFilter] = useState("ALL");
    const [requestTypeFilter, setRequestTypeFilter] = useState("PENDING");

    // --- MODAL STATES ---
    const [selectedApp, setSelectedApp] = useState(null); // For Applications (Object)

    const navigate = useNavigate();

    // --- FETCH DATA ---
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (activeTab === 'all') {
                // 1. Fetch Active Kitchens
                const data = await KitchenPartnerService.getProvidersByStatus("ACTIVE");

                const mappedData = data.map(item => ({
                    id: item.id || item._id,
                    name: item.kitchenName,
                    owner: item.ownerName || "Unknown Owner",
                    location: item.address?.city || "N/A",
                    rating: item.rating || 0,
                    orders: item.totalOrders || 0,
                    revenue: item.revenue || "₹0",
                    status: item.status,
                    fullData: item
                }));
                setKitchens(mappedData);
            } else {
                // 2. Fetch Management Data (Pending/Blocked/Rejected)
                const data = await KitchenPartnerService.getProvidersByStatus(requestTypeFilter);

                const mappedRequests = data.map(item => ({
                    id: item.id || item._id,
                    name: item.kitchenName,
                    owner: item.ownerName || "Unknown Owner",
                    email: item.email,
                    phone: item.phone,
                    location: item.address?.city || "N/A",
                    date: new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    }),
                    address: item.address,
                    status: item.status,
                    fullData: item
                }));
                setRequests(mappedRequests);
            }
        } catch (error) {
            console.error("Failed to fetch partners:", error);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, requestTypeFilter]);

    // Trigger Fetch on Tab or Filter Change
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    // --- HANDLERS ---

    const handleOpenReview = (requestItem) => {
        // For applications, we often pass the whole object to show static submitted data
        setSelectedApp(requestItem.fullData);
    };

    const handleOpenDetail = useCallback((kitchenItem) => {
        navigate(`/admin/kitchen-partners/${kitchenItem.id}`);
    }, [navigate]);

    const handleApproveApp = async (id) => {
        if (!window.confirm("Are you sure you want to approve this kitchen?")) return;
        try {
            await KitchenPartnerService.approveProvider(id);
            alert("Application Approved!");
            setSelectedApp(null);
            fetchData();
        } catch (error) {
            alert("Approval Failed");
            console.error(error);
        }
    };

    const handleRejectApp = async (id) => {
        if (!window.confirm("Reject this application?")) return;
        try {
            await KitchenPartnerService.rejectProvider(id);
            alert("Application Rejected.");
            setSelectedApp(null);
            fetchData();
        } catch (error) {
            alert("Rejection Failed");
        }
    };

    // Client-side filtering for Active Kitchens
    const filteredActiveKitchens = kitchens.filter(k => {
        const matchesSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeStatusFilter === "ALL" || k.status === activeStatusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 relative min-h-screen">

            {/* --- 1. HEADER & STATS --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kitchen Partners</h1>
                    <p className="text-sm text-gray-500">Manage your network of tiffin providers.</p>
                </div>
                <div className="flex gap-4">
                    <StatBadge label="Total Active" value={kitchens.length} icon={Store} color="blue" />
                    <StatBadge label="Pending" value={requests.length} icon={Clock} color="orange" />
                </div>
            </div>

            {/* --- 2. TABS & CONTROLS --- */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                {/* Tabs Header */}
                <div className="border-b border-gray-200 flex px-6">
                    <TabButton
                        label="Active Kitchens"
                        isActive={activeTab === 'all'}
                        onClick={() => setActiveTab('all')}
                        count={kitchens.length}
                    />
                    <TabButton
                        label="Manage Requests"
                        isActive={activeTab === 'requests'}
                        onClick={() => setActiveTab('requests')}
                        count={activeTab === 'requests' && requestTypeFilter === 'PENDING' ? requests.length : null}
                        isAlert={activeTab === 'requests' && requestTypeFilter === 'PENDING' && requests.length > 0}
                    />
                </div>

                {/* Toolbar (Search & Filter) */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by kitchen name..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* DYNAMIC FILTERS BASED ON TAB */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative">
                            {activeTab === 'all' ? (
                                <select
                                    className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-orange-500 cursor-pointer font-medium"
                                    value={activeStatusFilter}
                                    onChange={(e) => setActiveStatusFilter(e.target.value)}
                                >
                                    <option value="ALL">All Active</option>
                                    <option value="ACTIVE">Online</option>
                                    <option value="OFFLINE">Offline</option>
                                    <option value="WARNING">Warning</option>
                                </select>
                            ) : (
                                <select
                                    className="appearance-none bg-white border border-orange-200 text-orange-800 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-orange-500 cursor-pointer font-bold shadow-sm"
                                    value={requestTypeFilter}
                                    onChange={(e) => setRequestTypeFilter(e.target.value)}
                                >
                                    <option value="PENDING">⚡ New Requests</option>
                                    <option value="BLOCKED">🚫 Blocked Partners</option>
                                    <option value="REJECTED">❌ Rejected Applications</option>
                                </select>
                            )}
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>

                        <button
                            onClick={fetchData}
                            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh
                        </button>
                    </div>
                </div>

                {/* --- 3. TABLE CONTENT --- */}
                <div className="overflow-x-auto min-h-[300px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-48 text-gray-400">
                            Loading data...
                        </div>
                    ) : (
                        <>
                            {activeTab === 'all' ? (
                                <AllKitchensTable
                                    data={filteredActiveKitchens}
                                    onView={handleOpenDetail} // Passes item to handler which extracts ID
                                />
                            ) : (
                                <RequestsTable
                                    data={requests}
                                    type={requestTypeFilter}
                                    onReview={handleOpenReview}
                                />
                            )}

                            {((activeTab === 'all' && filteredActiveKitchens.length === 0) ||
                                (activeTab === 'requests' && requests.length === 0)) && (
                                    <div className="text-center py-10 text-gray-400 text-sm">
                                        No records found for this category.
                                    </div>
                                )}
                        </>
                    )}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <span className="text-xs text-gray-500 font-medium">
                        Showing results from database
                    </span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 bg-white rounded text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 border border-gray-200 bg-white rounded text-xs font-bold text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Modal A: Application Review (Passes Object) */}
            {selectedApp && (
                <ViewApplication
                    application={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onApprove={handleApproveApp}
                    onReject={handleRejectApp}
                    isReadOnly={requestTypeFilter !== 'PENDING'}
                />
            )}

        </div>
    );
};

// --- SUB-COMPONENTS ---

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
                            {item.rating} <span className="text-gray-400 font-normal">({item.orders})</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{item.revenue}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button
                            onClick={() => onView(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Eye size={18} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const RequestsTable = ({ data, onReview, type }) => (
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className={`text-xs font-bold uppercase tracking-wider border-b border-gray-100 
                ${type === 'BLOCKED' ? 'bg-red-50 text-red-600' :
                    type === 'REJECTED' ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-50 text-orange-600'}`}>
                <th className="px-6 py-4">Kitchen Details</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-right">Action</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                {type === 'BLOCKED' ? <Ban size={20} className="text-red-500" /> : <Store size={20} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.location}</p>
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
                        <p className="text-xs text-gray-900">{item.email}</p>
                        <p className="text-xs text-gray-500">{item.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                            {type === 'PENDING' ? (
                                <button
                                    onClick={() => onReview(item)}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-orange-200 hover:bg-orange-700 transition-colors"
                                >
                                    Review <ArrowRight size={14} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => onReview(item)}
                                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    <FileText size={14} /> View Details
                                </button>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

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
            {count !== null && count !== undefined && (
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
        BLOCKED: "bg-red-100 text-red-700 border-red-200",
        PENDING: "bg-blue-100 text-blue-700 border-blue-200",
        REJECTED: "bg-gray-100 text-gray-500 border-gray-200",
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