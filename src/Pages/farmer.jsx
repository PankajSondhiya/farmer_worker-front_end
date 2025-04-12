import "./farmer.css";

import { Suspense, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { fetchJobList } from "../Slices/farmer.slice";
import Loader from "../Components/loader";
import Navbar from "../Components/navbar";
import JobForm from "../Components/jobForm";
import JobList from "../Components/jobList";

const Farmer = () => {
  const [activeTable, setActiveTable] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobList(localStorage.getItem("user_id")));
  }, [dispatch]);

  const renderTable = () => {
    switch (activeTable) {
      case 2:
        return <Suspense fallback={<Loader />}>{<JobForm />}</Suspense>;
      case 1:
        return <Suspense fallback={<Loader />}>{<JobList />}</Suspense>;
      default:
        return null;
    }
  };
  return (
    <div className="farmer_container mvh-200  w-100 bg-dark  ">
      <Navbar />
      <div className="w-100 h-100 p-1 d-flex  justify-content-center align-items-center ">
        <div className="container-fluid  row  bg-dark w-100 mvh-100  position-relative">
          <div className="side_bar col-sm-3  p-2  shadow bg-dark d-flex flex-column">
            <button
              className="btn btn-success mb-2"
              onClick={() => setActiveTable(2)}
            >
              post job
            </button>
            <button
              className="btn btn-success mb-2"
              onClick={() => setActiveTable(1)}
            >
              Job list
            </button>
          </div>
          <div className="col-sm-9 mvh-200 z-1  bg-dark">
            <div
              className="main_data d-flex flex-column p-3"
              style={{ width: "100%" }}
            >
              <div className="title mx-auto">
                <h2 className="text-light">{`Welcome  ${localStorage.getItem(
                  "name"
                )}!`}</h2>
              </div>

              <div className="mx-auto text-light">Post a new job</div>

              <div className="my-5">{renderTable()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
