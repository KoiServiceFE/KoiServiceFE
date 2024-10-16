  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import { LoginUser, CreateUser, GetUserById, UpdateUser } from "../../services/userService";

  export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await LoginUser(userData);
    return response;
  });

  export const register = createAsyncThunk('auth/register', async (userData) => {
    const response = await CreateUser(userData);
    return response;
  });

  export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (userId) => {
    const response = await GetUserById(userId);
    return response.userData; 
  });

  export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async ({ id, ...userData }) => {
    const response = await UpdateUser({ id, ...userData });
    return response; 
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: localStorage.getItem("token") || null,
      userId: localStorage.getItem("userId") || null,
      username: localStorage.getItem("username") || null,
      userProfile: null,
      isLoading: false,
      error: null,
    },
    reducers: {
      logout: (state) => {
        state.token = null;
        state.userId = null;
        state.username = null;
        state.userProfile = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.token = action.payload.accessToken;
          state.userId = action.payload.userInfo.userID;
          state.username = action.payload.userInfo.username;
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("userId", action.payload.userInfo.userID);
          localStorage.setItem("username", action.payload.userInfo.username);
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state) => {
          state.isLoading = false;
          state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(fetchUserProfile.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userProfile = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(updateUserProfile.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          if (action.payload.username !== state.username) {
            state.username = action.payload.username;
            localStorage.setItem("username", action.payload.username); 
          }
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
    
  });

  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
