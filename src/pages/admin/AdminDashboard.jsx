import React from "react";
import { ShoppingBag, Users, Store, IndianRupee, TrendingUp, AlertCircle, ArrowUpRight, Activity } from "lucide-react";

// Clean Stat Card
const AdminStatCard = ({ title, value, trend, icon: Icon, colorClass, trendColor }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
                <Icon size={22} className={colorClass.replace("bg-", "text-")} />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendColor === 'green' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-500 text-sm font-medium mt-1">{title}</p>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-8">

            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back. Here is what's happening with your platform today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors shadow-sm shadow-orange-200">
                        System Status
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatCard
                    title="Total Revenue"
                    value="₹12.4L"
                    trend="+18%"
                    trendColor="green"
                    icon={IndianRupee}
                    colorClass="bg-green-500 text-green-600"
                />
                <AdminStatCard
                    title="Active Users"
                    value="8,432"
                    trend="+12%"
                    trendColor="green"
                    icon={Users}
                    colorClass="bg-blue-500 text-blue-600"
                />
                <AdminStatCard
                    title="Kitchen Partners"
                    value="124"
                    trend="+4 New"
                    trendColor="green"
                    icon={Store}
                    colorClass="bg-orange-500 text-orange-600"
                />
                <AdminStatCard
                    title="Pending Orders"
                    value="45"
                    trend="-2%"
                    trendColor="red"
                    icon={ShoppingBag}
                    colorClass="bg-purple-500 text-purple-600"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Revenue Analytics</h3>
                        <button className="text-sm text-orange-600 font-semibold hover:underline">View Details</button>
                    </div>
                    {/* Placeholder for Chart */}
                    <div className="h-64 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                        <Activity size={32} className="mb-2 opacity-50" />
                        <span className="text-sm font-medium">Chart Visualization Placeholder</span>
                    </div>
                </div>

                {/* Alerts / Activity Feed */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">System Alerts</h3>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 Active</span>
                    </div>

                    <div className="space-y-4">
                        <AlertItem
                            type="critical"
                            title="High Latency detected"
                            desc="Patna-East server region experiencing 200ms delay."
                            time="2m ago"
                        />
                        <AlertItem
                            type="warning"
                            title="Hygiene Check Failed"
                            desc="Kitchen #402 reported low score in automated audit."
                            time="1h ago"
                        />
                        <AlertItem
                            type="info"
                            title="New Admin Access"
                            desc="Admin login detected from new IP address."
                            time="3h ago"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for Alert Item
const AlertItem = ({ type, title, desc, time }) => {
    const colors = {
        critical: "bg-red-50 border-red-100 text-red-700",
        warning: "bg-amber-50 border-amber-100 text-amber-700",
        info: "bg-blue-50 border-blue-100 text-blue-700"
    };

    return (
        <div className={`p-4 rounded-xl border ${colors[type]} transition-all`}>
            <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">{title}</span>
                <span className="text-[10px] opacity-70">{time}</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">{desc}</p>
        </div>
    );
};

export default AdminDashboard;