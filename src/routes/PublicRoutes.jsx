import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Homepage from "../pages/Homepage";
import ProfilePage from "../pages/ProfilePage";
import AddKitchenPage from "../pages/AddKitchenPage";
import AuthPage from "../pages/AuthPage";
import GuestRoute from "./GuestRoute";

const PublicRoutes = () => {
    return (
        <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
                <Route index element={<Homepage />} />
                <Route path="explore" element={<div>Explore Page</div>} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="become-provider" element={<AddKitchenPage />} />
            </Route>

            {/* Auth Routes (Guest Only) */}
            <Route
                path="login"
                element={
                    <GuestRoute>
                        <AuthPage />
                    </GuestRoute>
                }
            />
            <Route
                path="register"
                element={
                    <GuestRoute>
                        <AuthPage />
                    </GuestRoute>
                }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default PublicRoutes;