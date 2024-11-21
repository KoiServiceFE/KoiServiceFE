import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPayment, fetchPaymentInfo } from "../../services/paymentService";

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ serviceID, bookingID }, { rejectWithValue }) => {
    try {
      const response = await createPayment(serviceID, bookingID);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const paymentInfo = createAsyncThunk(
  "payment/paymentInfo",
  async (paymentData, { rejectWithValue }) => {
    const bookingID = localStorage.getItem("currentBookingId");

    try {
      const response = await fetchPaymentInfo(paymentData, bookingID);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: null,
    paymentError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.paymentID = action.payload.paymentID;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.paymentError = action.payload;
      })
      .addCase(paymentInfo.fulfilled, (state, action) => {
        state.vnp_TransactionNo = action.payload.vnp_TransactionNo;
      })
      .addCase(paymentInfo.rejected, (state, action) => {
        state.paymentError = action.payload;
      });
  },
});

export default paymentSlice.reducer;
