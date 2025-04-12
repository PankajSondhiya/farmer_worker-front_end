import { Axios } from "axios";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import { handleLoginFormChange } from "../Slices/auth.slice";

export const signIn = async ({ dispatch, Data, firebaseLogin, navigate }) => {
  const { email, password } = Data;

  try {
    const { data } = await AxiosInstance.post("/farmer/api/v1/auth/signin", {
      email,
      password,
    });

    await firebaseLogin(email, password);
    toast.success("Welcome to the app");
    localStorage.setItem("name", data.userName);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("userType", data.userType);
    localStorage.setItem("token", data.accessToken);
    dispatch(handleLoginFormChange({ field: "email", value: "" }));
    dispatch(handleLoginFormChange({ field: "password", value: "" }));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
  }
};
export const signUp = async ({ dispatch, Data, navigate }) => {
  try {
    const { data } = await AxiosInstance.post(
      "/farmer/api/v1/auth/signup",
      Data
    );
    toast.success("login to continue");
    window.location.reload();
  } catch (error) {
    const errorMessage = error.response.data;
    toast.error(errorMessage);
  }
};

export const handlePasswordReset =
  ({ createNewPassword, oobCode, newPassword, navigate }) =>
  async (getState, dispatch) => {
    if (oobCode && newPassword) {
      try {
        await AxiosInstance.put("/farmer/api/v1/auth/resetPassword", {
          email: localStorage.getItem("email"),
          newPassword,
        });
        await createNewPassword(oobCode, newPassword);
        toast.success("password reset successfully please login to continue");
        dispatch(navigate("/"));
      } catch (error) {
        toast.error(error?.response?.data);
      }
    }
  };
