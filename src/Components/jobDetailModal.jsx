import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobList,
  setShowJobDetailModal,
  updateJOb,
} from "../Slices/farmer.slice";
import { useState, useEffect } from "react";

const JobDetailsModal = () => {
  const dispatch = useDispatch();
  const { showJobDetailModal, selectedJob } = useSelector(
    (store) => store.farmer
  );
  const [status, setStatus] = useState(selectedJob?.jobStatus || "");

  useEffect(() => {
    if (selectedJob) {
      setStatus(selectedJob.jobStatus);
    }
  }, [selectedJob]);

  if (!selectedJob) return null;

  const handleStatusUpdate = () => {
    dispatch(updateJOb({ job_id: selectedJob._id, jobStatus: status }))
      .unwrap()
      .then(() => {
        dispatch(fetchJobList());
        dispatch(setShowJobDetailModal(false));
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const modalStyles = {
    backgroundColor: "#1e1e1e",
    color: "#f0f0f0",
  };

  const labelStyle = { color: "#cfcfcf" };

  return (
    <Modal
      show={showJobDetailModal}
      onHide={() => dispatch(setShowJobDetailModal(false))}
      centered
      contentClassName="dark-modal"
    >
      <Modal.Header
        closeButton
        style={{ ...modalStyles, borderBottom: "1px solid #444" }}
        closeVariant="white"
      >
        <Modal.Title style={{ color: "#ffffff" }}>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyles}>
        <p>
          <strong style={labelStyle}>Job Name:</strong> {selectedJob.jobName}
        </p>
        <p>
          <strong style={labelStyle}>Employer:</strong>{" "}
          {selectedJob.employer?.name || selectedJob.employer?.email}
        </p>
        <p>
          <strong style={labelStyle}>Location:</strong> {selectedJob.location}
        </p>
        <p>
          <strong style={labelStyle}>Date:</strong> {selectedJob.date}
        </p>
        <p>
          <strong style={labelStyle}>Contact:</strong>{" "}
          {selectedJob.contactDetails}
        </p>
        <p>
          <strong style={labelStyle}>Description:</strong>{" "}
          {selectedJob.description}
        </p>
        <p>
          <strong style={labelStyle}>Workers Required:</strong>{" "}
          {selectedJob.workersRequired}
        </p>
        <p>
          <strong style={labelStyle}>Status:</strong>{" "}
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              backgroundColor: "#2a2a2a",
              color: "#fff",
              border: "1px solid #555",
            }}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
          </Form.Select>
        </p>

        {selectedJob.workerResponses?.length > 0 && (
          <>
            <hr style={{ borderColor: "#555" }} />
            <p>
              <strong style={{ ...labelStyle, fontSize: "1.1rem" }}>
                Worker Responses:
              </strong>
            </p>
            <ul style={{ paddingLeft: "1rem", listStyleType: "circle" }}>
              {selectedJob.workerResponses.map((res, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#ccc" }}>{res.responseText}</span>
                  <br />
                  <small style={{ color: "#888" }}>
                    Responded on:{" "}
                    {new Date(res.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </small>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ ...modalStyles, borderTop: "1px solid #444" }}>
        <Button
          variant="success"
          onClick={handleStatusUpdate}
          disabled={status === selectedJob.jobStatus}
        >
          Update Status
        </Button>
        <Button
          variant="secondary"
          onClick={() => dispatch(setShowJobDetailModal(false))}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailsModal;
