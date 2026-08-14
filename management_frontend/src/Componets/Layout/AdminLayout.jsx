// Restored AdminLayout: previously commented out which broke admin routing
import React from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../Admin/Sidebar";
import AdminNavbar from "../Admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
