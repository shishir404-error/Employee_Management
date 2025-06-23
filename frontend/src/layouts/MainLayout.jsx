import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
// import "./Layout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
