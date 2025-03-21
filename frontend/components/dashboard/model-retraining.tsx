"use client"

import { useState } from "react"
import { Brain, RefreshCw, CheckCircle, AlertTriangle, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ModelInfo {
  id: string
  name: string
  version: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  lastTrained: Date
  status: "active" | "training" | "needs_retraining"
  trainingProgress?: number
}

export function ModelRetraining() {
  const [isRetrainingDialogOpen, setIsRetrainingDialogOpen] = useState(false)
  const [isRetraining, setIsRetraining] = useState(false)
  const [retrainingProgress, setRetrainingProgress] = useState(0)
  const [models, setModels] = useState<ModelInfo[]>([
    {
      id: "model-1",
      name: "Transaction Fraud Detector",
      version: "v2.4.1",
      accuracy: 0.94,
      precision: 0.92,
      recall: 0.89,
      f1Score: 0.9,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      status: "active",
    },
    {
      id: "model-2",
      name: "Behavioral Anomaly Detector",
      version: "v1.8.3",
      accuracy: 0.87,
      precision: 0.85,
      recall: 0.82,
      f1Score: 0.83,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45), // 45 days ago
      status: "needs_retraining",
    },
    {
      id: "model-3",
      name: "Network Pattern Analyzer",
      version: "v3.1.0",
      accuracy: 0.91,
      precision: 0.89,
      recall: 0.88,
      f1Score: 0.88,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      status: "active",
    },
  ])

  const handleRetrainModel = (modelId: string) => {
    setIsRetrainingDialogOpen(false)
    setIsRetraining(true)

    // Update model status to training
    setModels(
      models.map((model) =>
        model.id === modelId ? { ...model, status: "training" as const, trainingProgress: 0 } : model,
      ),
    )

    // Simulate training progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // Update model after training
        setModels(
          models.map((model) =>
            model.id === modelId
              ? {
                  ...model,
                  status: "active" as const,
                  version: incrementVersion(model.version),
                  lastTrained: new Date(),
                  accuracy: Math.min(model.accuracy + Math.random() * 0.05, 0.99),
                  precision: Math.min(model.precision + Math.random() * 0.05, 0.99),
                  recall: Math.min(model.recall + Math.random() * 0.05, 0.99),
                  f1Score: Math.min(model.f1Score + Math.random() * 0.05, 0.99),
                  trainingProgress: undefined,
                }
              : model,
          ),
        )

        setIsRetraining(false)
      }

      setRetrainingProgress(progress)

      // Update model training progress
      setModels(
        models.map((model) =>
          model.id === modelId && model.status === "training" ? { ...model, trainingProgress: progress } : model,
        ),
      )
    }, 500)
  }

  const incrementVersion = (version: string): string => {
    const parts = version.split(".")
    if (parts.length !== 3) return version

    const major = Number.parseInt(parts[0].substring(1))
    const minor = Number.parseInt(parts[1])
    const patch = Number.parseInt(parts[2]) + 1

    return `v${major}.${minor}.${patch}`
  }

  const getStatusBadge = (status: ModelInfo["status"], lastTrained?: Date) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Active</span>
          </div>
        )
      case "training":
        return (
          <div className="flex items-center space-x-1 text-blue-600">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Training</span>
          </div>
        )
      case "needs_retraining":
        return (
          <div className="flex items-center space-x-1 text-yellow-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Needs Retraining</span>
          </div>
        )
    }
  }

  const getDaysSinceTraining = (date: Date): number => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          Model Retraining
        </CardTitle>
        <CardDescription>Monitor and retrain fraud detection models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {models.map((model) => (
          <Card key={model.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>Version: {model.version}</CardDescription>
                </div>
                {getStatusBadge(model.status, model.lastTrained)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-medium">{(model.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Precision</p>
                  <p className="text-lg font-medium">{(model.precision * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recall</p>
                  <p className="text-lg font-medium">{(model.recall * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">F1 Score</p>
                  <p className="text-lg font-medium">{(model.f1Score * 100).toFixed(1)}%</p>
                </div>
              </div>

              {model.status === "training" && model.trainingProgress !== undefined && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Training Progress</span>
                    <span className="text-sm font-medium">{model.trainingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={model.trainingProgress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>Last trained {getDaysSinceTraining(model.lastTrained)} days ago</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={model.status === "needs_retraining" ? "default" : "outline"}
                    disabled={model.status === "training"}
                  >
                    {model.status === "training" ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Training...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retrain Model
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Retrain Model</DialogTitle>
                    <DialogDescription>Are you sure you want to retrain the {model.name}?</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Retraining will use the latest data to improve model performance. This process may take several
                        minutes to complete.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRetrainingDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleRetrainModel(model.id)}>Start Retraining</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

