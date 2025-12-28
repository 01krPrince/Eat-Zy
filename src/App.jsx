import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import ProviderDashboardLayout from "./layout/providerDashboard/ProviderDashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import KitchenOverview from "./pages/provider/KitchenOverview";
import AdminLayout from "./layout/adminLayout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GuestRoute from "./routes/GuestRoute";
import ViewMyAllMenus from "./pages/provider/ViewAllMenus";
import CreateNewMenu from "./pages/provider/CreateNewMenu";
import MenuDetail from "./pages/provider/MenuDetail";
import ItemDetails from "./pages/provider/ItemDetails";
import CreateNewItem from "./pages/provider/ItemForm";
import ViewAllItems from "./pages/provider/ViewAllItems";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- CUSTOMER / PUBLIC AREA --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<div>Explore Page</div>} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['PROVIDER']}>
              <ProviderDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<KitchenOverview />} />
          <Route path="menu" element={<ViewMyAllMenus />} />
          <Route path="menu/create" element={<CreateNewMenu />} />
          <Route path="menu/{id}" element={<MenuDetail />} />
          <Route path="item" element={<ViewAllItems />} />
          <Route path="item/create" element={<CreateNewItem />} />
          <Route path="item/{id}" element={<ItemDetails />} />
          <Route path="orders" element={<div>Orders List</div>} />
          <Route path="earnings" element={<div>Earnings Reports</div>} />
          <Route path="settings" element={<div>Provider Settings</div>} />
        </Route>


        {/* --- ADMIN PANEL (Admin Only) --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div>Manage All Users Page</div>} />
          <Route path="providers" element={<div>Verify Kitchen Partners Page</div>} />
          <Route path="system" element={<div>API & DB Status Monitoring</div>} />
        </Route>

        {/* --- AUTH (Clean Layout) --- */}
        {/* App.jsx */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <AuthPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <AuthPage />
            </GuestRoute>
          }
        />

        {/* Catch-all: Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;