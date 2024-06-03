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
const accountGetSpeceficUser = async (req, res, next) => {
  const userFound = await User.findById(req.user);
  if (!userFound) return next(new AppErr("User not found", 404));

  const accountGetAll = await Account.find({}).populate("transactions");
  const account = accountGetAll.filter(
    (ele) => ele.createdBy.toString() === userFound._id.toString()
  );
  try {
    res.json({
      message: "Account Get",
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
const accountSingleGetController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id).populate("transactions");
    res.json({
      message: "Account Get Specefic",
      status: "success",
      account,
    });
  } catch (error) {
    return next(error.message);
  }
};
const accountUpdateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      message: "Account Update",
      status: "success",
      account,
    });
  } catch (error) {
    return next(error.message);
  }
};
const accountDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.json({
      message: "Account Delete",
      data: null,
      status: "Success",
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
  accountSingleGetController,
  accountGetSpeceficUser,
};
