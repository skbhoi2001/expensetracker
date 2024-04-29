const express = require("express");
const {
  transactionCreateController,
  transactionGetController,
  transactiongetByIdController,
  transactionDeleteController,
  transactionUpdateController,
} = require("../../controllers/transaction/transactionController");
const isLogin = require("../../middleware/isLogin");

const trasactionRoute = express.Router();

trasactionRoute.post("/", isLogin, transactionCreateController);

trasactionRoute.get("/", transactionGetController);

trasactionRoute.get("/:id", transactiongetByIdController);

trasactionRoute.delete("/:id", transactionDeleteController);

trasactionRoute.put("/:id", transactionUpdateController);

module.exports = trasactionRoute;
