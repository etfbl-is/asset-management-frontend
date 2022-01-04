import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assetTypeService from "../../services/assetType.service";

export const getAll = createAsyncThunk("assetTypes/getAll", () =>
  assetTypeService.getAll()
);
export const insert = createAsyncThunk(
  "assetTypes/insert",
  (assetType, { rejectWithValue }) =>
    assetTypeService.insert(assetType).catch(rejectWithValue)
);
export const update = createAsyncThunk(
  "assetTypes/update",
  (assetType, { rejectWithValue }) =>
    assetTypeService.update(assetType).catch(rejectWithValue)
);

export const remove = createAsyncThunk(
  "assetTypes/remove",
  (assetTypeId, { rejectWithValue }) =>
    assetTypeService
      .remove(assetTypeId)
      .then(() => assetTypeId)
      .catch(rejectWithValue)
);

const assetTypeSlice = createSlice({
  name: "assetTypes",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      return action.payload;
    },
    [insert.fulfilled]: (state, action) => {
      return [...state, action.payload];
    },
    [update.fulfilled]: (state, action) => {
      const data = action.payload;
      return state.map((el) => (el.id === data.id ? { ...el, ...data } : el));
    },
    [remove.fulfilled]: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});
export default assetTypeSlice.reducer;
