const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      enum: ["Saving", "Investment", "Checking", "Credit Card"],
      required: true,
    },
    initialBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trasaction",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
