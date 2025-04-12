import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleLoginFormChange,
  handleSignupFormChange,
  login,
  register,
  setIsPasswordVisible,
  setIsSignUp,
} from "../Slices/auth.slice";
import { useFireBase } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";
import Loader from "../Components/loader";
const Auth = () => {
  const {
    loginFormValues,
    signupFormValues,
    isSignUp,
    isPasswordVisible,
    loginData,
  } = useSelector((store) => store.auth);
  const { firebaseLogin, firebaseSignUp } = useFireBase();
  const { data, isError, isLoading } = loginData;
  const [isSignupLoading, setIsSignUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSignUploading(true);
    try {
      if (isSignUp) {
        await dispatch(
          register({
            dispatch,
            Data: signupFormValues,
            navigate,
            firebaseSignUp,
          })
        );
      } else {
        await dispatch(
          login({
            dispatch,
            Data: loginFormValues,
            navigate,
            firebaseLogin,
          })
        );
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsSignUploading(false);
    }
  }

  if (localStorage.getItem("token")) {
    switch (localStorage.getItem("userType")) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "FARMER":
        navigate("/farmer");
        break;
      case "WORKER":
        navigate("/worker");
        break;
      default:
        navigate("/");
    }
  }

  return (
    <>
      <div className="auth-container vh-100">
        <div className="login-container h-100  d-flex flex-column justify-content-center align-items-center">
          <div className="card bg-light shadow-lg  p-2 d-flex flex-column justify-content-center align-items-center">
            <h2 className="title mb-2">{isSignUp ? "Register" : "Login"}</h2>

            <form onSubmit={handleSubmit} className="w-100">
              {!isSignUp ? (
                <>
                  {" "}
                  <div className="w-100 d-flex flex-column mb-2">
                    <input
                      value={loginFormValues.email}
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="enter your email"
                      onChange={(event) =>
                        dispatch(
                          handleLoginFormChange({
                            field: "email",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="d-flex flex-column mb-2 ">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={loginFormValues.password}
                      name="password"
                      className="form-control"
                      placeholder="enter your password"
                      onChange={(event) =>
                        dispatch(
                          handleLoginFormChange({
                            field: "password",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                    <div
                      className="icon position-absolute"
                      style={{
                        right: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(setIsPasswordVisible())}
                    >
                      {isPasswordVisible ? <BiShow /> : <BiHide />}
                    </div>
                    <div
                      className="text-primary mt-1 text-end fs-6 cursor-pointer"
                      onClick={() => navigate("/forgotpassword")}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot password?
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex flex-column mb-2">
                    {/* <div className="text-start bold mb-1 fw-bold">Name</div> */}
                    <input
                      type="text"
                      value={signupFormValues.name}
                      className="form-control"
                      placeholder="enter your name"
                      onChange={(event) =>
                        dispatch(
                          handleSignupFormChange({
                            field: "name",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="d-flex flex-column mb-2">
                    {/* <div className="text-start bold mb-1 fw-bold">UserId</div> */}
                    <input
                      type="text"
                      name="userId"
                      value={signupFormValues.userId}
                      className="form-control"
                      placeholder="enter your userId"
                      onChange={(event) =>
                        dispatch(
                          handleSignupFormChange({
                            field: "userId",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="d-flex flex-column mb-2">
                    {/* <div className="text-start bold mb-1 fw-bold">Email</div> */}
                    <input
                      type="text"
                      value={signupFormValues.email}
                      name="email"
                      className="form-control"
                      placeholder="enter your email"
                      onChange={(event) =>
                        dispatch(
                          handleSignupFormChange({
                            field: "email",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                  </div>

                  <div className="d-flex flex-column mb-2 position-relative">
                    {/* <div className="text-start  mb-1 fw-bold">Password</div> */}

                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      value={signupFormValues.password}
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={(event) =>
                        dispatch(
                          handleSignupFormChange({
                            field: "password",
                            value: event.target.value,
                          })
                        )
                      }
                    />
                    <div
                      className="icon position-absolute"
                      style={{
                        right: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(setIsPasswordVisible())}
                    >
                      {" "}
                      {isPasswordVisible ? <BiShow /> : <BiHide />}
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-2">
                    {/* <div className="text-start  mb-1 fw-bold">UserType</div> */}

                    <select
                      className="form-select"
                      name="userType"
                      value={signupFormValues.userType}
                      onChange={(event) =>
                        dispatch(
                          handleSignupFormChange({
                            field: "userType",
                            value: event.target.value,
                          })
                        )
                      }
                    >
                      <option value="FARMER">Farmer</option>
                      <option value="WORKER">Worker</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isSignupLoading || isLoading ? (
                  <Loader />
                ) : isSignUp ? (
                  "signup"
                ) : (
                  "login"
                )}
              </button>
              <div
                className="text-danger text-end cursor-pointer"
                onClick={() => dispatch(setIsSignUp())}
                style={{
                  right: "10px",
                  cursor: "pointer",
                }}
              >
                {isSignUp
                  ? "Already have an account?Login"
                  : "dont have an account? signup"}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
