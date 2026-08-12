import { createContext, useContext, useState, useEffect } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------- Get Profile ----------
  const getProfile = async () => {
    try {
      const res = await api.get("/auth/getProfile");

      setUser(res.data.user);
    } catch (error) {
      // User is not logged in
      if (error.response?.status === 401) {
        setUser(null);
        return;
      }

      console.error("Error fetching profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};