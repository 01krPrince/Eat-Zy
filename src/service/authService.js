import api from "../api/axios";

// Login
export const loginUser = async (email, password) => {
    const res = await api.post("/user-service/users/login", { email, password });
    return res.data;
};

// Register
export const registerUser = async (userData) => {
    const res = await api.post("/user-service/users/register", userData);
    return res.data;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
    const res = await api.post("/user-service/users/verify-otp", { 
    email: email, 
    otp: otp 
    });
    return res.data;
};

