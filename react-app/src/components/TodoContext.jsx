import React, {
  createContext,
  useState,
  useEffect,
  Children,
  useCallback,
} from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchTodos = useCallback(
    async (token) => {
      const t = token || localStorage.getItem("token");
      if (!t) {
        console.error("No valid token provided to fetch todos");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/todo/tasks`, {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });
        setTodos(response.data.tasks);
        setError(null);
      } catch (err) {
        setTodos([]);
        setError("Failed to fetch tasks");
        console.error(
          "Failed to fetch tasks:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

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

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Fetching todos on initial load...");
      fetchTodos(token);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        addTodos,
        fetchTodos,
        updateTodos,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
