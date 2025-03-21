"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Info, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Transaction = {
  id: string
  date: Date
  amount: number
  payerId: string
  payeeId: string
  paymentMethod: string
  status: "completed" | "pending" | "failed" | "blocked"
  fraudScore: number
  anomalyFlag?: boolean
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id")
      const anomalyFlag = row.original.anomalyFlag

      return (
        <div className="flex items-center">
          <div className="font-medium">{id}</div>
          {anomalyFlag && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">Anomaly Detected</p>
                  <p className="text-xs">This transaction contains unusual patterns</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("date")
      return <div>{date.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "payerId",
    header: "Payer ID",
    cell: ({ row }) => {
      return <div className="truncate max-w-[100px]">{row.getValue("payerId")}</div>
    },
  },
  {
    accessorKey: "payeeId",
    header: "Payee ID",
    cell: ({ row }) => {
      return <div className="truncate max-w-[100px]">{row.getValue("payeeId")}</div>
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      return <div>{row.getValue("paymentMethod")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status")
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : status === "failed"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )
    },
  },
  {
    accessorKey: "fraudScore",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fraud Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const score = Number.parseFloat(row.getValue("fraudScore"))

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <div
                  className={`font-medium ${
                    score >= 90
                      ? "text-red-500"
                      : score >= 75
                        ? "text-amber-500"
                        : score >= 50
                          ? "text-yellow-500"
                          : "text-green-500"
                  }`}
                >
                  {score}%
                </div>
                <Info className="h-3 w-3 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2 max-w-xs">
                <p className="font-medium">Fraud Score Explanation</p>
                <div className="text-xs space-y-1">
                  <p>• Transaction amount is {score > 75 ? "unusually high" : "within normal range"}</p>
                  <p>• Location is {score > 60 ? "different from usual patterns" : "consistent with user history"}</p>
                  <p>• Device fingerprint is {score > 80 ? "new and unrecognized" : "recognized"}</p>
                  <p>
                    • Velocity check shows{" "}
                    {score > 70 ? "multiple transactions in short time" : "normal activity pattern"}
                  </p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]

