import axios from "../config/axios";

export const fetchServices = async () => {
  try {
    const response = await axios.get("/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await axios.post("/services", serviceData);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (serviceID, serviceDetails) => {
  try {
    const response = await axios.put(`/services/${serviceID}`, serviceDetails);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (serviceID) => {
  try {
    await axios.delete(`/services/${serviceID}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

export const fetchAvailableVetsByDate = async (date) => {
  try {
    const response = await axios.post("/bookings/available-vets", {
      date: date
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching available vets:", error);
    throw error;
  }
};

export const createBookingService = async (bookingData) => {
  try {
    const response = await axios.post("/bookings/create", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};


export const createBookingWithRandomVetService = async (bookingData) => {
  try {
    const response = await axios.post("/bookings/random-vet", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking with random vet:", error);
    throw error;
  }
};