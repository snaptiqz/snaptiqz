import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [usernameError, setUsernameError] = useState('');

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
      navigate("/");
    }
  };

 const updateProfile = async (formData) => {
  if (!user?.id) return toast.error("User ID missing");

  try {
    const res = await axios.patch(
      `${backendUrl}/user/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    toast.success("Profile updated successfully!");
    fetchSession(); // refresh user
  } catch (err) {
    toast.error(err.response?.data?.message || "Profile update failed.");
  }
};

const checkUsername = async (username) => {
  if (!username.trim()) return false;
  try {
    const res = await axios.get(`${backendUrl}/user/check-username`, {
      params: { username: username.trim() },
      withCredentials: true,
    });
    return res.data; // Backend should respond with availability status or validity
  } catch (err) {
    console.error("Username check failed:", err.message);
    return false;
  }
};


const createOrganization = async (name) => {
  if (!name.trim()) {
    toast.error("Organization name cannot be empty");
    return;
  }

  try {
    const res = await axios.post(
      `${backendUrl}/organizations/create`,
      { name: name.trim() },
      { withCredentials: true }
    );

    toast.success("Organization created successfully!");
     console.log(res.data);
    return res.data; 
    // { message, id }
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to create organization.");
    throw err;
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
        createOrganization,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
