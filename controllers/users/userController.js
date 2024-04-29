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
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
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
    await User.findByIdAndDelete(req.user);
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(error.message);
  }
};
const userUpdateController = async (req, res, next) => {
  try {
    //!check if email exists
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return next(
          new AppErr("Email is taken OR You already have this email", 400)
        );
      }
    }

    //!if user updating password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //!update
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        message: "User Password Update",
        status: "success",
        updated_data: user,
      });
    }
    console.log(".001");
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "User data Update",
      status: "success",
      updated_data: user,
    });
  } catch (error) {
    console.log("jjj");
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
