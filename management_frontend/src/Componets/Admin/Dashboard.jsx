import { useEffect, useState } from "react";
import {
  FiDownload,
  FiPlus,
  FiArrowRight,
  FiMail,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { approveUser, deleteUser, getPendingUsers } from "../../service/adminApi";

const extractUserList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  for (const key of ["users", "pendingUsers", "data", "result"]) {
    const users = extractUserList(payload[key]);
    if (users.length > 0) return users;
  }

  return [];
};

const Dashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [approvingUserId, setApprovingUserId] = useState(null);
  const [rejectingUserId, setRejectingUserId] = useState(null);

  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        const response = await getPendingUsers();
        const users = extractUserList(response.data);

        console.log("PENDING USERS RESPONSE:", response.data);

        setPendingUsers(
          users.map((user) => {
            const name =
              user.name ||
              user.fullname ||
              user.fullName ||
              user.username ||
              user.userName ||
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              "Unknown user";
            const role = (
              user.role || user.userRole || user.userType || user.user_type || ""
            ).toLowerCase();
            const email = user.email || user.userEmail || user.emailAddress || "";

            return {
              ...user,
              id: user.id || user._id || user.userId,
              name,
              role,
              email,
              initials: name
                .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            };
          }),
        );
      } catch (error) {
        console.error("Failed to load pending users", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    setApprovingUserId(userId);

    try {
      await approveUser(userId);
      setPendingUsers((users) => users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to approve user", error);
    } finally {
      setApprovingUserId(null);
    }
  };

  const handleReject = async (userId) => {
    setRejectingUserId(userId);

    try {
      await deleteUser(userId);
      setPendingUsers((users) => users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to reject user", error);
    } finally {
      setRejectingUserId(null);
    }
  };

  return (
    <div className="space-y-6 text-neutral-900">
      {/* Section 1 */}
      <section className="rounded-2xl ">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Administration
            </p>

            <h1 className="text-2xl font-semibold tracking-tight">
              User Management
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Review, approve and manage all registered users.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50">
              <FiDownload size={16} />
              Export
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800">
              <FiPlus size={16} />
              Add User
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 border-t-2 border-t-[#80B500] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#80B500]">
              Priority Queue
            </p>

            <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-slate-900">
              Needs Your Attention
              <span className="rounded-full bg-[#80B500]/10 px-2 py-0.5 text-[10px] font-bold text-[#80B500]">
                {pendingUsers.length}
              </span>
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              New account requests waiting for a decision.
            </p>
          </div>

          <button className="flex items-center gap-1 text-xs font-bold text-[#80B500] transition hover:text-[#668f00]">
            View all pending
            <FiArrowRight size={15} />
          </button>
        </div>

        <div className="hidden grid-cols-[minmax(230px,1.5fr)_130px_minmax(210px,1fr)_210px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 md:grid">
          <span>User</span>
          <span>Role</span>
          <span>Email</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-neutral-100">
          {loadingUsers && (
            <p className="p-5 text-sm text-slate-500">Loading pending users...</p>
          )}

          {!loadingUsers && pendingUsers.length === 0 && (
            <p className="p-5 text-sm text-slate-500">No pending users.</p>
          )}

          {!loadingUsers && pendingUsers.map((user) => (
            <div
              key={user.id}
              className="group grid gap-4 border-b border-slate-100 p-4 transition-all last:border-b-0 hover:bg-[#80B500]/5 md:grid-cols-[minmax(230px,1.5fr)_130px_minmax(210px,1fr)_210px] md:items-center md:px-5 md:py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#80B500]/10 text-sm font-bold text-[#668f00] ring-4 ring-[#80B500]/5 transition-transform group-hover:scale-105">
                  {user.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold text-slate-900">{user.name}</h3>
                  <span className="mt-1 block truncate text-[10px] text-slate-400">
                    {user.role || "User"} · {user.email || "No email provided"}
                  </span>
                </div>
              </div>

              <div>
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-[#80B500]/10 px-2.5 py-1 text-[10px] font-bold text-[#668f00]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#80B500]" />
                  Pending
                </span>
              </div>

              <div className="hidden min-w-0 items-center gap-2 text-xs text-slate-500 md:flex">
                <FiMail className="shrink-0 text-[#80B500]" size={14} />
                <span className="truncate">{user.email || "No email provided"}</span>
              </div>

              <div className="flex gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => handleApprove(user.id)}
                  disabled={approvingUserId === user.id || rejectingUserId === user.id}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#80B500] px-3 py-2 text-[10px] font-bold text-white shadow-sm shadow-[#80B500]/20 transition hover:bg-[#668f00] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 md:flex-none"
                >
                  <FiCheck size={14} />
                  {approvingUserId === user.id ? "Approving..." : "Approve"}
                </button>

                <button
                  type="button"
                  onClick={() => handleReject(user.id)}
                  disabled={rejectingUserId === user.id || approvingUserId === user.id}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 md:flex-none"
                >
                  <FiX size={14} />
                  {rejectingUserId === user.id ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
