import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {" "}
      <div
        className="nav_bar position-sticky bg-success d-flex justify-content-between align-items-center px-2 top-0"
        style={{ zIndex: 50 }}
      >
        <h3 className="title text-dark">Kisaan Mitra</h3>
        <div className="avatar"></div>
        <button className="btn btn-dark" onClick={() => dispatch(handleLogout)}>
          logout
        </button>
      </div>
    </>
  );
};
export default Navbar;
