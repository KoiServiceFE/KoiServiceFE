import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serviceReducer from './slices/serviceSlice';
import vetReducer from './slices/vetSlice'
import bookingReducer from './slices/bookingSlice';
import paymentReducer from './slices/paymentSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    vets: vetReducer,
    booking:bookingReducer,
    payment: paymentReducer,
  },
});

export default store;
