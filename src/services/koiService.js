import axios from "../config/axios";

export const fetchServices = async () => {
    try {
        const response = await axios.get("/services"); 
        console.log(response);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch services");
        }
        
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};