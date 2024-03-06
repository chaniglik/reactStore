import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  address:null,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
 
    userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("myUser", JSON.stringify(state.currentUser));
    },
    userOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("myUser");
      
    },
    reloadUser: (state) => {
      let u = localStorage.getItem("myUser");
      if (u) state.currentUser = JSON.parse(u);
    },
  },
});

export const { userIn, userOut,reloadUser } = userSlice.actions;
export default userSlice.reducer;



   