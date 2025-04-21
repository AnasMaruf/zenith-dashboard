import $fetch from "@/lib/$fetch";
import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  profile: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

  async function login(value) {
    const loginResponse = await $fetch.create("/api/login", value);
    localStorage.setItem("access_token", loginResponse.data.token);
    const profileResponse = await $fetch.get("/api/user");
    setProfile(profileResponse.data);
    // navigate => dashboard
    navigate("/dashboard/setting");
  }

  async function getProfile() {
    try {
      const profileResponse = await $fetch.get("/api/user");
      setProfile(profileResponse.data);
    } catch {
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  const store = {
    profile,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={store}>
      <Outlet />
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
