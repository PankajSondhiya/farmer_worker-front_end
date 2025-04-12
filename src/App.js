import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/auth";
import Farmer from "./Pages/farmer";
import Worker from "./Pages/worker";
import Admin from "./Pages/admin";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";
import JobDetails from "./Pages/jobDetails";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/farmer" element={<Farmer />}></Route>
          <Route path="/worker" element={<Worker />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/jobdetails" element={<JobDetails />}></Route>

          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="*" element={<Auth />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
