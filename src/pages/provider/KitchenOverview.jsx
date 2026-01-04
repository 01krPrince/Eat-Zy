import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react";

const StatCard = ({ title, value, growth, icon: Icon }) => (
    <div className="bg-neutral-surface border border-gray-100 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Icon size={24} />
            </div>
            <span className="text-success text-xs font-bold bg-success-light px-2 py-1 rounded-full">
                +{growth}%
            </span>
        </div>
        <p className="text-neutral-muted text-[10px] font-black uppercase tracking-widest mb-1">
            {title}
        </p>
        <h3 className="text-2xl font-black text-neutral-text">
            {value}
        </h3>
    </div>
);

const KitchenOverview = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">
                Overview
            </h2>
            <p className="text-neutral-muted text-sm font-medium">
                Performance tracking for your kitchen.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="₹42,500" growth="12" icon={TrendingUp} />
            <StatCard title="Total Orders" value="154" growth="8" icon={ShoppingBag} />
            <StatCard title="Subscribers" value="48" growth="5" icon={Users} />
            <StatCard title="Avg Rating" value="4.8" growth="2" icon={Star} />
        </div>

        {/* Recent Orders Section */}
        <div className="bg-neutral-surface border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-neutral-text font-bold mb-6 flex items-center gap-2">
                Recent Orders
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            </h3>
            <div className="text-center py-20 text-neutral-muted border-2 border-dashed border-gray-100 rounded-2xl uppercase text-[10px] font-black tracking-widest bg-neutral-bg/50">
                Order processing stream will appear here
            </div>
        </div>
    </div>
);

export default KitchenOverview;