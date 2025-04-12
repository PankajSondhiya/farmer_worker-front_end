import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewJob,
  getAllJobs,
  updateJob,
} from "../Services/farmer.service";

// Thunks
export const createJob = createAsyncThunk("createJob", createNewJob);
export const fetchJobList = createAsyncThunk("getJobPostedByUser", getAllJobs);
export const updateJOb = createAsyncThunk("updateJob", updateJob);

const farmerSlice = createSlice({
  name: "farmer",
  initialState: {
    showJobModal: false,
    selectedJob: null,
    showJobDetailModal: false,
    jobDetails: {
      employer: localStorage.getItem("user_id"),
      jobName: "",
      date: "",
      contactDetails: "",
      location: "",
      workersRequired: "",
      description: "",
      workerResponses: [],
    },
    postingJob: {
      data: {},
      isError: false,
      isLoading: false,
    },
    jobsList: {
      data: [],
      isLoading: false,
      isError: false,
    },
    isJobEditTrue: false,
  },
  reducers: {
    setShowJobModal(state, action) {
      state.showJobModal = action.payload;
    },
    setJobDetails(state, { payload }) {
      const { field, value } = payload;
      state.jobDetails[field] = value;
    },
    setIsJobEditTrue(state, { payload }) {
      state.isJobEditTrue = payload.value;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setShowJobDetailModal: (state, action) => {
      state.showJobDetailModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create job
    builder.addCase(createJob.pending, (state) => {
      state.postingJob.isLoading = true;
      state.postingJob.isError = false;
      state.postingJob.data = {};
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.postingJob.isLoading = false;
      state.postingJob.isError = false;
      state.postingJob.data = action.payload;
    });
    builder.addCase(createJob.rejected, (state) => {
      state.postingJob.isLoading = false;
      state.postingJob.isError = true;
      state.postingJob.data = {};
    });

    builder.addCase(fetchJobList.pending, (state) => {
      state.jobsList.isLoading = true;
      state.jobsList.isError = false;
      state.jobsList.data = [];
    });
    builder.addCase(fetchJobList.fulfilled, (state, action) => {
      state.jobsList.isLoading = false;
      state.jobsList.isError = false;
      state.jobsList.data = action.payload;
    });
    builder.addCase(fetchJobList.rejected, (state) => {
      state.jobsList.isLoading = false;
      state.jobsList.isError = true;
      state.jobsList.data = [];
    });

    builder.addCase(updateJOb.fulfilled, (state, action) => {
      const updatedJob = action.payload;
      state.jobsList.data = state.jobsList.data.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );
    });
  },
});

export const {
  setShowJobModal,
  setJobDetails,
  setIsJobEditTrue,
  setSelectedJob,
  setShowJobDetailModal,
} = farmerSlice.actions;

export default farmerSlice.reducer;
