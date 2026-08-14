// Restored AdminSidebar: uncommented navigation/footer and mobile toggle
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiUser,
  FiBookOpen,
  FiClock,
  FiCheckCircle,
  FiSettings,
  FiLogOut,
  FiX,
  FiMenu,
  FiShield,
} from "react-icons/fi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ================= MOBILE TOGGLE =================
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-admin-sidebar", handleToggle);

    return () => {
      window.removeEventListener("toggle-admin-sidebar", handleToggle);
    };
  }, []);

  // ================= CLOSE SIDEBAR =================
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // ================= MENU (সঠিক Path সহ) =================
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: FiGrid,
      end: true,
    },
    {
      name: "Admin Profile",
      path: "/",
      icon: FiUser,
    },
    {
      name: "Students",
      path: "/",
      icon: FiUsers,
    },
    {
      name: "Teachers",
      path: "/",
      icon: FiBookOpen,
    },
    {
      name: "Pending Users",
      path: "/",
      icon: FiClock,
    },
    {
      name: "Approved Users",
      path: "/",
      icon: FiCheckCircle,
    },
  ];

  // --------------- SETTINGS
  const settingsItems = [
    {
      name: "Settings",
      path: "/",
      icon: FiSettings,
    },
  ];

  return (
    <>
      {/* -------------
                    MOBILE OVERLAY
             */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/08 backdrop-blur-sm lg:hidden"
        />
      )}

   
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
                    border-r border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition-transform duration-300 ease-in-out lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <FiShield className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-[15px] font-bold tracking-tight text-slate-900">
                Admin <span className="text-indigo-600">Panel</span>
              </h1>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Control Center
              </p>
            </div>
          </div>

          {/* MOBILE CLOSE */}
          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 lg:hidden"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* MAIN NAV */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Main Menu
            </p>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[12px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                      )}

                      <Icon
                        className={`h-[17px] w-[17px] shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />

                      <span>{item.name}</span>

                      {item.name === "Pending Users" && (
                        <span className="ml-auto rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-600 ring-1 ring-amber-200">
                          Pending
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="mb-3 mt-9 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              System
            </p>
          </div>

          <div className="space-y-1">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[12px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
                      )}
                      <Icon
                        className={`h-[17px] w-[17px] ${
                          isActive ? "text-indigo-600" : "text-slate-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ADMIN FOOTER */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
              A
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-slate-800">
                Administrator
              </p>
              <p className="text-[9px] font-medium text-slate-400">
                System Admin
              </p>
            </div>
          </div>

          <button
            type="button"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-[11px] font-bold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
          >
            <FiLogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE OPEN BUTTON */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-indigo-600 lg:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default AdminSidebar;
