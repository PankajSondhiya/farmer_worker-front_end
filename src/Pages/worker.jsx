import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import "./worker.css";
import { CiFilter } from "react-icons/ci";
import { IoLocation, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { fetchJobList, setJobDetails } from "../Slices/farmer.slice";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { MdDateRange, MdEdit } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import Loader from "../Components/loader";
import GetTimeAgo from "../Components/getTimeAgo";
import { Badge, Button, Modal } from "react-bootstrap";
import {
  setFilteredJobList,
  setJob_Id,
  setJobToBeEdited,
  setSearchTerm,
  setShowResponseModal,
  setWorkerResponse,
  updateJOb,
} from "../Slices/worker.slice";

const Worker = () => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState({
    "1day": false,
    "7days": false,
    "1month": false,
  });

  const { jobDetails } = useSelector((store) => store.farmer);
  const { data, isLoading, isError } = useSelector(
    (store) => store.farmer.jobsList
  );
  const {
    searchTerm,
    jobToBeEdited,
    filteredJobList,
    showResponseModal,
    job_id,
    workerResponse,
  } = useSelector((store) => store.worker);

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  function handleTimeRangeChange(event) {
    const { name, checked } = event.target;
    setTimeRange((prevfilter) => ({
      ...prevfilter,
      [name]: checked,
    }));
  }

  function filterJob() {
    if (!data) return [];
    if (searchTerm !== "") {
      return data.filter((job) =>
        job?.jobName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    }

    const now = new Date();

    return data.filter((job) => {
      const jobDate = new Date(job?.createdAt);
      const diff = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));

      if (timeRange["1day"] && diff <= 1) return true;
      if (timeRange["7days"] && diff <= 7) return true;
      if (timeRange["1month"] && diff <= 30) return true;
      return !timeRange["1day"] && !timeRange["7days"] && !timeRange["1month"];
    });
  }
  useEffect(() => {
    if (data && data.length > 0) {
      const filteredJobs = filterJob();
      dispatch(setFilteredJobList(filteredJobs));
    }
  }, [data, timeRange, searchTerm]);

  function handleResponseSubmit() {
    dispatch(updateJOb({ job_id, workerResponse }))
      .unwrap()
      .then(() => {
        dispatch(fetchJobList());
      });
  }

  function jobToBeEdit(job_id) {
    if (data) {
      const job = data?.find((job) => job._id === job_id);

      if (job) {
        dispatch(setJob_Id(job_id));
        const existingResponse = job?.workerResponses.find(
          (response) => response.workerId === localStorage.getItem("user_id")
        );

        dispatch(
          setWorkerResponse({
            value: existingResponse ? existingResponse.responseText : "",
            workerId: localStorage.getItem("user_id"),
          })
        );
      }
    }
  }

  return (
    <>
      <div className="mvh-100 w-100 bg-dark ">
        <Navbar />
        <div className="w-100 h-100 p-1 d-flex  justify-content-center align-items-center ">
          <div className="container-fluid  row  bg-light w-100 mvh-100  position-relative bg-dark">
            <div className="side_bar col-sm-3  p-2  shadow bg-dark">
              <div className="mt-1 mb-1 d-flex align-items-center justify-content-end bg-dark">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    dispatch(setSearchTerm(event.target.value))
                  }
                  className="form-control "
                  placeholder="Enter job name..."
                />

                <IoSearch className="position-absolute me-2" />
              </div>
              <div className="filter_by p-1 text-start top-0">
                <div className="d-flex-justifi-content-center align-items-center mb-2 text-light ">
                  <CiFilter />
                  filter job by:
                </div>
                <div className="time_range">
                  {" "}
                  <div className="form-check text-light">
                    <input
                      className="form-check-input"
                      name="1day"
                      type="checkbox"
                      checked={timeRange["1day"]}
                      onChange={handleTimeRangeChange}
                    />
                    <div>1day</div>
                  </div>
                  <div class="form-check text-light">
                    <input
                      name="7days"
                      className="form-check-input "
                      type="checkbox"
                      checked={timeRange["7days"]}
                      onChange={handleTimeRangeChange}
                    />
                    <div>1 week</div>
                  </div>
                  <div class="form-check text-light">
                    <input
                      name="1month"
                      className="form-check-input"
                      type="checkbox"
                      checked={timeRange["1month"]}
                      onChange={handleTimeRangeChange}
                    />
                    <div>1 month</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9 mvh-200 z-1 bg-dark ">
              <div className="job_list ">
                <h3 className="mt-2 z-1 text-light">
                  Recommended jobs for you
                </h3>
                {isLoading ? (
                  <Loader />
                ) : filteredJobList ? (
                  filteredJobList.map((job, index) => {
                    return (
                      <div
                        key={index}
                        className="job_posted mb-4 border-bottom border-success shadow text-start "
                      >
                        <div className="Jobname fs-5 d-flex align-items-center justify-content-between">
                          <div>
                            <strong className="fs-6  text-light">
                              {job?.jobName}
                            </strong>
                            <PiHandbagSimpleLight
                              color="white "
                              className="ms-1"
                            />
                          </div>
                          <div className="d-flex position-relative px-3">
                            {" "}
                            <div>
                              <div className="sub_heading text-light">
                                Posted
                              </div>
                              <div className="sub_heading">
                                <GetTimeAgo dateString={job?.createdAt} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="jobdate fs-6 text-light">
                          <MdDateRange color="white" />
                          <span className="content text-light">
                            {job?.date}
                          </span>
                        </div>
                        <div className="location text-light">
                          <IoLocation color="white" />
                          <span className="content text-light">
                            {job?.location}
                          </span>
                        </div>
                        <div className="job_decription border-bottom border-dark-subtle">
                          <span className="sub_heading text-light">
                            Description
                          </span>
                          <div className="content text-light">
                            {job?.description}
                          </div>
                        </div>
                        <div className="d-flex  justify-content-between align-items-center mt-1 ">
                          <div className="d-flex justify-content-center align-items-center">
                            {" "}
                            <div className="numOfWorkers  border-end border-dark-subtle me-2 ">
                              <span className="sub_heading  text-light">
                                Worker required:{" "}
                              </span>
                              <span className="content  me-1   text-light">
                                {job?.workersRequired}
                              </span>
                            </div>
                            {/* <IoCallSharp color="white" className="me-1" />
                            <div className="content  mr-1  text-light">
                              {job?.contactDetails}
                            </div> */}
                          </div>
                          <a
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="send response"
                          >
                            <MdEdit
                              color="white"
                              onClick={() => {
                                dispatch(setShowResponseModal(true));
                                jobToBeEdit(job?._id);
                              }}
                            />
                          </a>
                          <Tooltip id="my-tooltip" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  "no jobs available"
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal centered show={showResponseModal}>
          <Modal.Header className="bg-dark text-light">
            <Modal.Title>Response</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-light">
            <div className="input">
              <div className="text-light fs-6 mb-1">Response</div>
              <textarea
                name="workerResponses"
                rows={3}
                className="form-control bg-dark text-light border-secondary"
                value={workerResponse.responseText || ""}
                onChange={(event) =>
                  dispatch(
                    setWorkerResponse({
                      value: event.target.value,
                      workerId:
                        localStorage.getItem("userType") === "WORKER"
                          ? localStorage.getItem("user_id")
                          : "",
                    })
                  )
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button
              variant="secondary"
              onClick={() => dispatch(setShowResponseModal(false))}
            >
              Close
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                handleResponseSubmit();
                dispatch(setShowResponseModal(false));
                dispatch(setWorkerResponse({ value: "", workerId: "" }));
                dispatch(setJob_Id(""));
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Worker;
