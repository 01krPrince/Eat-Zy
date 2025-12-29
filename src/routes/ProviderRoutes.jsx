import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProviderDashboardLayout from "../layout/providerDashboard/ProviderDashboardLayout";
import KitchenOverview from "../pages/provider/KitchenOverview";
import ViewMyAllMenus from "../pages/provider/menu/ViewAllMenus";
import CreateNewMenu from "../pages/provider/menu/CreateNewMenu";
import MenuDetail from "../pages/provider/menu/MenuDetail";
import ViewAllItems from "../pages/provider/item/ViewAllItems";
import CreateNewItem from "../pages/provider/item/CreateNewItem";
import ItemDetails from "../pages/provider/item/ItemDetails";
import ProfilePage from "../pages/ProfilePage"; // Reused profile page if needed

const ProviderRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute allowedRoles={['PROVIDER']}>
                        <ProviderDashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<KitchenOverview />} />

                {/* Menu Management */}
                <Route path="menu" element={<ViewMyAllMenus />} />
                <Route path="menu/create" element={<CreateNewMenu />} />
                <Route path="menu/:id" element={<MenuDetail />} />

                {/* Item Management */}
                <Route path="item" element={<ViewAllItems />} />
                <Route path="item/create" element={<CreateNewItem />} />
                <Route path="item/:id" element={<ItemDetails />} />

                {/* Other Provider Routes */}
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders" element={<div>Orders List</div>} />
                <Route path="earnings" element={<div>Earnings Reports</div>} />
                <Route path="settings" element={<div>Provider Settings</div>} />
            </Route>
        </Routes>
    );
};

export default ProviderRoutes;