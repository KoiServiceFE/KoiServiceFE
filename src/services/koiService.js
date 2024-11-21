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

export const fetchAvailableVetsByDate = async (date) => {
  try {
    const response = await axios.post("/bookings/available-vets", {
      date: date,
    });
    console.log(response.data);
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

// Fetch all Koi
export const fetchAllKoi = async () => {
  try {
    const response = await axios.get("/koi");
    return response.data;
  } catch (error) {
    console.error("Error fetching all koi:", error);
    throw error;
  }
};

// Fetch Koi by ID
export const fetchKoiById = async (id) => {
  try {
    const response = await axios.get(`/koi/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching koi with ID ${id}:`, error);
    throw error;
  }
};

// Create a new Koi
export const createKoi = async (koiData) => {
  try {
    const response = await axios.post("/koi/create", koiData);
    return response.data;
  } catch (error) {
    console.error("Error creating koi:", error);
    throw error;
  }
};

// Update a Koi by ID
export const updateKoi = async (id, koiData) => {
  try {
    const response = await axios.put(`/koi/${id}`, koiData);
    return response.data;
  } catch (error) {
    console.error(`Error updating koi with ID ${id}:`, error);
    throw error;
  }
};

// Delete a Koi by ID
export const deleteKoi = async (id) => {
  try {
    await axios.delete(`/koi/${id}`);
  } catch (error) {
    console.error(`Error deleting koi with ID ${id}:`, error);
    throw error;
  }
};

