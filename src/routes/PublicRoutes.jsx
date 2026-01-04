import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";

import Homepage from "../pages/customer/Homepage";
import Login from "../pages/LoginPage";
import CustomerRegister from "../pages/customer/CustomerRegisterPage";
import Onboarding from "../pages/provider/Onboarding";
import ProviderRegister from "../pages/provider/AddKitchenPage";

import GuestRoute from "./GuestRoute";

const PublicRoutes = () => {
    return (
        <Routes>
            {/* --- Public Layout Routes --- */}
            <Route element={<PublicLayout />}>
                <Route index element={<Homepage />} />
                <Route path="explore" element={<div>Explore Page</div>} />
            </Route>

            {/* --- GUEST ONLY ROUTES --- */}
            <Route element={<GuestRoute><div /></GuestRoute>}>
            </Route>

            {/* 1. Login / Register (Customer) */}
            <Route
                path="login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="register"
                element={
                    <GuestRoute>
                        <CustomerRegister />
                    </GuestRoute>
                }
            />

            {/* 2. Provider Onboarding */}
            <Route
                path="partner"
                element={
                    <GuestRoute>
                        <Onboarding />
                    </GuestRoute>
                }
            />
            <Route
                path="partner/register"
                element={
                    <GuestRoute>
                        <ProviderRegister />
                    </GuestRoute>
                }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default PublicRoutes;