import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {user}= useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
          className="logo"
        >
          <span className="logo">lamabooking</span>
        </Link>
        {user ? user.details.name : (
          <div className="navItems">
          <button className="navButton">Register</button>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
