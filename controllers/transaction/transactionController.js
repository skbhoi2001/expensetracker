const transactionCreateController = async (req, res) => {
  try {
    res.json({
      message: "transactions create",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionGetController = async (req, res) => {
  try {
    res.json({
      message: "transactions Get",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactiongetByIdController = async (req, res) => {
  try {
    res.json({
      message: "transactions getById",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionDeleteController = async (req, res) => {
  try {
    res.json({
      message: "transactions Delete",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const transactionUpdateController = async (req, res) => {
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
