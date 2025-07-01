import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const SidebarItem = ({ icon, label, isOpen, isActive }) => (
  <div
    className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 
      ${isActive ? "bg-yellow-400 text-green-900" : "hover:bg-white/10"}
      ${isOpen ? "justify-start" : "justify-center"}`}
    title={!isOpen ? label : ""}
  >
    <div className="relative text-lg">{icon}</div>
    {isOpen && <span className="ml-3 text-sm font-medium whitespace-nowrap">{label}</span>}
  </div>
);

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUsers />, label: "Assets Management", path: "/assets" },
  ];

  return (
    <div className="h-screen flex flex-col bg-green-950 text-white relative transition-all duration-300" style={{ width: isOpen ? 240 : 85 }}>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 -right-3 w-8 h-8 bg-white text-green-900 rounded-full shadow flex items-center justify-center z-50"
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 p-5">
        <div className="bg-yellow-400 text-green-900 rounded-md p-2 font-bold text-lg">₹</div>
        {isOpen && (
          <div className="bg-white rounded p-1">
            <img src={logo} alt="Logo" className="w-32" />
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 px-2">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className="no-underline text-inherit">
            <SidebarItem
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              isActive={location.pathname === item.path}
            />
          </Link>
        ))}
      </div>

      {/* User */}
      <div className="flex items-center border-t border-white/20 bg-white/5 p-4">
        <div className="w-8 h-8 bg-yellow-400 text-green-900 rounded-full flex items-center justify-center">
          <FaUser />
        </div>
        {isOpen && (
          <div className="ml-3">
            <div className="text-sm font-semibold">Shishir Sharma</div>
            <div className="text-xs opacity-80">Admin</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;
