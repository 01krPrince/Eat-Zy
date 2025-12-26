import React from "react";
import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react";

const StatCard = ({ title, value, growth, icon: Icon }) => (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-600/10 rounded-xl text-orange-500">
                <Icon size={24} />
            </div>
            <span className="text-green-500 text-xs font-bold">+{growth}%</span>
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
    </div>
);

const KitchenOverview = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Overview</h2>
            <p className="text-gray-500 text-sm">Performance tracking for your kitchen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="₹42,500" growth="12" icon={TrendingUp} />
            <StatCard title="Total Orders" value="154" growth="8" icon={ShoppingBag} />
            <StatCard title="Subscribers" value="48" growth="5" icon={Users} />
            <StatCard title="Avg Rating" value="4.8" growth="2" icon={Star} />
        </div>

        {/* Placeholder for Recent Orders Table */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
            <h3 className="text-white font-bold mb-6">Recent Orders</h3>
            <div className="text-center py-20 text-gray-600 border-2 border-dashed border-white/5 rounded-2xl uppercase text-[10px] font-black tracking-widest">
                Order processing stream will appear here
            </div>
        </div>
    </div>
);

export default KitchenOverview;