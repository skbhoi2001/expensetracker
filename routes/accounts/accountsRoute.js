const express = require("express");
const {
  accountCreateController,
  accountGetController,
  accountUpdateController,
  accountDeleteController,
} = require("../../controllers/accounts/accountController");

const accountRoute = express.Router();

accountRoute.post("/", accountCreateController);

accountRoute.get("/:id", accountGetController);

accountRoute.delete("/:id", accountDeleteController);

accountRoute.put("/:id", accountUpdateController);

module.exports = accountRoute;
