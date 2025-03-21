"use client"

import { useState } from "react"
import { User, Activity, AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/ui/chart"

interface UserProfile {
  id: string
  name: string
  email: string
  riskScore: number
  deviationScore: number
  transactionCount: number
  averageAmount: number
  lastActive: Date
  behaviorFactors: {
    timePattern: number
    locationPattern: number
    devicePattern: number
    amountPattern: number
    frequencyPattern: number
  }
}

export function BehavioralProfiling() {
  const [activeTab, setActiveTab] = useState("profiles")
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)

  // Dummy data for user profiles
  const userProfiles: UserProfile[] = [
    {
      id: "user-1",
      name: "John Smith",
      email: "john.smith@example.com",
      riskScore: 0.25,
      deviationScore: 0.18,
      transactionCount: 47,
      averageAmount: 230.5,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      behaviorFactors: {
        timePattern: 0.12,
        locationPattern: 0.08,
        devicePattern: 0.05,
        amountPattern: 0.22,
        frequencyPattern: 0.15,
      },
    },
    {
      id: "user-2",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      riskScore: 0.68,
      deviationScore: 0.72,
      transactionCount: 23,
      averageAmount: 450.75,
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      behaviorFactors: {
        timePattern: 0.65,
        locationPattern: 0.78,
        devicePattern: 0.45,
        amountPattern: 0.82,
        frequencyPattern: 0.7,
      },
    },
    {
      id: "user-3",
      name: "Robert Williams",
      email: "robert.williams@example.com",
      riskScore: 0.42,
      deviationScore: 0.38,
      transactionCount: 86,
      averageAmount: 175.25,
      lastActive: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      behaviorFactors: {
        timePattern: 0.35,
        locationPattern: 0.42,
        devicePattern: 0.28,
        amountPattern: 0.45,
        frequencyPattern: 0.32,
      },
    },
    {
      id: "user-4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      riskScore: 0.15,
      deviationScore: 0.12,
      transactionCount: 112,
      averageAmount: 320.8,
      lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      behaviorFactors: {
        timePattern: 0.1,
        locationPattern: 0.08,
        devicePattern: 0.12,
        amountPattern: 0.15,
        frequencyPattern: 0.08,
      },
    },
    {
      id: "user-5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      riskScore: 0.82,
      deviationScore: 0.85,
      transactionCount: 18,
      averageAmount: 780.4,
      lastActive: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      behaviorFactors: {
        timePattern: 0.78,
        locationPattern: 0.85,
        devicePattern: 0.72,
        amountPattern: 0.9,
        frequencyPattern: 0.82,
      },
    },
  ]

  // Prepare data for behavior trend chart
  const behaviorTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Average Deviation Score",
        data: [0.15, 0.18, 0.22, 0.25, 0.28, 0.32, 0.35, 0.38, 0.42, 0.45, 0.48, 0.52],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const handleUserSelect = (user: UserProfile) => {
    setSelectedUser(user)
    setActiveTab("details")
  }

  const getScoreColor = (score: number) => {
    if (score < 0.3) return "text-green-500"
    if (score < 0.6) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score < 0.3) return "bg-green-500"
    if (score < 0.6) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2 text-primary" />
          Behavioral Profiling
        </CardTitle>
        <CardDescription>User behavior analysis and deviation scoring</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="profiles">User Profiles</TabsTrigger>
            <TabsTrigger value="details">Profile Details</TabsTrigger>
            <TabsTrigger value="trends">Behavior Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {userProfiles.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Deviation Score</p>
                        <p className={`font-medium ${getScoreColor(user.deviationScore)}`}>
                          {(user.deviationScore * 100).toFixed(0)}%
                        </p>
                      </div>
                      <AlertCircle className={`w-5 h-5 ${getScoreColor(user.deviationScore)}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Progress
                      value={user.deviationScore * 100}
                      className="h-2"
                      indicatorClassName={getProgressColor(user.deviationScore)}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Transactions: <span className="font-medium">{user.transactionCount}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Last active: <span className="font-medium">{user.lastActive.toLocaleTimeString()}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            {selectedUser ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-medium">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                    <p className={`text-xl font-bold ${getScoreColor(selectedUser.riskScore)}`}>
                      {(selectedUser.riskScore * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-xl font-medium">{selectedUser.transactionCount}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Average Amount</p>
                    <p className="text-xl font-medium">${selectedUser.averageAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Last Active</p>
                    <p className="text-xl font-medium">{selectedUser.lastActive.toLocaleTimeString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-medium">Behavior Deviation Factors</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Time Pattern</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(selectedUser.behaviorFactors.timePattern)}`}
                        >
                          {(selectedUser.behaviorFactors.timePattern * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={selectedUser.behaviorFactors.timePattern * 100}
                        className="h-2"
                        indicatorClassName={getProgressColor(selectedUser.behaviorFactors.timePattern)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Location Pattern</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(selectedUser.behaviorFactors.locationPattern)}`}
                        >
                          {(selectedUser.behaviorFactors.locationPattern * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={selectedUser.behaviorFactors.locationPattern * 100}
                        className="h-2"
                        indicatorClassName={getProgressColor(selectedUser.behaviorFactors.locationPattern)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Device Pattern</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(selectedUser.behaviorFactors.devicePattern)}`}
                        >
                          {(selectedUser.behaviorFactors.devicePattern * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={selectedUser.behaviorFactors.devicePattern * 100}
                        className="h-2"
                        indicatorClassName={getProgressColor(selectedUser.behaviorFactors.devicePattern)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Amount Pattern</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(selectedUser.behaviorFactors.amountPattern)}`}
                        >
                          {(selectedUser.behaviorFactors.amountPattern * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={selectedUser.behaviorFactors.amountPattern * 100}
                        className="h-2"
                        indicatorClassName={getProgressColor(selectedUser.behaviorFactors.amountPattern)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Frequency Pattern</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(selectedUser.behaviorFactors.frequencyPattern)}`}
                        >
                          {(selectedUser.behaviorFactors.frequencyPattern * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={selectedUser.behaviorFactors.frequencyPattern * 100}
                        className="h-2"
                        indicatorClassName={getProgressColor(selectedUser.behaviorFactors.frequencyPattern)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>View Transaction History</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No User Selected</h3>
                <p className="mt-2 text-muted-foreground">
                  Select a user from the profiles tab to view detailed behavior analysis
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            <div className="space-y-6">
              <div className="h-80">
                <LineChart data={behaviorTrendData} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Highest Deviation Factor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium">Location Pattern</span>
                      </div>
                      <span className="text-sm text-muted-foreground">+18% this month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Users Above Threshold</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                        <span className="font-medium">24 users</span>
                      </div>
                      <span className="text-sm text-muted-foreground">12% of total</span>
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

