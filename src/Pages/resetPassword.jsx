import { useDispatch, useSelector } from "react-redux";
import {
  setIsPasswordVisible,
  setNewPassword,
  setOobCode,
} from "../Slices/auth.slice";
import { BiHide, BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFireBase } from "../Firebase/firebase.config";
import { handlePasswordReset } from "../Services/auth.service";
import "./auth.css";
import Loader from "../Components/loader"; // Make sure this exists

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { createNewPassword } = useFireBase();
  const [isLoading, setIsLoading] = useState(false);

  const { isPasswordVisible, newPassword, oobCode } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("oobCode");
    if (code) {
      dispatch(setOobCode(code));
    }
  }, [location, dispatch]);

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        handlePasswordReset({
          createNewPassword,
          oobCode,
          newPassword,
          navigate,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resetPassword vh-100 bg-success">
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="card p-1 d-flex justify-content-center align-items-center">
          <h4 className="title">Create new password</h4>
          <form onSubmit={handlePasswordResetSubmit} className="w-100">
            <div className="input-group mb-3 position-relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) =>
                  dispatch(setNewPassword(event.target.value))
                }
                disabled={isLoading}
              />
              <div
                className="icon position-absolute"
                style={{
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  zIndex: "100",
                }}
                onClick={() => dispatch(setIsPasswordVisible())}
              >
                {isPasswordVisible ? <BiShow /> : <BiHide />}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
