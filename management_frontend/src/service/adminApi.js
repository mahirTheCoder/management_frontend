import api from "./api";

// Get all users
export const getAllUsers = () => {
  return api.get("/admin/allUserCheck");
};

// Get pending users
export const getPendingUsers = () => {
  return api.get("/admin/pending");
};

// Get all students
export const getStudents = () => {
  return api.get("/admin/students");
};

// Get all teachers
export const getTeachers = () => {
  return api.get("/admin/getTeachers");
};

// Approve user
export const approveUser = (id) => {
  return api.patch(`/admin/approved/${id}`);
};

// Delete user
export const deleteUser = (id) => {
  return api.delete(`/admin/del-user/${id}`);
};