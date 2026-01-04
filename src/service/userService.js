import api from "../api/axios";

// --- AUTH & OTP ---
export const sendOtpToEmail = async (email) => {
    // Reverted to working path
    const res = await api.post("/user-service/providers/send-otp", { email });
    return res.data;
};

export const verifyOtp = async (email, otp) => {
    // Reverted to working path
    const res = await api.post("/user-service/users/verify-otp", { email, otp });
    return res.data;
};

// --- REGISTRATION ---
export const registerProvider = async (providerRegistrationData) => {
    const res = await api.post("/user-service/providers/register", providerRegistrationData);
    return res.data;
};

export const applyProvider = async (providerData, userId) => {
    const res = await api.post("/user-service/providers/apply", providerData, {
        headers: { "X-USER-ID": userId }
    });
    return res.data;
};

// --- DATA FETCHING ---
export const getProviderById = async (providerId) => {
    const res = await api.get(`/user-service/providers/${providerId}`);
    return res.data;
};

export const getProvidersByStatus = async (status) => {
    const res = await api.get(`/user-service/providers/status/${status}`);
    return res.data;
};

// --- HELPER: JWT DECODE ---
const getUserIdFromToken = (token) => {
    try {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        return decoded.sub || decoded.id || decoded.userId; 
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

// --- PROFILE ---
export const getMyProviderProfile = async () => {
    const authData = localStorage.getItem("auth");
    let userId = null;
    let token = null;

    if (authData) {
        try {
            const parsed = JSON.parse(authData);
            token = parsed.token;
            userId = parsed.id || parsed?.user?.id;
            if (!userId && token) {
                userId = getUserIdFromToken(token);
            }
        } catch (e) {
            console.error("Auth Parse Error:", e);
        }
    }

    if (!userId) {
        console.error("❌ CRITICAL: Unable to find User ID in Storage or Token");
        throw new Error("User Identification Failed");
    }

    const res = await api.get("/user-service/providers/me", {
        headers: { "X-USER-ID": userId }
    });
    return res.data;
};

// --- ADMIN ACTIONS (Update Status) ---
// Using /user-service prefix here as well to match the working pattern

export const updateProviderStatus = async (id, newStatus) => {
    const res = await api.patch(`/user-service/providers/${id}/status`, null, {
        params: { status: newStatus }
    });
    return res.data;
};

export const approveProvider = async (id) => {
    return updateProviderStatus(id, "ACTIVE");
};

export const rejectProvider = async (id) => {
    return updateProviderStatus(id, "REJECTED");
};

export const blockProvider = async (id) => {
    return updateProviderStatus(id, "BLOCKED");
};

// --- DEFAULT EXPORT OBJECT ---
const KitchenPartnerService = {
    sendOtpToEmail,
    verifyOtp,
    registerProvider,
    applyProvider,
    getProviderById,
    getProvidersByStatus,
    getMyProviderProfile,
    updateProviderStatus,
    approveProvider,
    rejectProvider,
    blockProvider
};

export default KitchenPartnerService;