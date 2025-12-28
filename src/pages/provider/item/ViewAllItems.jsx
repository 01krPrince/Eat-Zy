import { Plus, Eye, Edit3, Tag } from "lucide-react";
import { Link } from "react-router-dom";


const ItemCard = ({ item }) => (
    <div className="bg-neutral-surface border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
        <div className="relative h-40 overflow-hidden">
            <img
                src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${item.available ? "bg-success text-white" : "bg-red-500 text-white"
                    }`}>
                    {item.available ? "Available" : "Out of Stock"}
                </span>
            </div>
        </div>

        <div className="p-5">
            <div className="flex justify-between items-start mb-1">
                <span className={`text-[9px] font-black uppercase tracking-widest ${item.foodType === "VEG" ? "text-success" : "text-red-500"
                    }`}>
                    {item.foodType} • {item.mealType}
                </span>
                <span className="text-sm font-bold text-neutral-text">₹{item.price}</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-text mb-1 truncate">{item.name}</h3>

            <div className="flex flex-wrap gap-1 mb-4 h-5 overflow-hidden">
                {item.tags?.map(tag => (
                    <span key={tag} className="text-[8px] bg-gray-100 text-neutral-muted px-2 py-0.5 rounded-md font-bold uppercase">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-3 py-3 border-t border-gray-50 mb-4">
                <div className={`flex items-center gap-1 text-[10px] font-bold ${item.includedInTiffin ? "text-primary" : "text-neutral-muted"}`}>
                    <Tag size={12} /> {item.includedInTiffin ? "Tiffin Item" : "A La Carte"}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Link to={`/dashboard/items/${item.id}`} className="flex items-center justify-center gap-2 py-2 bg-gray-50 text-neutral-text text-[10px] font-black uppercase rounded-xl hover:bg-gray-100 transition-colors">
                    <Eye size={14} /> Details
                </Link>
                <Link to={`/dashboard/items/edit/${item.id}`} className="flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Edit3 size={14} /> Edit
                </Link>
            </div>
        </div>
    </div>
);

const ViewAllItems = () => {
    const items = [
        { id: "101", name: "Special Dal Fry", foodType: "VEG", mealType: "LUNCH", price: 80, available: true, includedInTiffin: true, tags: ["healthy", "protein"], imageUrl: "" },
        { id: "102", name: "Butter Paneer", foodType: "VEG", mealType: "DINNER", price: 160, available: true, includedInTiffin: false, tags: ["spicy", "bestseller"], imageUrl: "" }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-neutral-text uppercase italic">Inventory Items</h2>
                    <p className="text-neutral-muted text-sm font-medium">Manage individual dishes and add-ons for your menus.</p>
                </div>
                <Link to="/dashboard/item/create" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Plus size={18} /> Add New Item
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default ViewAllItems;