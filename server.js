require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const usersRoute = require("./routes/users/usersRoute");
const accountRoute = require("./routes/accounts/accountsRoute");
const trasactionRoute = require("./routes/transaction/transactionRoute");
const globalErrHandler = require("./middleware/globalErrorHandler");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  cors({
    origin: "*", // Allow requests from any origin
  })
);

//!middleware
app.use(express.json());

//!routes
//user route
app.use("/api/v1/users", usersRoute);
//account route
app.use("/api/v1/account", accountRoute);
//transaction route
app.use("/api/v1/transactions", trasactionRoute);

//!error handling

app.use(globalErrHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is Live on port ${process.env.PORT} `);
});
