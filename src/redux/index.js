import { configureStore } from "@reduxjs/toolkit";
import assetTypeSlice from "./slices/assetTypeSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    users: userSlice,
    assetTypes: assetTypeSlice,
  },
});
