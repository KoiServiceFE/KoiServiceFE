import axios from "../config/axios";

export const fetchAllBookings = async () => {
  try {
    const response = await axios.get("/bookings");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch bookings");
    }
  } catch (error) {
    console.error("Error fetching servbookingsices:", error);
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
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create booking");
    }
  } catch (error) {
    console.error("Error creating booking service:", error);
    throw error;
  }
};

export const createFeedback = async (feedbackData) => {
  try {
    const response = await axios.post("/feedback/create", feedbackData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create feedback");
    }
  } catch (error) {
    console.error("Error creating feedback service:", error);
    throw error;
  }
};

export const createBookingWithRandomVetService = async (bookingData) => {
  try {
    const response = await axios.post("/bookings/random-vet", bookingData);
    if (response.status === 201) {
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

export const fetchFeedbackById = async (feedbackId) => {
  try {
    const response = await axios.get(`/feedback/${feedbackId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch feedback");
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
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

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(`/bookings/status/${bookingId}`, null, {
      params: { status },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update booking status");
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const updateBookingFeedback = async (bookingId, feedbackID) => {
  try {
    const response = await axios.put(`/bookings/feedback/${bookingId}`, null, {
      params: { feedbackID },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update booking feedback");
    }
  } catch (error) {
    console.error("Error updating booking feedback:", error);
    throw error;
  }
};

export const updateBookingWithKoiID = async (bookingId, koiId) => {
  try {
    const response = await axios.put(`/bookings/koi/${bookingId}`, null, {
      params: { koiID: koiId },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update booking with koiId");
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const updateBookingWithPaymentId = async (bookingId, paymentId) => {
  try {
    const response = await axios.put(`/bookings/${bookingId}/payment`, null, {
      params: { paymentId: paymentId },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update booking with paymentId");
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const fetchPresByBookingId = async (bookingID) => {
  try {
    const response = await axios.get(`/prescriptions/booking/${bookingID}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch prescriptions for user");
    }
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    throw error;
  }
};
