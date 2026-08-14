import React from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../Admin/Sidebar";
import AdminNavbar from "../Admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ১. ফিক্সড সাইডবার (Fixed Left) */}
      <AdminSidebar />

      {/* ২. ফিক্সড ন্যাভবার (Fixed Top & Desktop Offset) */}
      {/* lg:pl-72 এর কারণে এটি ডেক্সটপে সাইডবারের পাশ থেকে শুরু হবে */}
      <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300 lg:pl-72">
        <AdminNavbar />
      </header>

      {/* ৩. মূল পেজ কন্টেন্ট এরিয়া */}
      {/* pt-16 (ন্যাভবারের জন্য জায়গা), lg:pl-72 (সাইডবারের জন্য জায়গা) */}
      <main className="min-h-screen pt-16 transition-all duration-300 lg:pl-72">
        <div className="p-6">
          {/* সব পেজ কন্টেন্ট (যেমন AdminDetails) এখানে লোড হবে এবং সুন্দরভাবে স্ক্রোল হবে */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;