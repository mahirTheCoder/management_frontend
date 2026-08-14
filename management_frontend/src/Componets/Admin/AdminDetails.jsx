import { getAllUsers } from "../../service/adminApi";

const fetchUsers = async () => {
  try {
    const res = await getAllUsers();

    console.log("All Users:", res.data);
  } catch (error) {
    console.error("Get Users Error:", error);
  }
};