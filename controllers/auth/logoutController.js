exports.logout = (req, res) => {
  // Since we are using JWT without a whitelist/blacklist on the server for now,
  // we just return a success message.
  // The client will handle clearing the token from their storage.
  res.json({ message: "Logout successful" });
};
