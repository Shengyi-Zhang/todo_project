import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { TodoProvider } from "./components/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TodoProvider>
  </StrictMode>
);
