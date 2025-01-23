const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const taskRoutes = require("./routers/taskRoutes");

const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;

app.use(cors());
app.use("/todo", taskRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
startServer();
