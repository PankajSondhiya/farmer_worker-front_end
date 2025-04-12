import firebase from "firebase/compat/app";
// import { setUserInfo } from "../Slices/admin.slice";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  try {
    const { data } = await AxiosInstance.get("/admin/api/v1/users");
    // const token = await firebase.auth().currentUser.getIdToken();
    // console.log(token);/
    toast.success("users fetched successfully");
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};
export const getUserById = async ({ id }) => {
  try {
    const { data } = await AxiosInstance.get(`/admin/api/v1/users/${id}`);
    // setUserInfo({
    //   userId: "data.userId",
    //   name: data.name,
    //   email: data.email,
    //   photoUrl: data.photoUrl,
    // });
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export const deleteUserbyId = async ({ id, firebaseUid }) => {
  try {
    await AxiosInstance.delete(`/admin/api/v1/users/${id}`, {
      data: { UID: firebaseUid },
    });

    toast.success("user deleted successfully");
    return id;
  } catch (error) {
    toast.error("error occured");
  }
};
export const updateUserById = async ({ id, Data }) => {
  try {
    const { data } = await AxiosInstance.put(`/admin/api/v1/users/${id}`, Data);
    toast.success("users updated  successfully");
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export async function fetchAllJobs() {
  try {
    const { data } = await AxiosInstance.get("/farmer/api/v1/jobs/");

    return data;
  } catch (error) {
    toast.success("error occurred");
  }
}
