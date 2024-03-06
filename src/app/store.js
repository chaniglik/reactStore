import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../features/order/CartSlice"
import userSlice from "../features/user/userSlice";
export  const store = configureStore({
    reducer: {
        myCart: CartSlice,
        user:userSlice,
       
    }
})