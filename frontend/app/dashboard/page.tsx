"use client"

import { useEffect, useState } from "react"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/dashboard/data-table"
import { FraudMap } from "@/components/dashboard/fraud-map"
import { NetworkGraph } from "@/components/dashboard/network-graph"
import { RealTimeAlerts } from "@/components/dashboard/real-time-alerts"
import { AnomalyDetection } from "@/components/dashboard/anomaly-detection"
import { BehavioralProfiling } from "@/components/dashboard/behavioral-profiling"
import { ModelRetraining } from "@/components/dashboard/model-retraining"
import { ExplainableAI } from "@/components/dashboard/explainable-ai"
import { columns } from "@/components/dashboard/columns"
import { generateDummyTransactions } from "@/lib/dummy-data"

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalTransactions: 0,
    fraudulentTransactions: 0,
    totalAmount: 0,
    fraudAmount: 0,
  })

  useEffect(() => {
    // Initial data load
    const initialData = generateDummyTransactions(100)
    setTransactions(initialData)

    // Calculate stats
    const fraudulent = initialData.filter((t) => t.fraudScore > 75)
    setStats({
      totalTransactions: initialData.length,
      fraudulentTransactions: fraudulent.length,
      totalAmount: initialData.reduce((sum, t) => sum + t.amount, 0),
      fraudAmount: fraudulent.reduce((sum, t) => sum + t.amount, 0),
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newData = [...prev]
        // Update a random transaction or add a new one
        if (Math.random() > 0.7) {
          const newTransaction = generateDummyTransactions(1)[0]
          newData.unshift(newTransaction)
          if (newData.length > 100) newData.pop()

          // Update stats
          setStats((prevStats) => {
            const newStats = { ...prevStats }
            newStats.totalTransactions += 1
            newStats.totalAmount += newTransaction.amount
            if (newTransaction.fraudScore > 75) {
              newStats.fraudulentTransactions += 1
              newStats.fraudAmount += newTransaction.amount
            }
            return newStats
          })
        }
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Prepare data for charts
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Fraud Transactions",
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 55, 70, 80],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Total Transactions",
        data: [280, 290, 310, 290, 270, 300, 310, 320, 330, 350, 360, 370],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const barChartData = {
    labels: ["Credit Card", "Debit Card", "Bank Transfer", "Digital Wallet", "Crypto"],
    datasets: [
      {
        label: "Fraud by Payment Method",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
      },
    ],
  }

  const pieChartData = {
    labels: ["Identity Theft", "Account Takeover", "Friendly Fraud", "Card Testing", "Other"],
    datasets: [
      {
        label: "Fraud Types",
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraudulent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fraudulentTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.fraudulentTransactions / stats.totalTransactions) * 100).toFixed(2)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+4.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.fraudAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.fraudAmount / stats.totalAmount) * 100).toFixed(2)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Fraud Trends</CardTitle>
                <CardDescription>Monthly fraud detection trends over the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={lineChartData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fraud by Type</CardTitle>
                <CardDescription>Distribution of fraud by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={pieChartData} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fraud by Payment Method</CardTitle>
                <CardDescription>Fraud distribution across payment channels</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={barChartData} />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest transactions with fraud scores</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={transactions.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <RealTimeAlerts />
            <AnomalyDetection />
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete list of transactions with filtering and sorting</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={transactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualizations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Hotspots</CardTitle>
                <CardDescription>Geographical distribution of fraudulent activities</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <FraudMap />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fraud Network Analysis</CardTitle>
                <CardDescription>Connected entities in fraud patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <NetworkGraph />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BehavioralProfiling />
            <ModelRetraining />
          </div>
          <ExplainableAI />
        </TabsContent>
      </Tabs>
    </div>
  )
}

