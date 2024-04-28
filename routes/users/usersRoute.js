const express = require("express");
const {
  userRegisterController,
  userLoginController,
  userProfileController,
  userDeleteController,
  userUpdateController,
} = require("../../controllers/users/userController");
const isLogin = require("../../middleware/isLogin");

const usersRoute = express.Router();

usersRoute.post("/register", userRegisterController);

usersRoute.post("/login", userLoginController);

usersRoute.get("/profile", isLogin, userProfileController);

usersRoute.delete("/:id", userDeleteController);

usersRoute.put("/:id", userUpdateController);

module.exports = usersRoute;
