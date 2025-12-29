import api from "../../api/axios"

export const registerProvider = async (formData) => {
  try {
    console.log("Hello")
    const response = await api.post("/tiffin-provider-service/providers/apply", formData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Provider Registration Error:", error);
    throw error.response?.data || new Error("Network Error");
  }
};
