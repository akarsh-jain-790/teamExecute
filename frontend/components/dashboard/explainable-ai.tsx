"use client"

import { useState } from "react"
import { LightbulbIcon, Info } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart } from "@/components/ui/chart"

interface FeatureImportance {
  feature: string
  importance: number
  direction: "positive" | "negative"
  description: string
}

interface ExplanationData {
  transactionId: string
  fraudScore: number
  prediction: "fraud" | "legitimate"
  confidence: number
  featureImportance: FeatureImportance[]
  counterfactuals: {
    feature: string
    currentValue: string
    suggestedValue: string
    newScore: number
  }[]
}

export function ExplainableAI() {
  const [activeTab, setActiveTab] = useState("feature-importance")

  // Dummy data for XAI explanation
  const explanationData: ExplanationData = {
    transactionId: "TRX-45678",
    fraudScore: 0.92,
    prediction: "fraud",
    confidence: 0.94,
    featureImportance: [
      {
        feature: "Transaction Amount",
        importance: 0.35,
        direction: "positive",
        description: "Unusually high transaction amount compared to user history",
      },
      {
        feature: "Location",
        importance: 0.25,
        direction: "positive",
        description: "Transaction location differs from typical user locations",
      },
      {
        feature: "Time of Day",
        importance: 0.15,
        direction: "positive",
        description: "Transaction occurred outside typical user activity hours",
      },
      {
        feature: "Device",
        importance: 0.12,
        direction: "positive",
        description: "New device not previously associated with this user",
      },
      {
        feature: "Transaction Frequency",
        importance: 0.08,
        direction: "positive",
        description: "Multiple transactions in short time period",
      },
      {
        feature: "User History",
        importance: 0.05,
        direction: "negative",
        description: "Long account history would typically indicate legitimacy",
      },
    ],
    counterfactuals: [
      {
        feature: "Transaction Amount",
        currentValue: "$5,280.00",
        suggestedValue: "< $1,000.00",
        newScore: 0.45,
      },
      {
        feature: "Location",
        currentValue: "New York, USA",
        suggestedValue: "San Francisco, USA",
        newScore: 0.62,
      },
      {
        feature: "Time of Day",
        currentValue: "3:24 AM",
        suggestedValue: "2:00 PM - 8:00 PM",
        newScore: 0.78,
      },
    ],
  }

  // Prepare data for feature importance chart
  const featureImportanceData = {
    labels: explanationData.featureImportance.map((item) => item.feature),
    datasets: [
      {
        label: "Feature Importance",
        data: explanationData.featureImportance.map((item) => item.importance * 100),
        backgroundColor: explanationData.featureImportance.map((item) =>
          item.direction === "positive" ? "rgba(239, 68, 68, 0.7)" : "rgba(16, 185, 129, 0.7)",
        ),
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LightbulbIcon className="w-5 h-5 mr-2 text-primary" />
          Explainable AI
        </CardTitle>
        <CardDescription>Understand why this transaction was flagged as fraudulent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Transaction #{explanationData.transactionId}</h3>
              <p className="text-sm text-muted-foreground">
                Prediction: <span className="font-medium text-red-600">Fraudulent</span> with{" "}
                {(explanationData.confidence * 100).toFixed(0)}% confidence
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Fraud Score</p>
              <p className="text-xl font-bold text-red-600">{(explanationData.fraudScore * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="feature-importance" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="feature-importance">Feature Importance</TabsTrigger>
            <TabsTrigger value="counterfactuals">What-If Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="feature-importance" className="space-y-4">
            <div className="h-80">
              <BarChart data={featureImportanceData} />
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-medium">Key Factors</h3>
              {explanationData.featureImportance.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          feature.direction === "positive" ? "bg-red-500" : "bg-green-500"
                        }`}
                      />
                      <span className="font-medium">{feature.feature}</span>
                    </div>
                    <span className="text-sm font-medium">{(feature.importance * 100).toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={feature.importance * 100}
                    className="h-2"
                    indicatorClassName={feature.direction === "positive" ? "bg-red-500" : "bg-green-500"}
                  />
                  <p className="text-sm text-muted-foreground pl-5">{feature.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="counterfactuals">
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    What-If Analysis shows how changing certain factors would affect the fraud prediction.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {explanationData.counterfactuals.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.feature}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Value</p>
                          <p className="font-medium">{item.currentValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Suggested Value</p>
                          <p className="font-medium text-blue-600">{item.suggestedValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">New Fraud Score</p>
                          <p className="font-medium text-yellow-600">{(item.newScore * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Score Reduction</span>
                          <span className="text-sm font-medium text-green-600">
                            {((explanationData.fraudScore - item.newScore) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                            style={{ width: `${explanationData.fraudScore * 100}%` }}
                          />
                          <div
                            className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full border-r-2 border-white"
                            style={{ width: `${item.newScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

