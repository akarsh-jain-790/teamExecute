"use client"

import { useState } from "react"
import { AlertTriangle, TrendingUp, BarChart3, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LineChart } from "@/components/ui/chart"

interface AnomalyData {
  id: string
  name: string
  description: string
  score: number
  trend: "increasing" | "decreasing" | "stable"
  affectedTransactions: number
  firstDetected: Date
  category: "payment_method" | "location" | "device" | "behavior" | "amount"
}

export function AnomalyDetection() {
  const [activeTab, setActiveTab] = useState("emerging")

  // Dummy data for emerging fraud patterns
  const anomalies: AnomalyData[] = [
    {
      id: "anomaly-1",
      name: "Unusual Transaction Velocity",
      description: "Multiple transactions in short time periods from same user across different payment methods",
      score: 0.89,
      trend: "increasing",
      affectedTransactions: 37,
      firstDetected: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      category: "behavior",
    },
    {
      id: "anomaly-2",
      name: "New Geo-location Pattern",
      description: "Transactions from unusual locations for established users",
      score: 0.76,
      trend: "increasing",
      affectedTransactions: 18,
      firstDetected: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
      category: "location",
    },
    {
      id: "anomaly-3",
      name: "Device Switching",
      description: "Rapid switching between devices for same user account",
      score: 0.82,
      trend: "stable",
      affectedTransactions: 24,
      firstDetected: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      category: "device",
    },
    {
      id: "anomaly-4",
      name: "Amount Distribution Shift",
      description: "Unusual pattern in transaction amount distribution",
      score: 0.71,
      trend: "decreasing",
      affectedTransactions: 42,
      firstDetected: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
      category: "amount",
    },
    {
      id: "anomaly-5",
      name: "New Payment Method Pattern",
      description: "Unusual usage pattern of specific payment methods",
      score: 0.68,
      trend: "increasing",
      affectedTransactions: 15,
      firstDetected: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      category: "payment_method",
    },
  ]

  // Prepare data for trend chart
  const trendChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Anomaly Score",
        data: [0.2, 0.25, 0.3, 0.28, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const getCategoryBadge = (category: AnomalyData["category"]) => {
    const colors: Record<AnomalyData["category"], string> = {
      payment_method: "bg-blue-100 text-blue-800",
      location: "bg-green-100 text-green-800",
      device: "bg-purple-100 text-purple-800",
      behavior: "bg-yellow-100 text-yellow-800",
      amount: "bg-red-100 text-red-800",
    }

    const labels: Record<AnomalyData["category"], string> = {
      payment_method: "Payment Method",
      location: "Location",
      device: "Device",
      behavior: "Behavior",
      amount: "Amount",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[category]}`}>{labels[category]}</span>
  }

  const getTrendIcon = (trend: AnomalyData["trend"]) => {
    switch (trend) {
      case "increasing":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "decreasing":
        return <ArrowUpRight className="w-4 h-4 text-green-500 transform rotate-90" />
      case "stable":
        return <ArrowUpRight className="w-4 h-4 text-yellow-500 transform rotate-45" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
          Anomaly Detection
        </CardTitle>
        <CardDescription>Emerging fraud patterns detected by unsupervised machine learning</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="emerging" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="emerging">Emerging Patterns</TabsTrigger>
            <TabsTrigger value="trends">Anomaly Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="emerging" className="space-y-4">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{anomaly.name}</h3>
                      {getCategoryBadge(anomaly.category)}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{anomaly.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                    <span className="text-sm font-medium text-blue-700">{anomaly.score.toFixed(2)}</span>
                    {getTrendIcon(anomaly.trend)}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    First detected: {anomaly.firstDetected.toLocaleDateString()}
                  </span>
                  <span className="text-muted-foreground">
                    Affected transactions: <span className="font-medium">{anomaly.affectedTransactions}</span>
                  </span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="trends">
            <div className="space-y-4">
              <div className="h-80">
                <LineChart data={trendChartData} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Anomaly Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">Behavior Patterns</span>
                      </div>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Anomaly Growth Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">+28% this month</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Increasing</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

