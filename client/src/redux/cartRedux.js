import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = [...action.payload.products];
      state.total = action.payload.total;
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Cart
    addToCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addToCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = [...action.payload.products];
      state.total = action.payload.total;
    },
    addToCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DeleteCart
    deleteCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCartSuccess: (state) => {
      state.isFetching = false;
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    deleteCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
