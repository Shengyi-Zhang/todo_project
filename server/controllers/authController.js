const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, firstName, lastName } = req.body;

    const existUser = await User.findOne({ userName });
    if (existUser)
      return res.status(400).json({ message: "Username already exist" });

    const existEmail = await User.findOne({ "userInfo.email": email });
    if (existEmail)
      return res
        .status(400)
        .json({ message: "User with same email already exist" });
    const user = new User({
      userName,
      password,
      userInfo: { email, firstName, lastName },
    });

    await user.save();

    res.status(200).json({ message: "Register success" });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ "userInfo.email": email });

    if (!user) return res(400).json({ message: "Invalid email or password" });

    const isValid = await user.comparePassword(password);

    if (!isValid)
      return res(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "login success", token, userName: user.userName });
  } catch (err) {
    res.status(500).json({ message: "login failed", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res(500).json({ message: "Can't get user", error: err.message });
  }
};
