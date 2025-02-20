"use server"

import { connectDB } from "@/lib/db"
import { TransactionModel } from "@/lib/models"
import { revalidatePath } from "next/cache"
import type { TransactionFormData } from "@/lib/types"

export async function addTransaction(data: TransactionFormData) {
  try {
    await connectDB()
    await TransactionModel.create(data)
    revalidatePath("/")
    revalidatePath("/transactions")
    return { success: true }
  } catch (error) {
    console.error("Failed to add transaction:", error)
    throw new Error("Failed to add transaction")
  }
}

export async function deleteTransaction(id: string) {
  try {
    await connectDB()
    await TransactionModel.findByIdAndDelete(id)
    revalidatePath("/")
    revalidatePath("/transactions")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete transaction:", error)
    throw new Error("Failed to delete transaction")
  }
}

