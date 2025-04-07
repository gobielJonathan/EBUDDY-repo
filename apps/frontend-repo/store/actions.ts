import { User } from "@ebuddy/core/entities/user";

import Cookies from 'js-cookie'
import { editUser, getUsers, login, register } from "@/api/user";
import { STORAGE_USER_TOKEN } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Actions
export const loginRequest = createAsyncThunk<
  { user: { email: string }; token: string },
  {
    email: string;
    password: string;
  },
  { rejectValue: string }
>("auth/loginRequest", async (payload, { rejectWithValue }) => {
  try {
    const request = await login(payload.email, payload.password);
    if (!request.ok) {
        const errText = (await request.json())?.message 
      throw new Error(errText);
    }

    const response = await request.json();

    Cookies.set(STORAGE_USER_TOKEN, response.token);

    return {
      token: response.token,
      user: { email: response.user.email },
    };
  } catch (error) {
    return rejectWithValue(error.message || "Login failed");
  }
});

export const registerRequest = createAsyncThunk<
  { user: { email: string }; token: string },
  {
    email: string;
    password: string;
  },
  { rejectValue: string }
>("auth/registerRequest", async (payload, { rejectWithValue }) => {
  try {
    const request = await register(payload.email, payload.password);

    if (!request.ok) {
        throw new Error(await request.text());
    }
    const response = await request.json();

    return {
      token: response.token,
      user: { email: response.user.email },
    };
  } catch (error) {
    return rejectWithValue(error.message || "Register failed");
  }
});


export const getUsersRequest = createAsyncThunk("user/get-users", async (_, { rejectWithValue }) => {
  try {
    const request = await getUsers()

    if (!request.ok) {
        throw new Error(await request.text());
    }
    const response : {
      hasNextPage: boolean
      users: User[];
    } = await request.json();

    const {hasNextPage, users = []} = response
    return {users, hasNextPage};
  } catch (error) {
    return rejectWithValue(error.message || "Register failed");
  }
});
  
  export const editUsersRequest = createAsyncThunk<User[], User>("user/edit-users", async (payload, { rejectWithValue, dispatch }) => {
    try {
      const request = await editUser(payload)
  
      if (!request.ok) {
          throw new Error(await request.text());
      }
      const response = await request.json();
  
      dispatch(getUsersRequest())
      return response as User;
    } catch (error) {
      return rejectWithValue(error.message || "Register failed");
    }
  });

  
