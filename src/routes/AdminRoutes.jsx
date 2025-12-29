import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layout/adminLayout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import KitchenPartnersPage from "../pages/admin/KitchenPartnersPage";
import ViewApplication from "../pages/admin/ViewApplication";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="kitchen-partners" element={<KitchenPartnersPage />} />
        {/* Note: I corrected the syntax {id} to :id for React Router v6 */}
        <Route path="kitchen-partners/:applicationId" element={<ViewApplication />} />
        
        {/* Placeholders for routes mentioned in original code */}
        <Route path="users" element={<div>Manage All Users Page</div>} />
        <Route path="providers" element={<div>Verify Kitchen Partners Page</div>} />
        <Route path="system" element={<div>API & DB Status Monitoring</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;