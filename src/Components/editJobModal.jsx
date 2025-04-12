import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowJobModal,
  setJobDetails,
  updateJOb,
} from "../Slices/farmer.slice";

const JobEditModal = () => {
  const dispatch = useDispatch();
  const { showJobModal, jobDetails } = useSelector((store) => store.farmer);

  const handleChange = (field, value) => {
    dispatch(setJobDetails({ field, value }));
  };

  const handleSave = () => {
    dispatch(updateJOb({ id: jobDetails._id, data: jobDetails }));
    dispatch(setShowJobModal(false));
  };

  return (
    <Modal
      show={showJobModal}
      onHide={() => dispatch(setShowJobModal(false))}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2">
          <label>Job Name</label>
          <input
            type="text"
            className="form-control"
            value={jobDetails.jobName}
            onChange={(e) => handleChange("jobName", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Workers Required</label>
          <input
            type="number"
            className="form-control"
            value={jobDetails.workersRequired}
            onChange={(e) => handleChange("workersRequired", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Contact Details</label>
          <input
            type="text"
            className="form-control"
            value={jobDetails.contactDetails}
            onChange={(e) => handleChange("contactDetails", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={jobDetails.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={jobDetails.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea
            rows="3"
            className="form-control"
            value={jobDetails.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(setShowJobModal(false))}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobEditModal;
