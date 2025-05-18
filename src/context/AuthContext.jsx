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
  const [token, setToken] = useState('');

  // Load token and user from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [token, user]);

  // ✅ Signup
  const register = async ({ email, password, name, imageUrl }) => {
  try {
    const res = await axios.post(`${backendUrl}/auth/sign-up/email`, {
      email,
      password,
      name,
      imageUrl,
    });

    if (res.data.accessToken) {
      setToken(res.data.accessToken);
      setUser(res.data.user);
      toast.success("Signup successful!", { icon: false });
      setJustSignedUp(true);
      navigate("/welcome");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed.", { icon: false });
  }
};


  // ✅ Login
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${backendUrl}/auth/sign-in/email`, {
        email,
        password,
      });

      if (res.data.accessToken) {
        setToken(res.data.accessToken);
        setUser(res.data.user);
        toast.success("Login successful!",{ icon: false });
        navigate("/welcome");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.",{ icon: false });
    }
  };

  // ✅ Session fetch
  const fetchSession = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/get-session`);
      if (res.data?.user) {
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      console.error("Session fetch failed:", err.message);
    }
  };

  // ✅ Logout with API call
  const logout = async () => {
    try {
      await axios.delete(`${backendUrl}/auth/sign-out`);
    } catch (err) {
      console.warn("Sign-out request failed, clearing session locally.");
    } finally {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
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
