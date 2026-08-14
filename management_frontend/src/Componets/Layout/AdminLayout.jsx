import React from "react";
import { Outlet } from "react-router";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminSidebar from "../Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>
      <Outlet />
    </>
  );
};

export default AdminLayout;
