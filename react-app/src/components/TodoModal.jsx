import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { TodoContext } from "./TodoContext";

const TodoModal = ({ todo, open, onClose }) => {
  const { updateTodos, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editableDesc, setEditableDesc] = useState(todo.desc);
  const [completed, setCompleted] = useState(todo.completed);

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

  const handleToggleCompleted = async () => {
    const newCompletedStatus = !completed;
    console.log(newCompletedStatus);
    setCompleted(newCompletedStatus);
    await updateTodos(todo._id, { ...todo, completed: newCompletedStatus });
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    onClose();
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

        <FormControlLabel
          control={
            <Switch checked={completed} onChange={handleToggleCompleted} />
          }
          label={completed ? "Completed" : "Pending"}
        />

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          <strong>Created At:</strong>{" "}
          {new Date(todo.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button variant="contained" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TodoModal;
