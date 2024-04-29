const Account = require("../../model/accounts/Account");
const User = require("../../model/users/User");
const { AppErr } = require("../../utils/appErr");

const accountCreateController = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    //!find logged user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(new AppErr("User not found", 404));

    //!create account

    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });

    //!push account to user accounts
    userFound.accounts.push(account._id);

    //!resave the user
    await userFound.save();

    res.json({
      message: "Account created",
      status: "success",
      account,
    });
  } catch (error) {
    return next(error.message);
  }
};
const accountGetController = async (req, res, next) => {
  const account = await Account.find({}).populate("transactions");
  try {
    res.json({
      message: "Account Get",
      account,
    });
  } catch (error) {
    return next(error.message);
  }
};
const accountUpdateController = async (req, res, next) => {
  try {
    res.json({
      message: "Account Update",
    });
  } catch (error) {
    return next(error.message);
  }
};
const accountDeleteController = async (req, res, next) => {
  try {
    res.json({
      message: "Account Delete",
    });
  } catch (error) {
    return next(error.message);
  }
};

module.exports = {
  accountCreateController,
  accountGetController,
  accountUpdateController,
  accountDeleteController,
};
