import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const login = createAsyncThunk("users/login", ({ username, password }) =>
  userService.login(username, password)
);

export const authState = createAsyncThunk("users/authState", () =>
  userService.state()
);

export const getAll = createAsyncThunk("users/getAll", () => userService.getAll());

export const update = createAsyncThunk("users/update", (user, { rejectWithValue }) =>
  userService.update(user).catch(rejectWithValue)
);
export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  (user, { rejectWithValue }) =>
    userService.changeStatus(user).catch(rejectWithValue)
);
export const changeRole = createAsyncThunk(
  "users/changeRole",
  (user, { rejectWithValue }) =>
    userService.changeRole(user).catch(rejectWithValue)
);
const logoutAction = (state, action) => {
  userService.logout();
  state.authenticated = false;
  state.loading = false;
  state.users = [];
  state.user = null;
};

const onSuccessAuth = (state, action) => {
  state.authenticated = true;
  state.authenticationFailed = false;
  state.loading = false;
  state.role = action.payload.role;
  state.user = action.payload;
};

const updateElements = (arr, obj) => {
  return arr.map((el) => (el.id === obj.id ? { ...el, ...obj } : el));
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    authenticated: false,
    authenticationFailed: false,
    loading: true,
    user: null,
    role: null,
    users: [],
  },
  reducers: {
    logout: logoutAction,
  },
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.authenticationFailed = true;
      state.loading = false;
    },
    [login.fulfilled]: onSuccessAuth,
    [authState.pending]: (state, action) => {
      state.loading = true;
    },
    [authState.rejected]: (state, action) => {
      state.loading = false;
    },
    [authState.fulfilled]: onSuccessAuth,
    [update.fulfilled]: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.users = updateElements(state.users, action.payload);
    },
    [changeRole.fulfilled]: (state, action) => {
      state.users = updateElements(state.users, action.payload);
    },
    [changeStatus.fulfilled]: (state, action) => {
      state.users = updateElements(state.users, action.payload);
    },
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
