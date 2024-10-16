import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serviceReducer from './slices/serviceSlice';
import vetReducer from './slices/vetSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    vets: vetReducer,
  },
});

export default store;
