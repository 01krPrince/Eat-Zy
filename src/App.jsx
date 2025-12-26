import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/providerDashboard/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import KitchenOverview from "./layout/providerDashboard/KitchenOverview";
import AdminLayout from "./layout/adminLayout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GuestRoute from "./routes/GuestRoute";

// Optional: Import your other pages as you build them
// import ManageMenu from "./pages/providerDashboard/ManageMenu";
// import ExploreKitchens from "./pages/ExploreKitchens";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- CUSTOMER / PUBLIC AREA --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<div>Explore Page</div>} />
        </Route>

        {/* --- PROVIDER DASHBOARD (Chef Only) --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['PROVIDER']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<KitchenOverview />} />
          <Route path="menu" element={<div>Menu Management</div>} />
          <Route path="orders" element={<div>Orders List</div>} />
          <Route path="earnings" element={<div>Earnings Reports</div>} />
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