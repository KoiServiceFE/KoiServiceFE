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
      date: date,
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

export const createBookingService = async (bookingData) => {
  try {
    const response = await axios.post("/bookings/create", bookingData);
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

export const createBookingWithRandomVetService = async (bookingData) => {
  try {
    const response = await axios.post("/bookings/random-vet", bookingData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create booking with random vet");
    }
  } catch (error) {
    console.error("Error creating booking with random vet:", error);
    throw error;
  }
};

export const fetchBookingsByUserId = async (userId) => {
  try {
    const response = await axios.get(`/bookings/history/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch bookings for user");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const fetchBookingsByScheduleId = async (scheduleId) => {
  try {
    const response = await axios.get(`/bookings/schedule/${scheduleId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch bookings by scheduleId");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
