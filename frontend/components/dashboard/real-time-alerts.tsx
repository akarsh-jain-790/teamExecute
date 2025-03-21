"use client"

import { useState, useEffect } from "react"
import { Bell, AlertTriangle, Info, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  title: string
  message: string
  timestamp: Date
  fraudScore: number
  transactionId: string
  status: "new" | "viewed" | "resolved"
  type: "fraud" | "anomaly" | "suspicious"
}

export function RealTimeAlerts() {
  const [threshold, setThreshold] = useState(0.8)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [notificationChannels, setNotificationChannels] = useState({
    inApp: true,
    email: true,
    sms: false,
    push: true,
  })
  const [showNotification, setShowNotification] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<Alert | null>(null)

  // Simulate fetching alerts
  useEffect(() => {
    const dummyAlerts: Alert[] = [
      {
        id: "alert-1",
        title: "High Risk Transaction Detected",
        message: "Transaction #45678 has a fraud score of 0.95",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        fraudScore: 0.95,
        transactionId: "TRX-45678",
        status: "new",
        type: "fraud",
      },
      {
        id: "alert-2",
        title: "Unusual Activity Pattern",
        message: "Multiple transactions from same IP with different cards",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        fraudScore: 0.87,
        transactionId: "TRX-45680",
        status: "viewed",
        type: "suspicious",
      },
      {
        id: "alert-3",
        title: "Potential Emerging Fraud Pattern",
        message: "New behavior detected across multiple accounts",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        fraudScore: 0.82,
        transactionId: "TRX-45690",
        status: "new",
        type: "anomaly",
      },
    ]

    setAlerts(dummyAlerts)

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: `alert-${Date.now()}`,
        title: "New High Risk Transaction",
        message: `Transaction #${Math.floor(Math.random() * 10000)} has a fraud score of ${(Math.random() * 0.2 + 0.8).toFixed(2)}`,
        timestamp: new Date(),
        fraudScore: Math.random() * 0.2 + 0.8,
        transactionId: `TRX-${Math.floor(Math.random() * 10000)}`,
        status: "new",
        type: "fraud",
      }

      if (newAlert.fraudScore > threshold) {
        setAlerts((prev) => [newAlert, ...prev])
        setCurrentNotification(newAlert)
        setShowNotification(true)

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false)
        }, 5000)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [threshold])

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0])
  }

  const handleChannelToggle = (channel: keyof typeof notificationChannels) => {
    setNotificationChannels((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }))
  }

  const handleDismissNotification = () => {
    setShowNotification(false)
  }

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "fraud":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "anomaly":
        return <Info className="w-5 h-5 text-yellow-500" />
      case "suspicious":
        return <Info className="w-5 h-5 text-orange-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            Real-Time Fraud Alerts
          </CardTitle>
          <CardDescription>Configure alert thresholds and notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Alert Threshold (Fraud Score)</Label>
                <span className="text-sm font-medium">{threshold.toFixed(2)}</span>
              </div>
              <Slider defaultValue={[threshold]} max={1} min={0.5} step={0.01} onValueChange={handleThresholdChange} />
              <p className="text-xs text-muted-foreground">
                You will receive alerts for transactions with fraud scores above this threshold
              </p>
            </div>

            <div className="space-y-3">
              <Label>Notification Channels</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="in-app">In-App</Label>
                    <p className="text-xs text-muted-foreground">Notifications within dashboard</p>
                  </div>
                  <Switch
                    id="in-app"
                    checked={notificationChannels.inApp}
                    onCheckedChange={() => handleChannelToggle("inApp")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email">Email</Label>
                    <p className="text-xs text-muted-foreground">Send alerts to your email</p>
                  </div>
                  <Switch
                    id="email"
                    checked={notificationChannels.email}
                    onCheckedChange={() => handleChannelToggle("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms">SMS</Label>
                    <p className="text-xs text-muted-foreground">Text message alerts</p>
                  </div>
                  <Switch
                    id="sms"
                    checked={notificationChannels.sms}
                    onCheckedChange={() => handleChannelToggle("sms")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Browser push alerts</p>
                  </div>
                  <Switch
                    id="push"
                    checked={notificationChannels.push}
                    onCheckedChange={() => handleChannelToggle("push")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Recent Alerts</Label>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border flex items-start space-x-3 ${
                      alert.status === "new" ? "bg-blue-50 border-blue-200" : "bg-background"
                    }`}
                  >
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">
                          Transaction: <span className="font-medium">{alert.transactionId}</span>
                        </span>
                        <span className="text-xs">
                          Score:{" "}
                          <span
                            className={`font-medium ${
                              alert.fraudScore > 0.9
                                ? "text-red-500"
                                : alert.fraudScore > 0.8
                                  ? "text-orange-500"
                                  : "text-yellow-500"
                            }`}
                          >
                            {alert.fraudScore.toFixed(2)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toast notification for new alerts */}
      <AnimatePresence>
        {showNotification && currentNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-4 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{currentNotification.title}</p>
                  <button onClick={handleDismissNotification} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{currentNotification.message}</p>
                <div className="mt-2 flex justify-between">
                  <Button size="sm" variant="outline">
                    Dismiss
                  </Button>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

