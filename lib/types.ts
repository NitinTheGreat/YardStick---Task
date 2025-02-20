export interface Transaction {
  _id: string
  amount: number
  description: string
  date: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface MonthlyData {
  _id: number
  total: number
}

export interface TransactionFormData {
  amount: number
  description: string
  date: string
}

