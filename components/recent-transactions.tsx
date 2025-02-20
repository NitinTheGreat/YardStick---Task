import { formatDistanceToNow } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import type { Transaction } from "@/lib/types"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-muted-foreground">No recent transactions</div>
    )
  }

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction._id} className="flex items-center">
          <div
            className={`${
              transaction.amount < 0 ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
            } rounded-full p-2 mr-4`}
          >
            {transaction.amount < 0 ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
            </p>
          </div>
          <div className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-emerald-500"}`}>
            {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

