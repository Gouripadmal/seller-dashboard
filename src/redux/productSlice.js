import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },

    setProductStatus: (state, action) => {
      state.status = action.payload;
    },

    setProductError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    clearProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setProductStatus,
  setProductError,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;