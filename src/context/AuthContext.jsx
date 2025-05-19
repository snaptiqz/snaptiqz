import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [user, setUser] = useState(null);

  //  Session fetch
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

  //  Load session on mount
  useEffect(() => {
    fetchSession();
  }, []);

  //  Signup
  const register = async ({ email, password, name, imageUrl }) => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/sign-up/email`,
        { email, password, name, imageUrl },
        { withCredentials: true }
      );

      // Immediately fetch session (cookie is set)
      const sessionUser = await fetchSession();

      if (sessionUser) {
        toast.success("Signup successful!", { icon: false });
        setJustSignedUp(true);
        navigate("/welcome");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.", { icon: false });
    }
  };

 
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
        navigate("/welcome");
      } else {
        toast.error("Login failed to establish session.", { icon: false });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.", { icon: false });
    }
  };


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
      navigate("/login");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
