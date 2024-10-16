import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchServices } from '../../services/koiService';

export const getServices = createAsyncThunk('services/getServices', async () => {
    const services = await fetchServices(); 
    return services; 
});

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        selectedService: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        selectService(state, action) {
            state.selectedService = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services = action.payload;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { selectService } = serviceSlice.actions; 
export default serviceSlice.reducer;
