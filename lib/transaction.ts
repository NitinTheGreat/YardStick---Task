import mongoose, { type Model } from "mongoose"
interface Transaction {
  amount: number;
  description: string;
  date: Date;
  category?: string;
}

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

