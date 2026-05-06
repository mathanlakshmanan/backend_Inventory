const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

exports.loginUser = async (email, password) => {
  const user = await userModel.findByEmail(email);

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    role: user.role,
    user: {
      id: user.id,
      name: user.name
    }
  };
};