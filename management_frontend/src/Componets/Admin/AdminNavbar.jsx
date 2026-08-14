// Restored AdminNavbar: uncommented to re-enable admin header and sidebar toggle
import React from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  const toggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-admin-sidebar"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur   transition-all lg:pl-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Admin<span className="text-indigo-600">Panel</span>
            </h1>

            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              Management System
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          >
            <FiBell className="h-4 w-4" />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Admin */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-indigo-600 text-sm font-bold text-white">
              {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-bold text-slate-800">
                {user?.fullname || "Admin User"}
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                Administrator
              </p>
            </div>

            <FiChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
