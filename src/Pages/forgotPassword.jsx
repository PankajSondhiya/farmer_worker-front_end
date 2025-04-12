import { useDispatch, useSelector } from "react-redux";
import { useFireBase } from "../Firebase/firebase.config";
import { setRegisteredEmail } from "../Slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Components/loader"; // assuming you already have a loader component

const ForgotPassword = () => {
  const { resetPassword } = useFireBase();
  const { registeredEmail } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function sendVerficationEmail(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(registeredEmail);
      localStorage.setItem("email", registeredEmail);
      setIsSent(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="vh-100 bg-success" style={{}}>
        <div className="h-100 w-100 forgot-pasword d-flex justify-content-center align-items-center">
          <div
            className="card p-3 d-flex justify-content-center align-items-center"
            style={{ minWidth: "300px" }}
          >
            <h4 className="mb-3">Forgot password</h4>

            {isSent ? (
              <div className="text-success text-center fw-bold">
                Verification link sent to your registered email.
              </div>
            ) : (
              <form onSubmit={sendVerficationEmail} className="w-100">
                <div className="w-100 d-flex flex-column mb-2">
                  <h6 className="text-start mb-2">Registered email</h6>
                  <input
                    className="form-control mb-2"
                    name="registered email"
                    value={registeredEmail}
                    placeholder="Enter your registered email"
                    onChange={(event) =>
                      dispatch(setRegisteredEmail(event.target.value))
                    }
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Send verification email"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
