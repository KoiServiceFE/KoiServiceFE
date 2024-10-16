import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableVetsByDate } from '../../services/koiService';

export const fetchVets = createAsyncThunk(
    'vets/fetchVets',
    async (date) => {
        const response = await fetchAvailableVetsByDate(date);
        return response;
    }
);

const vetSlice = createSlice({
    name: 'vets',
    initialState: {
        availableVets: [],
        selectedVetSlots: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        selectVet: (state, action) => {
            const selectedVet = state.availableVets.find(v => v.vetID === parseInt(action.payload));
            if (selectedVet) {
                state.selectedVetSlots = [{
                    scheduleID: selectedVet.scheduleID,
                    startTime: selectedVet.startTime,
                    endTime: selectedVet.endTime,
                    scheduleDate: selectedVet.scheduleDate
                }];
            } else {
                state.selectedVetSlots = [];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVets.fulfilled, (state, action) => {
                state.availableVets = action.payload.map(schedule => ({
                    vetID: schedule.veterian.vetID,
                    name: schedule.veterian.name,
                    email: schedule.veterian.email,
                    phone: schedule.veterian.phone,
                    specialization: schedule.veterian.specialization,
                    scheduleID: schedule.scheduleID,
                    scheduleDate: schedule.scheduleDate,
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                    type: schedule.type,
                    availability: schedule.availability
                }));
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