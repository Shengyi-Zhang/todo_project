import React, { useState, useContext } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { TodoContext } from "./TodoContext";

const TodoModal = ({ todo, open, onClose }) => {
  const { updateTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editableDesc, setEditableDesc] = useState(todo.desc);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const handleEditClick = async () => {
    if (isEditing) {
      await updateTodos(todo._id, { ...todo, desc: editableDesc });
      todo.desc = editableDesc;
    }
    setIsEditing(!isEditing);
  };

  const handleDescChange = (e) => {
    setEditableDesc(e.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="todo-modal-title"
      aria-describedby="todo-modal-description"
    >
      <Box sx={style}>
        <Typography id="todo-modal-title" variant="h6" component="h2" mb={2}>
          {todo.title}
        </Typography>

        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editableDesc}
            onChange={handleDescChange}
            variant="outlined"
            margin="normal"
          />
        ) : (
          <Typography id="todo-modal-description" sx={{ mb: 3 }}>
            {editableDesc}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          <strong>Created At:</strong>{" "}
          {new Date(todo.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            variant="contained"
            color={isEditing ? "primary" : "secondary"}
            onClick={handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TodoModal;
