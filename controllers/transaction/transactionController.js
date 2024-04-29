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
    return next(error.message);
  }
};
const transactionGetController = async (req, res, next) => {
  try {
    const trans = await Transaction.find();

    res.json({
      message: "transactions Get All",
      status: "success",
      data: trans,
    });
  } catch (error) {
    return next(error.message);
  }
};
const transactiongetByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findById(id);
    res.json({
      status: "success",
      message: "transactions getById",
      data: trans,
    });
  } catch (error) {
    return next(error.message);
  }
};
const transactionDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({
      message: "transactions Delete",
      status: "success",
      data: "null",
    });
  } catch (error) {
    return next(error.message);
  }
};
const transactionUpdateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      message: "transactions Update",
      status: "success",
      data: trans,
    });
  } catch (error) {
    return next(error.message);
  }
};

module.exports = {
  transactionCreateController,
  transactionGetController,
  transactiongetByIdController,
  transactionDeleteController,
  transactionUpdateController,
};
