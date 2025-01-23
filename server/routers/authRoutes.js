const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", verifyToken, authController.getUser);
module.exports = router;
