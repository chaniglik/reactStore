import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteProductFromCart: (state, action) => {
      const updatedCart = state.cart.filter(item => item._id !== action.payload);
      state.cart = updatedCart;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    addProductToCart: (state, action) => {
      const thereIs = state.cart.find(item => item._id === action.payload._id);
      if (!thereIs) {

        const updatedCart = [...state.cart, { ...action.payload, quantityOfProduct: 1 }];
        state.cart = updatedCart;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    },
    addAmountFromProductToCart: (state, action) => {
      const index = state.cart.findIndex(item => item._id === action.payload);
      if (index !== -1) {
        state.cart[index].quantityOfProduct += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    subAmountFromProductToCart: (state, action) => {
      const index = state.cart.findIndex(item => item._id === action.payload);
      if (index !== -1 && state.cart[index].quantityOfProduct !== 0) {
        state.cart[index].quantityOfProduct -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { deleteProductFromCart, addProductToCart, addAmountFromProductToCart, subAmountFromProductToCart } = CartSlice.actions;
export default CartSlice.reducer;
