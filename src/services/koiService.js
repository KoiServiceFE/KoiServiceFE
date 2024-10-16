import axios from "../config/axios";

export const fetchServices = async () => {
    try {
        const response = await axios.get("/services");
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

export const fetchAvailableVetsByDate = async (date) => {
    try {
      const response = await axios.post("/bookings/available-vets", {
        date: date 
      });
      console.log("Available vets:", response.data);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch available vets");
      }
    } catch (error) {
      console.error("Error fetching available vets:", error);
      throw error;
    }
  };

export const createBookingWithRandomVet = async (bookingData) => {
    try {
        const response = await axios.post("/bookings/createBookingWithRandomVet", bookingData);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to create booking");
        }
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};