import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [justSignedUp, setJustSignedUp] = useState(() =>
    sessionStorage.getItem("justSignedUp") === "true"
  );

  // ✅ Fetch session from backend
  const fetchSession = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/get-session`, {
        withCredentials: true,
      });
      if (res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (err) {
      console.error("Session fetch failed:", err.message);
    }
  };

  // ✅ Load session on initial mount
  useEffect(() => {
    fetchSession();
  }, []);

  // ✅ Signup logic
  const register = async ({ email, password, name, imageUrl }) => {
    try {
      await axios.post(
        `${backendUrl}/auth/sign-up/email`,
        { email, password, name, imageUrl },
        { withCredentials: true }
      );

      const sessionUser = await fetchSession();
      if (sessionUser) {
        toast.success("Signup successful!", { icon: false });
        setJustSignedUp(true);
        sessionStorage.setItem("justSignedUp", "true");
        navigate("/welcome");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.", { icon: false });
    }
  };

  // ✅ Login logic
  const login = async ({ email, password }) => {
    try {
      await axios.post(
        `${backendUrl}/auth/sign-in/email`,
        { email, password },
        { withCredentials: true }
      );

      const sessionUser = await fetchSession();
      if (sessionUser) {
        toast.success("Login successful!", { icon: false });

        // reset justSignedUp if it's carried over from previous session
        setJustSignedUp(false);
        sessionStorage.removeItem("justSignedUp");

        navigate("/welcome");
      } else {
        toast.error("Login failed to establish session.", { icon: false });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.", { icon: false });
    }
  };

  // ✅ Logout logic
  const logout = async () => {
    try {
      await axios.delete(`${backendUrl}/auth/sign-out`, {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Sign-out failed on server.");
    } finally {
      setUser(null);
      setJustSignedUp(false);
      sessionStorage.removeItem("justSignedUp");
      navigate("/login");
    }
  };

  const updateProfile = async ({ name, profileImage }) => {
  if (!user?._id) return toast.error("User ID missing");

  try {
    const res = await axios.patch(
      `${backendUrl}/user/${user._id}`,
      { name, profileImage },
      { withCredentials: true }
    );

    toast.success("Profile updated successfully!");
    fetchSession(); // Refresh user state with latest data
  } catch (err) {
    toast.error(err.response?.data?.message || "Profile update failed.");
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
        fetchSession,
        justSignedUp,
        setJustSignedUp,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
