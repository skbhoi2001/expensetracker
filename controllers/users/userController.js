const bcrypt = require("bcryptjs");
const User = require("../../model/users/User");
const { appErr, AppErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateatoken");
const verifyToken = require("../../utils/verifyToken");

const userRegisterController = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    if (!email || !password || !fullname) {
      return next(new AppErr("Enter all details", 400));
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User Already Exists", 400));
    }

    //! hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User Register",
      data: user,
    });
  } catch (error) {
    return next(error.message);
  }
};
const userLoginController = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return next(new AppErr("Enter all details", 400));
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid Crediential", 400));
    }

    const passwordCheck = await bcrypt.compare(password, userFound.password);

    if (!passwordCheck) {
      return next(new AppErr("Invalid Crediential", 400));
    }

    res.json({
      message: "User Login",
      name: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    return next(error.message);
  }
};
const userProfileController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      message: "User Profile",
      user,
    });
  } catch (error) {
    return next(error.message);
  }
};
const userDeleteController = async (req, res, next) => {
  try {
    res.json({
      message: "User Delete",
    });
  } catch (error) {
    return next(error.message);
  }
};
const userUpdateController = async (req, res, next) => {
  try {
    res.json({
      message: "User Update",
    });
  } catch (error) {
    return next(error.message);
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  userProfileController,
  userDeleteController,
  userUpdateController,
};
