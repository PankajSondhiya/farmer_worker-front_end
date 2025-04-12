import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Firebase/firebase.config";
import TableHeader from "./TableHeader";
import {
  deleteUser,
  fetchUserById,
  fetchUsers,
  setFilteredData,
  setShowUserModal,
} from "../Slices/admin.slice";
import UserModal from "./userModal";

const UsersList = () => {
  const { userData, filteredData } = useSelector((store) => store.admin);
  const { usersList, isError, isLoading } = userData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersList) {
      dispatch(setFilteredData(usersList));
    }
    fetchCurrentUserRole();
  }, [dispatch, usersList]);

  const fetchCurrentUserRole = async () => {
    const user = auth.currentUser;

    if (user) {
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.admin;
    }
  };

  function handleSearch(term) {
    if (usersList) {
      const filtered = usersList?.filter((user) =>
        user?.name?.toLowerCase().includes(term.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }

  function lastLogin(date) {
    const lastLoginDate = new Date(date);
    return lastLoginDate?.toLocaleString();
  }

  return (
    <>
      <TableHeader title="User Table" onSearch={handleSearch} />
      <div className="tables" style={{ zIndex: "0" }}>
        <table class="table table-dark ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Usertype</th>
              <th scope="col">Userstatus</th>
              <th scope="col">last login</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th>{user?.name}</th>
                <td>{user?.email}</td>
                <td>{user?.userType}</td>
                <td>
                  {user?.userStatus === "PENDING" ? (
                    <span className="text-warning">PENDING</span>
                  ) : (
                    <span className="text-success">APPROVED</span>
                  )}
                </td>
                <td>{lastLogin(user?.lastLogin)}</td>

                <td>
                  <div className="d-flex ">
                    <RiDeleteBin6Line
                      className="mx-3"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() =>
                        dispatch(
                          deleteUser({
                            id: user?._id,
                            firebaseUid: user?.firebaseUid,
                          })
                        )
                      }
                    />
                    <FiEdit
                      style={{
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => {
                        dispatch(fetchUserById({ id: user?._id }));
                        dispatch(setShowUserModal(true));
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal />
    </>
  );
};

export default UsersList;
