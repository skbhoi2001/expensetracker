const express = require("express");
const {
  accountCreateController,
  accountGetController,
  accountUpdateController,
  accountDeleteController,
  accountSingleGetController,
} = require("../../controllers/accounts/accountController");
const isLogin = require("../../middleware/isLogin");

const accountRoute = express.Router();

accountRoute.post("/", isLogin, accountCreateController);

accountRoute.get("/", accountGetController);

accountRoute.get("/:id", accountSingleGetController);

accountRoute.delete("/:id", accountDeleteController);

accountRoute.put("/:id", accountUpdateController);

module.exports = accountRoute;
