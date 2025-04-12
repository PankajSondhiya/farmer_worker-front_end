import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateJob } from "../Services/farmer.service";

// Async thunk to update the job
export const updateJOb = createAsyncThunk("worker/updateJob", updateJob);

const workerSlice = createSlice({
  name: "worker",
  initialState: {
    showResponseModal: false,
    searchTerm: "",
    filteredJobList: [],
    job_id: "",
    jobToBeEdited: {},
    workerResponse: {
      workerId: "",
      responseText: "",
    },
  },
  reducers: {
    setShowResponseModal(state, action) {
      state.showResponseModal = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilteredJobList(state, action) {
      state.filteredJobList = action.payload;
    },
    setJob_Id(state, action) {
      state.job_id = action.payload;
    },
    setJobToBeEdited(state, action) {
      state.jobToBeEdited = action.payload;
    },
    setWorkerResponse(state, { payload }) {
      state.workerResponse.responseText = payload.value;
      state.workerResponse.workerId = payload.workerId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateJOb.fulfilled, (state, action) => {
      const updatedJob = action.payload;

      state.filteredJobList = state.filteredJobList.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );
    });
  },
});

export const {
  setShowResponseModal,
  setSearchTerm,
  setFilteredJobList,
  setJob_Id,
  setJobToBeEdited,
  setWorkerResponse,
} = workerSlice.actions;

export default workerSlice.reducer;
