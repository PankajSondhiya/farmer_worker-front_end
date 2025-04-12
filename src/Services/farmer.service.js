import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { Axios } from "axios";
import { setJobDetails } from "../Slices/farmer.slice";

export const createNewJob = async ({ dispatch, jobDetails }) => {
  try {
    const { data } = await AxiosInstance.post(
      "/farmer/api/v1/job/create",
      jobDetails
    );
    toast.success("Job create successfully");

    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
};
export const updateJob = async ({ job_id, ...updatePayload }) => {
  try {
    const { data } = await AxiosInstance.put(
      `/farmer/api/v1/job/${job_id}`,
      updatePayload
    );

    toast.success("Job updated successfully");
    console.log("Updated Job:", data);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
    throw error; // important for Redux .unwrap() or catch
  }
};

export const deleteJob = async (id) => {
  try {
    await AxiosInstance.delete(`/farmer/api/v1/job/${id}`);
    toast.success(`job deleted `);
    return id;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export async function getAllJobs() {
  try {
    const { data } = await AxiosInstance.get("/farmer/api/v1/jobs/");
    return data;
  } catch (error) {
    console.log(error);
  }
}
