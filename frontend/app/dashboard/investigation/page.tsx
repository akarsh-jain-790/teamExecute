"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, Info, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { generateDummyTransactions } from "@/lib/dummy-data"

type FraudCase = {
  id: string
  transactionId: string
  date: Date
  amount: number
  fraudScore: number
  status: "open" | "investigating" | "resolved" | "false_positive"
  notes: string
  explanation: string
}

export default function InvestigationPage() {
  const { toast } = useToast()
  const [cases, setCases] = useState<FraudCase[]>([])
  const [selectedCase, setSelectedCase] = useState<FraudCase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<string>("")

  useEffect(() => {
    // Generate dummy cases
    const transactions = generateDummyTransactions(20).filter((t) => t.fraudScore > 70)
    const dummyCases: FraudCase[] = transactions.map((t, index) => ({
      id: `case-${index + 1}`,
      transactionId: t.id,
      date: t.date,
      amount: t.amount,
      fraudScore: t.fraudScore,
      status:
        index % 4 === 0 ? "resolved" : index % 4 === 1 ? "investigating" : index % 4 === 2 ? "false_positive" : "open",
      notes:
        index % 4 === 0
          ? "Confirmed fraudulent transaction. Account blocked."
          : index % 4 === 1
            ? "Currently under investigation. Awaiting customer response."
            : index % 4 === 2
              ? "Verified with customer. Transaction is legitimate."
              : "New case awaiting review.",
      explanation: `This transaction was flagged because:
1. Transaction amount is ${t.amount > 5000 ? "unusually high" : "within normal range"}.
2. Location is ${Math.random() > 0.5 ? "different from usual patterns" : "consistent with user history"}.
3. Device fingerprint is ${Math.random() > 0.7 ? "new and unrecognized" : "recognized"}.
4. Velocity check shows ${Math.random() > 0.6 ? "multiple transactions in short time" : "normal activity pattern"}.
5. Behavioral analysis indicates ${Math.random() > 0.5 ? "deviation from user pattern" : "consistent with user behavior"}.`,
    }))

    setCases(dummyCases)
  }, [])

  const handleOpenCase = (caseItem: FraudCase) => {
    setSelectedCase(caseItem)
    setNotes(caseItem.notes)
    setStatus(caseItem.status)
    setIsDialogOpen(true)
  }

  const handleUpdateCase = () => {
    if (!selectedCase) return

    setCases(cases.map((c) => (c.id === selectedCase.id ? { ...c, notes, status: status as any } : c)))

    toast({
      title: "Case updated",
      description: `Case ${selectedCase.id} has been updated successfully.`,
    })

    setIsDialogOpen(false)
  }

  const openCases = cases.filter((c) => c.status === "open" || c.status === "investigating")
  const resolvedCases = cases.filter((c) => c.status === "resolved" || c.status === "false_positive")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="open" className="space-y-4">
        <TabsList>
          <TabsTrigger value="open">Open Cases ({openCases.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Cases ({resolvedCases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="open">
          <div className="space-y-4">
            {openCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="hover:border-primary cursor-pointer"
                onClick={() => handleOpenCase(caseItem)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">Case {caseItem.id}</CardTitle>
                      <CardDescription>Transaction: {caseItem.transactionId}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      {caseItem.status === "open" ? (
                        <div className="flex items-center text-amber-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span className="text-xs font-medium">Awaiting Review</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-500">
                          <Info className="mr-1 h-4 w-4" />
                          <span className="text-xs font-medium">Investigating</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{caseItem.date.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-sm text-muted-foreground">${caseItem.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fraud Score</p>
                      <p
                        className={`text-sm font-bold ${
                          caseItem.fraudScore >= 90
                            ? "text-red-500"
                            : caseItem.fraudScore >= 80
                              ? "text-amber-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {caseItem.fraudScore}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground">{caseItem.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {openCases.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>No Open Cases</CardTitle>
                  <CardDescription>All cases have been resolved. Great job!</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="space-y-4">
            {resolvedCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="hover:border-primary cursor-pointer"
                onClick={() => handleOpenCase(caseItem)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">Case {caseItem.id}</CardTitle>
                      <CardDescription>Transaction: {caseItem.transactionId}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      {caseItem.status === "resolved" ? (
                        <div className="flex items-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          <span className="text-xs font-medium">Fraud Confirmed</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span className="text-xs font-medium">False Positive</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{caseItem.date.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-sm text-muted-foreground">${caseItem.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fraud Score</p>
                      <p
                        className={`text-sm font-bold ${
                          caseItem.fraudScore >= 90
                            ? "text-red-500"
                            : caseItem.fraudScore >= 80
                              ? "text-amber-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {caseItem.fraudScore}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Resolution</p>
                    <p className="text-sm text-muted-foreground">{caseItem.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {resolvedCases.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>No Resolved Cases</CardTitle>
                  <CardDescription>There are no resolved cases yet.</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCase && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Case {selectedCase.id}</DialogTitle>
              <DialogDescription>Transaction: {selectedCase.transactionId}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{selectedCase.date.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-sm text-muted-foreground">${selectedCase.amount.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">AI Explanation</p>
                <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-line">{selectedCase.explanation}</div>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Awaiting Review</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Fraud Confirmed</SelectItem>
                    <SelectItem value="false_positive">False Positive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add investigation notes here"
                  className="min-h-32"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateCase}>Update Case</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

