import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAvailableVetsByDate } from "../../services/koiService";

export const fetchVets = createAsyncThunk("vets/fetchVets", async (date) => {
  const response = await fetchAvailableVetsByDate(date);
  return response;
});

const vetSlice = createSlice({
  name: "vets",
  initialState: {
    availableVets: [],
    selectedVetSlots: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    selectVet: (state, action) => {
      const selectedVet = state.availableVets.find(
        (v) => v.vetID === parseInt(action.payload)
      );
      state.selectedVetSlots = selectedVet ? selectedVet.slots : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVets.fulfilled, (state, action) => {
        const groupedVets = action.payload.reduce((acc, schedule) => {
          const vetID = schedule.veterian.vetID;

          if (!acc[vetID]) {
            acc[vetID] = {
              vetID,
              name: schedule.veterian.name,
              email: schedule.veterian.email,
              phone: schedule.veterian.phone,
              specialization: schedule.veterian.specialization,
              slots: [],
            };
          }

          acc[vetID].slots.push({
            scheduleID: schedule.scheduleID,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            scheduleDate: schedule.scheduleDate,
          });

          return acc;
        }, {});
        state.availableVets = Object.values(groupedVets);
        state.isLoading = false;
      })

      .addCase(fetchVets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectVet } = vetSlice.actions;
export default vetSlice.reducer;
