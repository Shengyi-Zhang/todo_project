import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import { TodoProvider } from "./components/TodoContext";
import TodoPage from "./pages/TodoPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/todopage"
              element={
                <ProtectedRoute>
                  <TodoPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/todopage" />} />
          </Routes>
        </Router>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
