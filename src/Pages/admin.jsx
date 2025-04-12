import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import "./worker.css";
import { Suspense, useState } from "react";
import Loader from "../Components/loader";
import UsersList from "../Components/UsersTable";
import JobList from "../Components/jobList";
const Admin = () => {
  const [activeTable, setActiveTable] = useState(1);

  const renderTable = () => {
    switch (activeTable) {
      case 1:
        return <Suspense fallback={<Loader />}>{<UsersList />}</Suspense>;
      case 2:
        return <Suspense fallback={<Loader />}>{<JobList />}</Suspense>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mvh-100 w-100 bg-dark">
        <Navbar />
        <div className="w-100 h-100 p-1 d-flex  justify-content-center align-items-center ">
          <div className="container-fluid  row  bg-dark w-100 mvh-100  position-relative">
            <div className="side_bar bg-dark col-sm-3  p-2  shadow">
              <div className="filter_by d-flex flex-column p-1 text-start top-0">
                <button
                  className="btn btn-success mb-2"
                  onClick={() => setActiveTable(1)}
                >
                  User's
                </button>
                <button
                  className="btn btn-success mb-3"
                  onClick={() => setActiveTable(2)}
                >
                  Jobs
                </button>
              </div>
            </div>
            <div className="col-sm-9 mvh-200 z-1 ">
              <div
                className="main_data d-flex flex-column p-3"
                style={{ width: "100%" }}
              >
                <div className="title mx-auto">
                  <h2 className="text-light">{`Welcome  ${localStorage.getItem(
                    "name"
                  )}!`}</h2>
                </div>

                <div className="mx-auto text-light">
                  Take a look on your stats
                </div>
                <div className="my-5">{renderTable()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
