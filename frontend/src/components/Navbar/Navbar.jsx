import {
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaChevronDown,
  FaEye,
} from "react-icons/fa";
import "./Navbar.css"; // Make sure your CSS file is linked

const Navbar = () => {
  const user = {
    name: "Shishir Sharma",
  };



  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


  return (
    <div className="navbar">
      <div className="navbar-right">
  

        <div className="user-dropdown">
          <div className="user-profile" tabIndex={0}>
            <div className="user-avatar">
              <FaUserCircle size={32} />
            </div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">Admin</span>
            </div>
            <FaChevronDown size={12} className="dropdown-arrow" />
          </div>

          {/* Dropdown on Hover */}
          <div className="user-menu">
            <div className="menu-header">
              <span className="user-name">{user.name}</span>
              <span className="user-role"> &nbsp; AD.</span>
            </div>
            <button className="user-action">
              <FaEye size={14} /> View Profile
            </button>
            <button  className="user-action" onClick={handleLogout}>
              <FaSignOutAlt size={14} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
