import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowUserModal,
  updateUser,
  updateUserInfo,
} from "../Slices/admin.slice";

const UserModal = () => {
  const { showUserModal, userInfo } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  return (
    <Modal
      show={showUserModal}
      onHide={() => dispatch(setShowUserModal(false))}
      centered
      backdrop="static"
      contentClassName="bg-dark text-light"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={(event) =>
              dispatch(
                updateUserInfo({
                  field: "name",
                  value: event.target.value,
                })
              )
            }
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input
            type="text"
            name="userId"
            value={userInfo.userId}
            onChange={(event) =>
              dispatch(
                updateUserInfo({
                  field: "userId",
                  value: event.target.value,
                })
              )
            }
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={(event) =>
              dispatch(
                updateUserInfo({
                  field: "email",
                  value: event.target.value,
                })
              )
            }
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>
        {localStorage.getItem("userType") === "ADMIN" && (
          <div className="mb-3">
            <label className="form-label">User Status</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              name="userStatus"
              value={userInfo.userStatus}
              onChange={(event) =>
                dispatch(
                  updateUserInfo({
                    field: "userStatus",
                    value: event.target.value,
                  })
                )
              }
              required
            >
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="secondary"
          onClick={() => dispatch(setShowUserModal(false))}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            dispatch(updateUser({ id: userInfo._id, Data: userInfo }))
          }
        >
          Edit User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
