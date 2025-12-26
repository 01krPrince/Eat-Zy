import api from "../api/axios";

export const loginUser = async (email, password) => {
    const res = await api.post("/user-service/users/login", { email, password });
    return res.data;
};

export const registerUser = async (userData) => {
    const res = await api.post("/user-service/users/register", userData);
    return res.data;
};