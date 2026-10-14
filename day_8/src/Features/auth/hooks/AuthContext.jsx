import { createContext, useEffect, useState } from "react";

import { registerUser, loginUser, getCurrentUser } from "../services/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await getCurrentUser();

        if (active) {
          setUser(response.data.user ?? response.data.User ?? null);
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(username, password) {
    const response = await loginUser({
      Username: username,
      Password: password,
    });

    const loggedInUser =
      response.data.user ?? response.data.User ?? response.data;

    setUser(loggedInUser);
    return response.data;
  }

  async function handleRegister(username, email, password) {
    const response = await registerUser({
      Username: username,
      email,
      Password: password,
    });

    return response.data;
  }

  function handleLogout() {
    // Clears frontend state only.
    // Add a backend logout endpoint to clear the cookie.
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
