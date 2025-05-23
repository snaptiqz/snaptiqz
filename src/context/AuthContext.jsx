import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [justSignedUp, setJustSignedUp] = useState(() =>
    sessionStorage.getItem("justSignedUp") === "true"
  );

  // ✅ React Query: fetch session
  const useSession = () =>
    useQuery({
      queryKey: ["session"],
      queryFn: async () => {
        const res = await axios.get(`${backendUrl}/auth/get-session`, {
          withCredentials: true,
        });
        if (res.data?.user) {
          setUser(res.data.user);
          return res.data.user;
        } else {
          throw new Error("No session found");
        }
      },
      retry: false,
      refetchOnWindowFocus: false,
    });

  // get organizations
  const useOrganizations = () =>
    useQuery({
      queryKey: ["organizations"],
      queryFn: async () => {
        const res = await axios.get(`${backendUrl}/organizations`, {
          withCredentials: true,
        });
        return res.data;
      },
      onError: () => toast.error("Failed to fetch organizations"),
    });

  //  React Query: check username
  const useUsernameCheck = (username) =>
    useQuery({
      queryKey: ["checkUsername", username],
      queryFn: async () => {
        const res = await axios.get(`${backendUrl}/user/check-username`, {
          params: { username },
          withCredentials: true,
        });
        return res.data;
      },
      enabled: !!username?.trim(),
    });

  // ✅ register mutation
  const register = async ({ email, password, name, imageUrl }) => {
    try {
      await axios.post(
        `${backendUrl}/auth/sign-up/email`,
        { email, password, name, imageUrl },
        { withCredentials: true }
      );

      await queryClient.invalidateQueries(["session"]);
      toast.success("Signup successful!", { icon: false });
      setJustSignedUp(true);
      sessionStorage.setItem("justSignedUp", "true");
      navigate("/welcome");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.", { icon: false });
    }
  };

  // ✅ login mutation
  const login = async ({ email, password }) => {
    try {
      await axios.post(
        `${backendUrl}/auth/sign-in/email`,
        { email, password },
        { withCredentials: true }
      );

      await queryClient.invalidateQueries(["session"]);
      toast.success("Login successful!", { icon: false });
      setJustSignedUp(false);
      sessionStorage.removeItem("justSignedUp");
      navigate("/welcome");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.", { icon: false });
    }
  };

  //  logout
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
      queryClient.removeQueries(); // Clear all React Query caches
      navigate("/");
    }
  };
  //  profile update
  const updateProfile = async (formData) => {
    if (!user?.id) return toast.error("User ID missing");

    try {
      await axios.patch(`${backendUrl}/user/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Profile updated successfully!");
      await queryClient.invalidateQueries(["session"]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed.");
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
      await queryClient.invalidateQueries(["organizations"]);
      return res.data;
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
        justSignedUp,
        setJustSignedUp,
        register,
        login,
        logout,
        updateProfile,
        createOrganization,
        useSession,
        useOrganizations,
        useUsernameCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
