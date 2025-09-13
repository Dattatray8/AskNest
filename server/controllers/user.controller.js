import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User found successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in finding current user", error: error.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userName, bio, profession } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const sameUser = await User.findOne({ userName }).select("-password");
    if (sameUser && !sameUser._id.equals(req.userId)) {
      return res
        .status(400)
        .json({ success: false, message: "UserName is exists" });
    }
    // let profileImage;
    // if (req.file) {
    //   profileImage = await uploadOnCloudinary(req.file.path);
    // } else {
    //   profileImage = user.profileImage;
    // }
    if (bio) user.bio = bio;
    if (profession) user.profession = profession;
    if (userName) user.userName = userName;
    // user.profileImage = profileImage;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Profile successfully edited", user });
  } catch (error) {
    return res.status(500).json({
      message: "Error in editing profile",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Profile fetched successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Error in get profile",
      error: error.message,
    });
  }
};

export const search = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ message: "keyword is required" });
    }
    const users = await User.find({
      _id: { $ne: req.userId },
      $or: [
        { userName: { $regex: keyword, $options: "i" } },
      ],
    }).select("-password");

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Error in to search user",
      error: error.message,
    });
  }
};
