import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Clock, Ban, Loader, LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import { getMyProviderProfile } from "../../service/userService";

const ProviderApprovalGuard = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const [status, setStatus] = useState(null); // 'PENDING', 'APPROVED', etc.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. Fetch Real-time Status from Backend ---
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await getMyProviderProfile();
                // Data me se status nikalo (Backend response check kar lena)
                setStatus(data.status || "PENDING");
            } catch (err) {
                console.error("Failed to fetch provider status:", err);
                setError("Could not verify account status.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/login");
    };

    // --- 2. Loading State ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader className="animate-spin text-primary mb-4" size={40} />
                <p className="text-gray-500 font-medium">Verifying Account Status...</p>
            </div>
        );
    }

    // --- 3. Error State (API Fail) ---
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-red-100 max-w-md">
                    <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button onClick={handleLogout} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // --- 4. PENDING (Full Page, No Sidebar) ---
    if (status === "PENDING") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 animate-fade-in-up">
                    <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock size={40} className="text-yellow-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Under Review</h2>
                    <p className="text-gray-500 mb-8">
                        Admin aapke documents verify kar rahe hain. Approval milte hi aapko dashboard access mil jayega.
                    </p>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={18} />
                        Logout & Check Later
                    </button>
                </div>
            </div>
        );
    }

    // --- 5. REJECTED / BANNED ---
    if (status === "REJECTED" || status === "BANNED") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Ban size={40} className="text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
                    <p className="text-red-500 mb-8 font-medium bg-red-50 p-3 rounded">
                        Status: {status}
                    </p>
                    <button onClick={handleLogout} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // --- 6. APPROVED (Show Sidebar & Dashboard) ---
    return <Outlet />;
};

export default ProviderApprovalGuard;