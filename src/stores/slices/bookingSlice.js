import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBookingWithRandomVetService, createBookingService } from '../../services/koiService'; 

export const createBooking = createAsyncThunk(
    'booking/createBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await createBookingService(bookingData); 
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const createBookingWithRandomVet = createAsyncThunk(
    'booking/createBookingWithRandomVet',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await createBookingWithRandomVetService(bookingData); 
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBookingWithRandomVet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBookingWithRandomVet.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload;
            })
            .addCase(createBookingWithRandomVet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingSlice.reducer;
