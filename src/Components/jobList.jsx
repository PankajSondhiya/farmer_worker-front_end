import { useDispatch, useSelector } from "react-redux";
import TableHeader from "./TableHeader";
import { fetchJobs, setFilteredData } from "../Slices/admin.slice";
import { useEffect } from "react";
import { setSelectedJob, setShowJobDetailModal } from "../Slices/farmer.slice";
import JobDetailsModal from "./jobDetailModal";
import { setSearchTerm } from "../Slices/worker.slice";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobData, filteredData } = useSelector((store) => store.admin);

  function handleSearch(term) {
    if (term === "") {
      dispatch(fetchJobs());
    }
    if (filteredData) {
      const filtered = filteredData.filter((job) =>
        job?.jobName?.toLowerCase().includes(term.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (jobData?.data) {
      let filtered = jobData?.data;

      if (localStorage.getItem("userType") === "FARMER") {
        filtered = jobData?.data.filter(
          (job) => job?.employer?._id === localStorage.getItem("user_id")
        );
      }

      dispatch(setFilteredData(filtered));
    }
  }, [dispatch, jobData]);

  return (
    <>
      <TableHeader title="Job Table" onSearch={handleSearch} />
      <div className="tables" style={{ zIndex: "0" }}>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Job Name</th>
              <th scope="col">Employer</th>
              <th scope="col">Location</th>
              <th scope="col">Workers Required</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((job, index) => (
              <tr
                key={index}
                onClick={() => {
                  if (
                    localStorage.getItem("userType") === "FARMER" ||
                    localStorage.getItem("userType") === "ADMIN"
                  ) {
                    dispatch(setSelectedJob(job));
                    dispatch(setShowJobDetailModal(true));
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <th scope="row">{index + 1}</th>
                <td>{job?.jobName}</td>
                <td>
                  {typeof job?.employer === "object"
                    ? job.employer?.name || job.employer?.email
                    : job.employer}
                </td>
                <td>{job?.location}</td>
                <td>{job?.workersRequired}</td>
                <td
                  className={
                    job.jobStatus === "ACTIVE" ? "text-warning" : "text-success"
                  }
                >
                  {job?.jobStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <JobDetailsModal />
      </div>
    </>
  );
};

export default JobList;
