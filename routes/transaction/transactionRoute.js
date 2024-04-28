const express = require("express");
const {
  transactionCreateController,
  transactionGetController,
  transactiongetByIdController,
  transactionDeleteController,
  transactionUpdateController,
} = require("../../controllers/transaction/transactionController");

const trasactionRoute = express.Router();

trasactionRoute.post("/", transactionCreateController);

trasactionRoute.get("/", transactionGetController);

trasactionRoute.get("/:id", transactiongetByIdController);

trasactionRoute.delete("/:id", transactionDeleteController);

trasactionRoute.put("/:id", transactionUpdateController);

module.exports = trasactionRoute;
