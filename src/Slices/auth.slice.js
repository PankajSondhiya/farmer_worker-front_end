import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FaGalacticSenate } from "react-icons/fa6";
import { signIn, signUp } from "../Services/auth.service";

export const login = createAsyncThunk("login", signIn);
export const register = createAsyncThunk("signUp", signUp);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignUp: false,
    isPasswordVisible: false,

    loginFormValues: {
      email: "",
      password: "",
    },
    loginData: {
      data: {},
      isError: "",
      isLoading: false,
    },
    signUpData: {
      data: {},
      isError: "",
      isLoading: false,
    },
    signupFormValues: {
      name: "",
      userId: "",
      email: "",
      password: "",
      userType: "WORKER",
    },
    oobCode: "",
    registeredEmail: "",
    newPassword: "",
  },

  reducers: {
    setIsSignUp(state, action) {
      state.isSignUp = !state.isSignUp;
    },
    setIsPasswordVisible(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
    handleLoginFormChange(state, { payload }) {
      const field = payload.field;
      const value = payload.value;
      state.loginFormValues[field] = value;
    },
    handleSignupFormChange(state, { payload }) {
      const field = payload.field;
      const value = payload.value;
      state.signupFormValues[field] = value;
    },
    setNewPassword(state, action) {
      state.newPassword = action.payload;
    },
    setRegisteredEmail(state, action) {
      state.registeredEmail = action.payload;
    },
    setOobCode(state, action) {
      state.oobCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loginData.isLoading = true;
      state.loginData.isError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginData.isError = false;
      state.loginData.isLoading = false;
      state.loginData.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginData.isError = true;
      state.loginData.isLoading = false;
      state.loginData.data = {};
    });
    builder.addCase(register.pending, (state, action) => {
      state.signUpData.isError = false;
      state.signUpData.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.signUpData.isError = false;
      state.signUpData.isLoading = false;
      state.signUpData.data = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.signUpData.isLoading = false;
      state.signUpData.isError = true;
      state.signUpData.data = {};
    });
  },
});

export const {
  handleLoginFormChange,
  handleSignupFormChange,
  setIsSignUp,
  setIsPasswordVisible,
  setRegisteredEmail,
  setOobCode,
  setNewPassword,
} = authSlice.actions;

export default authSlice.reducer;
