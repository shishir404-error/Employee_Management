import { useState } from "react";
import {
  FaHome,
  FaBox,
  FaChartLine,
  FaUsers,
  FaCog,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

// Sidebar Item Component
const SidebarItem = ({ icon, label, isOpen, isActive, onClick, badge }) => (
  <div
    className={`item ${isActive ? "active" : ""}`}
    onClick={onClick}
    title={!isOpen ? label : ""}
  >
    <div className="icon">
      {icon}
      {badge && <span className="badge">{badge}</span>}
    </div>
    {isOpen && <span className="text">{label}</span>}
  </div>
);

// Sidebar Layout Only
const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard" },
    // { icon: <FaBox />, label: "Loans", badge: "12" },
    { icon: <FaChartLine />, label: "Analytics" },
    { icon: <FaUsers />, label: "Assets Management" },
    // { icon: <FaBell />, label: "Notifications", badge: "5" },
    { icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Toggle Button */}
        <button className="toggle" onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">₹</div>
          {isOpen && <span className="logo-text">RupeeLending</span>}
        </div>

        {/* Menu */}
        <div className="menu">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              isOpen={isOpen}
              isActive={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        {/* User */}
        <div className="user">
          <div className="avatar">
            <FaUser />
          </div>
          {isOpen && (
            <div className="info">
              <div className="name">Shishir Sharma</div>
              <div className="role">Admin</div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sidebar-container {
          height: 100vh;
          background: #f0f4f8;
          position: relative;
        }

        .sidebar {
          height: 100%;
          background: #1e3a2f;
          color: white;
          display: flex;
          flex-direction: column;
          width: 240px;
          transition: width 0.3s ease;
          position: relative;
        }

        .sidebar.closed {
          width: 85px;
        }

        .toggle {
          position: absolute;
          top: 20px;
          right: -12px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e3a2f;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 1000000;
          transition: all 0.3s ease;
        }

        .toggle:hover {
          background: #f0f4f8;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1.25rem 1rem;
          margin-top: 1rem;
        }

        .logo-icon {
          background: #ffd700;
          color: #1e3a2f;
          border-radius: 8px;
          padding: 0.5rem;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .logo-text {
          font-size: 1.1rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .menu {
          flex: 1;
          padding: 0.5rem;
        }

        .item {
  display: flex;
  align-items: center;
  justify-content: center; /* default center */
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar.open .item {
  justify-content: flex-start;
}


        .item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .item.active {
          background: #ffd700;
          color: #1e3a2f;
        }

        .icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          min-width: 20px;
        }

        .text {
          margin-left: 0.75rem;
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ffd700;
          color: #1e3a2f;
          border-radius: 8px;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.1rem 0.4rem;
        }

        .user {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: #ffd700;
          color: #1e3a2f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info {
          margin-left: 0.75rem;
        }

        .name {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .role {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            z-index: 1000;
            transform: translateX(${isOpen ? "0" : "-100%"});
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
          }

          .toggle {
            right: ${isOpen ? "-12px" : "12px"};
          }
        }
      `}</style>
    </div>
  );
};

export default SidebarLayout;