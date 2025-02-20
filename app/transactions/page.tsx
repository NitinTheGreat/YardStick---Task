import { connectDB } from "@/lib/db"
import { TransactionModel } from "@/lib/models"
import type { Transaction } from "@/lib/types"
import { TransactionForm } from "./transaction-form"
import { TransactionList } from "./transaction-list"

export default async function TransactionsPage() {
  await connectDB()
  const transactions = (await TransactionModel.find({}).sort({ date: -1 }).lean()) as Transaction[]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">Add and manage your transactions</p>
      </div>
      <TransactionForm />
      <TransactionList transactions={transactions} />
    </div>
  )
}

