import React, { createContext, useState, useEffect, Children } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchTodos = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}/todo/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.tasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTodos = async (newTodo) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${baseUrl}/todo/tasks`, newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchTodos();
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const updateTodos = async (id, updatedTodo) => {
    try {
      await axios.put(`${baseUrl}/todo/${id}`, updatedTodo);
      await fetchTodos();
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/todo/${id}`);
      await fetchTodos();
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        addTodos,
        updateTodos,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
