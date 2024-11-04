// src/services/veterianService.js
import axios from "../config/axios";

// Create a new Veterian
export const createVeterian = async (veterianData) => {
  try {
    const response = await axios.post("/veterian/create", veterianData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create Veterian");
    }
  } catch (error) {
    console.error("Error creating Veterian:", error);
    throw error;
  }
};

// Get all Veterians
export const getAllVeterians = async () => {
  try {
    const response = await axios.get("/veterian");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch Veterians");
    }
  } catch (error) {
    console.error("Error fetching Veterians:", error);
    throw error;
  }
};

// Get Veterian by ID
export const getVeterianById = async (id) => {
  try {
    const response = await axios.get(`/veterian/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch Veterian with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error fetching Veterian with ID ${id}:`, error);
    throw error;
  }
};

// Update Veterian
export const updateVeterian = async (id, veterianData) => {
  try {
    const response = await axios.put(`/veterian/update/${id}`, veterianData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update Veterian with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error updating Veterian with ID ${id}:`, error);
    throw error;
  }
};

// Delete Veterian
export const deleteVeterian = async (id) => {
  try {
    const response = await axios.delete(`/veterian/delete/${id}`);
    if (response.status === 204) {
      return true; // Indicate success with no content
    } else {
      throw new Error(`Failed to delete Veterian with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error deleting Veterian with ID ${id}:`, error);
    throw error;
  }
};

// Create a prescription
export const createPrescription = async (prescriptionData) => {
  try {
    const response = await axios.post("/prescriptions", prescriptionData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create prescriptionData");
    }
  } catch (error) {
    console.error("Error creating prescriptionData:", error);
    throw error;
  }
};
