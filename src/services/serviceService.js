import axios from '../config/axios';

// Create a new service
export const createService = async (serviceData) => {
  try {
    const response = await axios.post('/services', serviceData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to create service');
    }
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Fetch all services
export const fetchAllServices = async () => {
  try {
    const response = await axios.get('/services');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch services');
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Fetch service by ID
export const fetchServiceById = async (serviceID) => {
  try {
    const response = await axios.get(`/services/${serviceID}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch service with ID: ${serviceID}`);
    }
  } catch (error) {
    console.error(`Error fetching service with ID ${serviceID}:`, error);
    throw error;
  }
};

// Update a service by ID
export const updateService = async (serviceID, serviceData) => {
  try {
    const response = await axios.put(`/services/${serviceID}`, serviceData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update service with ID: ${serviceID}`);
    }
  } catch (error) {
    console.error(`Error updating service with ID ${serviceID}:`, error);
    throw error;
  }
};

// Delete a service by ID
export const deleteService = async (serviceID) => {
  try {
    const response = await axios.delete(`/services/${serviceID}`);
    if (response.status === 204) {
      return true;
    } else {
      throw new Error(`Failed to delete service with ID: ${serviceID}`);
    }
  } catch (error) {
    console.error(`Error deleting service with ID ${serviceID}:`, error);
    throw error;
  }
};

// Fetch services by type
export const fetchServicesByType = async (serviceType) => {
  try {
    const response = await axios.get(`/services/type/${serviceType}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch services of type: ${serviceType}`);
    }
  } catch (error) {
    console.error(`Error fetching services by type ${serviceType}:`, error);
    throw error;
  }
};

// Search services by name
export const searchServicesByName = async (name) => {
  try {
    const response = await axios.get(`/services/search`, {
      params: { name }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to search services by name');
    }
  } catch (error) {
    console.error('Error searching services by name:', error);
    throw error;
  }
};

// Fetch service revenue between dates
export const fetchServiceRevenue = async (startDate, endDate) => {
  try {
    const response = await axios.get('/services/service-revenue', {
      params: { startDate, endDate }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch service revenue');
    }
  } catch (error) {
    console.error('Error fetching service revenue:', error);
    throw error;
  }
};
