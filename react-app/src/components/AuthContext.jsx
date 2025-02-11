import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { TodoContext } from "./TodoContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchTodos } = useContext(TodoContext);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);

    setTimeout(() => {
      fetchTodos(jwtToken);
    }, 0);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const fetchUserData = async (jwtToken) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Failed fetch user");
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
