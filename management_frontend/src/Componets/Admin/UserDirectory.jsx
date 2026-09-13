import { useEffect, useState } from "react";
import { FiBookOpen, FiMail, FiPhone, FiRefreshCw, FiUsers } from "react-icons/fi";
import { getStudents, getTeachers } from "../../service/adminApi";

const extractUsers = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  for (const key of ["users", "students", "teachers", "data", "result"]) {
    const users = extractUsers(payload[key]);
    if (users.length > 0) return users;
  }

  return [];
};

const getUserName = (user) =>
  user.name ||
  user.fullname ||
  user.fullName ||
  user.username ||
  user.userName ||
  [user.firstName, user.lastName].filter(Boolean).join(" ") ||
  "Unnamed user";

const UserDirectory = ({ type }) => {
  const isStudent = type === "student";
  const title = isStudent ? "Students" : "Teachers";
  const description = isStudent
    ? "View and manage all registered students."
    : "View and manage all registered teachers.";
  const loadUsers = isStudent ? getStudents : getTeachers;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDirectory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await loadUsers();
      setUsers(extractUsers(response.data));
    } catch (requestError) {
      console.error(`Failed to load ${type}s`, requestError);
      setError(`Unable to load ${type}s right now.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectory();
  }, [type]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-500">User Management</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={loadDirectory}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} size={15} />
          Refresh
        </button>
      </div>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              {isStudent ? <FiUsers size={19} /> : <FiBookOpen size={19} />}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">All {isStudent ? "Student" : "Teacher"} Profile</h2>
              <p className="text-xs text-slate-500">
                {loading ? "Loading..." : `${users.length} ${type}${users.length === 1 ? "" : "s"} found`}
              </p>
            </div>
          </div>
        </div>

        {loading && <p className="py-10 text-center text-sm text-slate-500">Loading {type}s...</p>}
        {!loading && error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}
        {!loading && !error && users.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">No {type}s found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {users.map((user, index) => {
              const name = getUserName(user);
              const email = user.email || user.userEmail || user.emailAddress || "No email provided";
              const phone = user.phone || user.phoneNumber || user.mobile;
              const avatar = user.avatar || user.profileImage || user.image || user.photo;
              const department = user.department || user.subject || user.course;
              const address = user.address || user.location;
              const initials = name
                .split(" ")
                .filter(Boolean)
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={user.id || user._id || user.userId || `${name}-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div className={`bg-linear-to-r px-5 py-5 ${isStudent ? "from-indigo-50 via-white to-violet-50" : "from-emerald-50 via-white to-teal-50"}`}>
                    <div className="flex items-center gap-3">
                      {avatar ? (
                        <img src={avatar} alt={name} className="h-14 w-14 shrink-0 rounded-xl border-2 border-white object-cover shadow-md" />
                      ) : (
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-white text-base font-bold shadow-md ${isStudent ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {initials || "U"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-slate-900">{name}</h3>
                        <p className="mt-1 text-[11px] font-medium capitalize text-slate-500">{user.role || type}</p>
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold capitalize text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {user.status || "Active"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Email Address</p>
                      <p className="mt-1 truncate text-xs font-semibold text-slate-800">{email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Phone Number</p>
                      <p className="mt-1 truncate text-xs font-semibold text-slate-800">{phone || "Not provided"}</p>
                    </div>
                    {department && (
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{isStudent ? "Course" : "Department"}</p>
                        <p className="mt-1 truncate text-xs font-semibold text-slate-800">{department}</p>
                      </div>
                    )}
                    {address && (
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Address</p>
                        <p className="mt-1 truncate text-xs font-semibold text-slate-800">{address}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDirectory;