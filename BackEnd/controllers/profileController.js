const Profile = require("../models/Profile");

// Create or Update Profile
const createProfile = async (req, res) => {
  try {
    const { college, branch, year, skills, github, linkedin, bio } = req.body;

    let profile = await Profile.findOne({
      user: req.user.id,
    });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          college,
          branch,
          year,
          skills,
          github,
          linkedin,
          bio,
        },
        { new: true }
      );

      return res.json(profile);
    }

    profile = await Profile.create({
      user: req.user.id,
      college,
      branch,
      year,
      skills,
      github,
      linkedin,
      bio,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "email"]);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProfile,
  getProfile,
};