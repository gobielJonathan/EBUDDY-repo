import { User } from "@ebuddy/core/entities/user";

import { createReducer } from "@reduxjs/toolkit";
import { getUsersRequest, loginRequest, registerRequest } from "./actions";

interface BaseState {
  isLoading: boolean;
  error: string | null;
}
// Initial State
interface AuthState extends BaseState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialAuthState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  error: null,
};

// Reducer
export const authReducer = createReducer(initialAuthState, (builder) => {
  builder
    .addCase(loginRequest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    })
    .addCase(loginRequest.rejected, (state, action) => {
      state.isLoading = false;
      if (action.meta.rejectedWithValue) {
        state.error = action.payload ?? "Custom error";
      } else {
        state.error = action.error.message ?? "Unexpected error";
      }
    })
    .addCase(registerRequest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(registerRequest.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(registerRequest.rejected, (state, action) => {
      state.isLoading = false;
      if (action.meta.rejectedWithValue) {
        state.error = action.payload ?? "Custom error";
      } else {
        state.error = action.error.message ?? "Unexpected error";
      }
    });
});

interface UsersState extends BaseState {
  users: User[];
  hasNextPage: boolean
}

const initialUserState: UsersState = {
  isLoading: false,
  users: [],
  error: null,
  hasNextPage: false
};

export const usersReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(getUsersRequest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getUsersRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload.users;
      state.hasNextPage = action.payload.hasNextPage;
    })
    .addCase(getUsersRequest.rejected, (state, action) => {
      state.isLoading = false;
      if (action.meta.rejectedWithValue) {
        state.error = action.payload ?? "Custom error";
      } else {
        state.error = action.error.message ?? "Unexpected error";
      }
    });
});
