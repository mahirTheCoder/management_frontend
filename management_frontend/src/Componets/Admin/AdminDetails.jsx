import React from "react";

const AdminDetails = () => {
  const admin = {
    fullname: "JAKARIYA HOSSEN",
    email: "admin@example.com",
    phone: "+880 1XXX-XXXXXX",
    role: "Administrator",
    status: "Active",
    joined: "January 15, 2026",
    address: "Rajshahi, Bangladesh",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-indigo-500">
          Account Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Admin Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your administrator account and personal information.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-6 py-8 md:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                <img
                  src={admin.avatar}
                  alt={admin.fullname}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {admin.fullname}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {admin.email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {admin.role}
                  </span>

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {admin.status}
                  </span>
                </div>
              </div>
            </div>

            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Information */}
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          {/* Personal Information */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your basic account information.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.fullname}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email Address
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Phone Number
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Account Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Details about your administrator account.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.role}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account Status
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {admin.status}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Joined
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.joined}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Address
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {admin.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-slate-900">
              Security
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Keep your administrator account secure.
            </p>
          </div>

          <button className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;