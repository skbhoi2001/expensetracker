const Account = require("../../model/accounts/Account");
const Transaction = require("../../model/transaction/Transaction");
const User = require("../../model/users/User");
const { AppErr } = require("../../utils/appErr");

const transactionCreateController = async (req, res, next) => {
  const { name, transactionType, amount, category, notes, account } = req.body;
  try {
    //!find user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(new AppErr("User not found", 404));

    //! find account

    const accountFound = await Account.findById(account);
    if (!accountFound) return next(new AppErr("Account not found", 404));

    //!create transaction

    const transaction = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      account,
      createdBy: req.user,
    });

    //!push tran to account
    accountFound.transactions.push(transaction._id);

    //!resave account
    await accountFound.save();

    res.json({
      message: "transactions create",
      status: "success",
      transaction,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionGetController = async (req, res, next) => {
  try {
    res.json({
      message: "transactions Get",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactiongetByIdController = async (req, res, next) => {
  try {
    res.json({
      message: "transactions getById",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionDeleteController = async (req, res, next) => {
  try {
    res.json({
      message: "transactions Delete",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionUpdateController = async (req, res, next) => {
  try {
    res.json({
      message: "transactions Update",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  transactionCreateController,
  transactionGetController,
  transactiongetByIdController,
  transactionDeleteController,
  transactionUpdateController,
};
