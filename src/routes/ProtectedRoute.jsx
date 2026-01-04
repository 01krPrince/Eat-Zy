import React, { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom"; // 👈 Outlet import karein
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
    children,
    allowedRoles,
    redirectPath = "/login"
}) => {
    const { state } = useAuth();
    const location = useLocation();

    // ... (Aapka purana debugging code yahan rehne dein) ...

    if (!state.isAuthenticated) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(state.user?.role)) {
        return <Navigate to="/" replace />;
    }

    // 👇👇 MAIN FIX YAHAN HAI 👇👇
    // Agar 'children' pass kiye hain to wo dikhao, nahi to Outlet use karo
    return children ? children : <Outlet />;
};

export default ProtectedRoute;