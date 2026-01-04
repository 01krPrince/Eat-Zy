import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    X, Phone, Mail, MapPin, Star, TrendingUp, DollarSign,
    ShoppingBag, Power, AlertTriangle, ExternalLink, ShieldCheck,
    ChevronRight, Store, Loader2, ArrowLeft
} from "lucide-react";
import KitchenPartnerService from "../../service/userService"; // Import Service

const KitchenPartnerDetailePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // --- STATE ---
    const [kitchen, setKitchen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusProcessing, setStatusProcessing] = useState(false);

    // --- FETCH DATA ON MOUNT ---
    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await KitchenPartnerService.getProviderById(id);
                setKitchen(data);
            } catch (error) {
                console.error("Error fetching kitchen details:", error);
                // Optional: Toast error here
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    // --- HANDLERS ---

    const handleToggleStatus = async () => {
        if (!kitchen) return;

        const newStatus = kitchen.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        const actionName = kitchen.status === "ACTIVE" ? "Suspend" : "Activate";

        if (!window.confirm(`Are you sure you want to ${actionName} this kitchen?`)) return;

        try {
            setStatusProcessing(true);
            await KitchenPartnerService.updateProviderStatus(kitchen.id || kitchen._id, newStatus);

            // Update local state to reflect change immediately
            setKitchen(prev => ({ ...prev, status: newStatus }));
            alert(`Kitchen ${actionName}d successfully`);
        } catch (error) {
            console.error("Status update failed:", error);
            alert("Failed to update status");
        } finally {
            setStatusProcessing(false);
        }
    };

    const handleBack = () => {
        navigate('/admin/kitchen-partners');
    };

    if (!id) return null;

    return (
        <div className="space-y-0 p-0 lg:p-0">
            {/* --- HEADER --- */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleBack}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-5">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                        <Store size={40} />
                    </div>

                    {/* Title Info */}
                    <div>
                        {loading ? (
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-gray-900">{kitchen.kitchenName || kitchen.name}</h2>
                                    <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200">
                                        <ShieldCheck size={12} /> Verified Partner
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                    <MapPin size={14} /> {kitchen.address?.city || "Location N/A"} • ID: #{kitchen.id || kitchen._id?.substring(0, 8)}
                                </p>

                                {/* Status Badge */}
                                <div className="flex items-center gap-3 mt-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${kitchen.status === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
                                    <span className="text-sm font-bold text-gray-700">
                                        {kitchen.status === 'ACTIVE' ? 'Online & Serving' : `Currently ${kitchen.status}`}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="ml-auto flex gap-3">
                    <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                        <ExternalLink size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                    <Loader2 size={40} className="animate-spin text-orange-500" />
                    <p>Loading kitchen details...</p>
                </div>
            ) : (
                <>
                    {/* 1. STATS GRID (Mock Data if backend doesn't send metrics yet) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard label="Total Revenue" value={kitchen.revenue || "₹0"} sub="Lifetime" icon={DollarSign} color="green" />
                        <StatCard label="Total Orders" value={kitchen.totalOrders || "0"} sub="Completed" icon={ShoppingBag} color="blue" />
                        <StatCard label="Rating" value={kitchen.rating || "New"} sub="Average Star" icon={Star} color="yellow" />
                        <StatCard label="Status" value={kitchen.status} sub="Current State" icon={TrendingUp} color="purple" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COL: DETAILS */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Contact Info */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Owner Contact</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <DetailRow icon={Phone} label="Phone Number" value={kitchen.phone || "N/A"} action="Call" />
                                    <DetailRow icon={Mail} label="Email Address" value={kitchen.email || "N/A"} action="Email" />
                                </div>
                            </div>

                            {/* Address Info */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Address Details</h3>
                                <p className="text-gray-700 font-medium">
                                    {kitchen.address?.streetAddress}, {kitchen.address?.city}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {kitchen.address?.state} - {kitchen.address?.postalCode}
                                </p>
                            </div>

                            {/* Recent Activity (Mock) */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Recent Orders</h3>
                                    <button className="text-xs text-orange-600 font-bold hover:underline">View All</button>
                                </div>
                                <div className="space-y-3">
                                    {/* Mock Rows - Replace with real order mapping later */}
                                    <OrderRow id="#ORD-9921" amount="₹450" items="2x Thali, 1x Roti" status="Delivered" time="20 mins ago" />
                                    <OrderRow id="#ORD-9920" amount="₹120" items="1x Egg Curry" status="Cancelled" time="1 hour ago" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COL: ACTIONS */}
                        <div className="space-y-6">

                            {/* Quick Actions */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Admin Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group">
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700">View Menu Catalog</span>
                                        <ChevronRight size={16} className="text-gray-400 group-hover:text-orange-500" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Download Reports</span>
                                        <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                <div className="flex items-center gap-2 text-red-700 mb-2">
                                    <AlertTriangle size={18} />
                                    <h3 className="font-bold text-sm uppercase">Danger Zone</h3>
                                </div>
                                <p className="text-xs text-red-600 mb-4">
                                    {kitchen.status === 'ACTIVE'
                                        ? "Suspending a kitchen will immediately stop them from receiving new orders."
                                        : "Re-activating will allow this kitchen to accept orders again."}
                                </p>
                                <button
                                    onClick={handleToggleStatus}
                                    disabled={statusProcessing}
                                    className={`w-full py-2 bg-white border border-red-200 text-red-600 font-bold text-sm rounded-lg hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2 ${statusProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {statusProcessing ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Power size={16} />
                                    )}
                                    {kitchen.status === 'ACTIVE' ? 'Suspend Kitchen' : 'Re-Activate Kitchen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, sub, icon: Icon, color }) => {
    const colors = {
        green: "text-green-600 bg-green-50",
        blue: "text-blue-600 bg-blue-50",
        yellow: "text-yellow-600 bg-yellow-50",
        purple: "text-purple-600 bg-purple-50",
    };
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{sub}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${colors[color]}`}>
                <Icon size={20} />
            </div>
        </div>
    );
};

const DetailRow = ({ icon: Icon, label, value, action }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 text-gray-400"><Icon size={16} /></div>
        <div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-sm font-bold text-gray-900 break-all">{value}</p>
            {action && (
                <button className="text-xs text-orange-600 font-bold mt-0.5 hover:underline">
                    {action}
                </button>
            )}
        </div>
    </div>
);

const OrderRow = ({ id, items, amount, status, time }) => (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
        <div>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-800">{id}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{items}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-bold text-gray-900">{amount}</p>
            <p className="text-[10px] text-gray-400">{time}</p>
        </div>
    </div>
);

export default KitchenPartnerDetailePage;