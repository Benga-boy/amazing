const User = require("../models/User");

// Get users own secure profile profiles
async function getUser(req, res) {
  try {
    const user = await User.findById(req.currentUser.id);
    if (user.id !== req.params.id) {
      return res.status(401).json({ message: "Unauthorised" });
    }
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// Update a users profile
async function userUpdate(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.currentUser, req.body, {
      new: true,
      runValidators: true,
    });
    if (user.id !== req.params.id) {
      return res.status(401).json({ message: "Unauthorised" });
    }
    res.status(202).json({message: 'Your profile has been updated', user})
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = {
  getUser,
  userUpdate
};
