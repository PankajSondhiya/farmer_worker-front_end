import { useDispatch, useSelector } from "react-redux";
import { createJob, setJobDetails } from "../Slices/farmer.slice";
import Loader from "./loader";

const JobForm = () => {
  const dispatch = useDispatch();
  const { showJobModal, jobDetails, postingJob } = useSelector(
    (store) => store.farmer
  );
  const { isLoading, isError, data } = postingJob;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createJob({ dispatch, jobDetails }));
    dispatch(
      setJobDetails({
        field: "employer",
        value: localStorage.getItem("user_id"),
      })
    );
    dispatch(setJobDetails({ field: "jobName", value: "" }));
    dispatch(setJobDetails({ field: "date", value: "" }));
    dispatch(setJobDetails({ field: "contactDetails", value: "" }));
    dispatch(setJobDetails({ field: "location", value: "" }));
    dispatch(setJobDetails({ field: "workersRequired", value: "" }));
    dispatch(setJobDetails({ field: "description", value: "" }));
    dispatch(setJobDetails({ field: "workerResponses", value: [] }));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="row container-fluid d-flex ">
        <div className="col-sm-6 p-2">
          <div className="text-start text-light">
            <label>Job name</label>
            <input
              type="text"
              className="form-control mb-2 darkInput"
              required
              value={jobDetails.name}
              name="jobName"
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "jobName",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="text-start text-light">
            <label>Worker required</label>
            <input
              type="number"
              name="workersRequired"
              className="form-control mb-2 darkInput"
              value={jobDetails.workersRequired}
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "workersRequired",
                    value: event.target.value,
                  })
                )
              }
              required
            />
          </div>
          <div className="text-start text-light">
            <label>Contact details</label>
            <input
              type="text"
              value={jobDetails.contactDetails}
              name="contactDetails"
              className="form-control mb-2 darkInput"
              required
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "contactDetails",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="text-start text-light">
            <label>Date</label>
            <input
              type="date"
              value={jobDetails.date}
              className="form-control mb-2 darkInput"
              required
              name="date"
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "date",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>

          <div className="text-start text-light">
            <label>Location</label>
            <input
              type="text"
              value={jobDetails.location}
              name="location"
              className="form-control mb-2 darkInput"
              required
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "location",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="col-sm-6 p-2 ">
          <div className="text-start text-light">
            <label>Job decription</label>
            <textarea
              type="text"
              value={jobDetails.description}
              rows={3}
              className="form-control mb-2 darkInput"
              required
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "description",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="text-start text-light">
            <label>Workers response</label>
            <textarea
              value={jobDetails.workerResponse}
              placeholder="filled by the workers"
              disabled
              name="workerResponse"
              type="text"
              rows={3}
              className="form-control mb-2 darkInput"
              onChange={(event) =>
                dispatch(
                  setJobDetails({
                    field: "workerResponse",
                    value: event.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          {isLoading ? <Loader /> : "Post"}
        </button>
      </form>
    </>
  );
};

export default JobForm;
