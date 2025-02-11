import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../components/TodoContext";
import { AuthContext } from "../components/AuthContext";
import TodoModal from "../components/TodoModal";
import { Masonry } from "@mui/lab";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import AddTodoForm from "../components/AddTodoForm";

const TodoPage = () => {
  const { todos, loading, error, fetchTodos } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "25%",
          minWidth: "300px",
          borderRight: "1px solid #ccc",
          padding: 3,
        }}
      >
        <AddTodoForm />
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" mb={3}>
          My Todos
        </Typography>
        <Box sx={{ width: "80%", maxWidth: 1200 }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
            {todos.map((todo) => (
              <Card
                key={todo._id}
                sx={{
                  padding: 2,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 4 },
                }}
                onClick={() => handleTodoClick(todo)}
              >
                <CardContent>
                  <Typography variant="h6">{todo.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {todo.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Masonry>
        </Box>
      </Box>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          open={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </Box>
  );
};

export default TodoPage;
