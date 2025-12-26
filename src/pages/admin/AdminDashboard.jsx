import React from "react";
import { ShoppingBag, Users, Store, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";

const AdminStatCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`}></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
                <p className="text-[10px] text-green-500 font-bold mt-2 uppercase">{subtext}</p>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${color.replace('bg-', 'text-')}`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">System Analytics</h2>
                    <p className="text-gray-500 text-sm mt-1">Real-time oversight of the Online.Food ecosystem.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Generate Audit</button>
                    <button className="px-4 py-2 bg-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:bg-red-700 transition-all">Emergency Lockdown</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatCard title="Total Platform Revenue" value="₹12.4L" subtext="↑ 18% Monthly" icon={IndianRupee} color="bg-green-500" />
                <AdminStatCard title="Active Customers" value="8,432" subtext="↑ 420 Today" icon={Users} color="bg-blue-500" />
                <AdminStatCard title="Verified Kitchens" value="124" subtext="12 Pending Review" icon={Store} color="bg-orange-500" />
                <AdminStatCard title="Active Subscriptions" value="3,105" subtext="↑ 5% Weekly" icon={ShoppingBag} color="bg-purple-500" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-bold uppercase text-xs tracking-widest">Kitchen Partner Performance</h3>
                        <TrendingUp size={16} className="text-gray-600" />
                    </div>
                    {/* Table or Chart goes here */}
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-gray-700 font-black uppercase text-[10px] tracking-widest">
                        Kitchen Traffic Visualization Area
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8">
                    <div className="flex justify-between items-center mb-8 text-red-500">
                        <h3 className="font-bold uppercase text-xs tracking-widest">System Alerts</h3>
                        <AlertTriangle size={16} />
                    </div>
                    <div className="space-y-4">
                        {[
                            "Server latency spike in Patna Region",
                            "3 Kitchens reported low hygiene scores",
                            "New Admin login from unknown IP"
                        ].map((alert, i) => (
                            <div key={i} className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-[10px] text-red-200 font-bold uppercase leading-relaxed">
                                • {alert}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;