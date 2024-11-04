import axios from "../config/axios";

// Fetch all vet schedules
export const fetchAllSchedules = async () => {
  try {
    const response = await axios.get("/vetschedules");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch vet schedules");
    }
  } catch (error) {
    console.error("Error fetching vet schedules:", error);
    throw error;
  }
};

// Fetch a single vet schedule by ID
export const fetchVetScheduleById = async (scheduleID) => {
  try {
    const response = await axios.get(`/vetschedules/${scheduleID}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch vet schedule with ID: ${scheduleID}`);
    }
  } catch (error) {
    console.error(`Error fetching vet schedule with ID ${scheduleID}:`, error);
    throw error;
  }
};

// Create a new vet schedule
export const createVetSchedule = async (vetScheduleData) => {
  try {
    const response = await axios.post("/vetschedules/create", vetScheduleData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create vet schedule");
    }
  } catch (error) {
    console.error("Error creating vet schedule:", error);
    throw error;
  }
};

// Update a vet schedule by ID
export const updateVetSchedule = async (scheduleID, vetScheduleData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/vetschedules/${scheduleID}`,
      vetScheduleData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update vet schedule with ID: ${scheduleID}`);
    }
  } catch (error) {
    console.error(`Error updating vet schedule with ID ${scheduleID}:`, error);
    throw error;
  }
};

// Delete a vet schedule by ID
export const deleteScheduleById = async (scheduleID) => {
  try {
    const response = await axios.delete(`/vetschedules/${scheduleID}`);
    if (response.status === 204) {
      return true;
    } else {
      throw new Error(`Failed to delete vet schedule with ID: ${scheduleID}`);
    }
  } catch (error) {
    console.error(`Error deleting vet schedule with ID ${scheduleID}:`, error);
    throw error;
  }
};
