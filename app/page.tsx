import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { connectDB } from "@/lib/db"
import { TransactionModel } from "@/lib/models"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import type { Transaction, MonthlyData } from "@/lib/types"

export default async function Home() {
  await connectDB()

  const transactions = (await TransactionModel.find({}).sort({ date: -1 }).limit(5).lean()) as Transaction[]

  const totalExpenses = transactions.reduce((acc, curr) => acc + curr.amount, 0)

  const monthlyData = (await TransactionModel.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ])) as MonthlyData[]

  const monthlyBudget = 2000
  const budgetUsage = (Math.abs(totalExpenses) / monthlyBudget) * 100

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview and recent activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.abs(totalExpenses).toFixed(2)}</div>
            <div className="mt-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalExpenses / (transactions.length || 1)).toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">Based on {transactions.length} transactions</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
            <div
              className={`rounded-full px-2 py-1 text-xs ${
                budgetUsage > 90
                  ? "bg-red-500/10 text-red-500"
                  : budgetUsage > 70
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-emerald-500/10 text-emerald-500"
              }`}
            >
              {budgetUsage.toFixed(1)}% Used
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyBudget.toFixed(2)}</div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-2 rounded-full transition-all ${
                  budgetUsage > 90 ? "bg-red-500" : budgetUsage > 70 ? "bg-yellow-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(budgetUsage, 100)}%` }}
              />
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={monthlyData} />
          </CardContent>
        </Card>

        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions transactions={transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

