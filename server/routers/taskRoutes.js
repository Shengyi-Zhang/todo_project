const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getTask);
router.put("/:taskId", taskController.updateTask);
router.post("/tasks", taskController.createTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
