import React, { useEffect, useState } from "react";
import AdminOverview from "./AdminOverview";
import AdminDashboardSideBar from "./AdminDashboardSideBar";
import VeterinarianComponent from "./VeterinarianComponent";
import PatientComponent from "./PatientComponent";

const AdminDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleNavigate = (component) => {
    setActiveContent(component);
    localStorage.setItem("activeContent", component);
  };

  useEffect(() => {
    const activeContent = localStorage.getItem("activeContent") || "overview";
    setActiveContent(activeContent);
  }, []);

  return (
    <main className="admin-body">
      <div className="grid-container">
        <AdminDashboardSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          onNavigate={handleNavigate}
          activeTab={activeContent}
        />
        <div className="main-container">
          {activeContent === "overview" && <AdminOverview />}
          {activeContent === "veterinarians" && <VeterinarianComponent />}
          {activeContent === "patients" && <PatientComponent />}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
