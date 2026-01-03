import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    profileData: null,
    verifiedEmail: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setVerifiedEmail: (state, action) => {
      state.verifiedEmail = action.payload;
    },
  },
});

export const { setUserData, setProfileData, setVerifiedEmail } =
  userSlice.actions;

export default userSlice.reducer;
