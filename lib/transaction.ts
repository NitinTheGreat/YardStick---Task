import mongoose, { type Model } from "mongoose"
import type { Transaction } from "../types"

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
  },
  {
    timestamps: true,
  },
)

export const TransactionModel: Model<Transaction> =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)

