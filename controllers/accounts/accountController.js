const accountCreateController = async (req, res) => {
  try {
    res.json({
      message: "Account create",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const accountGetController = async (req, res) => {
  try {
    res.json({
      message: "Account Get",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const accountUpdateController = async (req, res) => {
  try {
    res.json({
      message: "Account Update",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const accountDeleteController = async (req, res) => {
  try {
    res.json({
      message: "Account Delete",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  accountCreateController,
  accountGetController,
  accountUpdateController,
  accountDeleteController,
};
