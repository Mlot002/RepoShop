import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(state.products);
      const index = state.products.findIndex((item) => {
        const x = { ...item };
        return x._id === action.payload._id;
      });
      console.log(index);
      if (index !== -1) {
        state.products[index].quantity += 1;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price;
    },
  },
});
export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
