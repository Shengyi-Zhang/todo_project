import React, { useState, useContext } from "react";
import { TodoContext } from "./TodoContext";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddTodoForm = () => {
  const { addTodos } = useContext(TodoContext);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTitle && newDesc) {
      addTodos({ title: newTitle, desc: newDesc });
      setNewTitle("");
      setNewDesc("");
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Typography variant="h5" mb={2}>
        Add Todo
      </Typography>
      <form onSubmit={handleAddTodo}>
        <TextField
          fullWidth
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Todo
        </Button>
      </form>
    </Box>
  );
};

export default AddTodoForm;
