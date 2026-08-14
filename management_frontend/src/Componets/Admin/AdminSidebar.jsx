import { useEffect, useState } from "react";
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
  FiChevronLeft,
} from "react-icons/fi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-admin-sidebar", toggleSidebar);

    return () => {
      window.removeEventListener("toggle-admin-sidebar", toggleSidebar);
    };
  }, []);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: FiGrid,
    },
    {
      name: "Admin Profile",
      path: "/admin/profile",
      icon: FiUser,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: FiUsers,
    },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: FiBookOpen,
    },
    {
      name: "Pending Users",
      path: "/admin/pending-users",
      icon: FiClock,
    },
    {
      name: "Approved Users",
      path: "/admin/approved-users",
      icon: FiCheckCircle,
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Admin<span className="text-indigo-600">Panel</span>
            </h2>

            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-slate-400">
              Control Center
            </p>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-lg px-3 py-2.5
                    text-xs font-semibold transition-all
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            System
          </p>

          <div className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-lg px-3 py-2.5
                    text-xs font-semibold transition-all
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-200 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Desktop Collapse Indicator */}
        <div className="absolute -right-3 top-20 hidden lg:block">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <FiChevronLeft className="h-3 w-3 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;