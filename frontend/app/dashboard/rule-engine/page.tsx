"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Award, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Define the rule schema
const ruleFormSchema = z.object({
  name: z.string().min(3, {
    message: "Rule name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  condition: z.string().min(5, {
    message: "Condition must be at least 5 characters.",
  }),
  action: z.string().min(5, {
    message: "Action must be at least 5 characters.",
  }),
  priority: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 10, {
    message: "Priority must be a number between 1 and 10.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
})

// Define the rule type
type Rule = {
  id: string
  name: string
  description: string
  condition: string
  action: string
  priority: string
  category: string
  score: number
  triggers: number
  createdAt: Date
}

// Generate dummy rules
const generateDummyRules = (): Rule[] => {
  return [
    {
      id: "rule-1",
      name: "Velocity Check",
      description: "Detects multiple transactions from the same user in a short time period",
      condition: "count(transactions) > 5 AND timespan < 10 minutes",
      action: "flag_for_review",
      priority: "1",
      category: "velocity",
      score: 95,
      triggers: 120,
      createdAt: new Date(2023, 5, 15),
    },
    {
      id: "rule-2",
      name: "Amount Threshold",
      description: "Flags transactions above a certain amount",
      condition: "amount > 10000",
      action: "require_additional_verification",
      priority: "2",
      category: "amount",
      score: 88,
      triggers: 75,
      createdAt: new Date(2023, 6, 22),
    },
    {
      id: "rule-3",
      name: "Geo-location Mismatch",
      description: "Detects transactions from unusual locations",
      condition: "user.location != user.usual_locations",
      action: "flag_for_review",
      priority: "3",
      category: "location",
      score: 92,
      triggers: 105,
      createdAt: new Date(2023, 7, 10),
    },
    {
      id: "rule-4",
      name: "Device Change",
      description: "Detects login from a new device",
      condition: "device.fingerprint NOT IN user.known_devices",
      action: "require_2fa",
      priority: "4",
      category: "device",
      score: 85,
      triggers: 60,
      createdAt: new Date(2023, 8, 5),
    },
    {
      id: "rule-5",
      name: "Suspicious IP",
      description: "Flags transactions from known suspicious IP ranges",
      condition: "ip_address IN blacklist",
      action: "block_transaction",
      priority: "1",
      category: "network",
      score: 98,
      triggers: 150,
      createdAt: new Date(2023, 9, 18),
    },
  ]
}

export default function RuleEnginePage() {
  const { toast } = useToast()
  const [rules, setRules] = useState<Rule[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof ruleFormSchema>>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      condition: "",
      action: "",
      priority: "",
      category: "",
    },
  })

  // Load dummy rules on mount
  useEffect(() => {
    setRules(generateDummyRules())
  }, [])

  // Handle form submission
  function onSubmit(values: z.infer<typeof ruleFormSchema>) {
    if (editingRule) {
      // Update existing rule
      setRules(rules.map((rule) => (rule.id === editingRule.id ? { ...rule, ...values } : rule)))
      toast({
        title: "Rule updated",
        description: `Rule "${values.name}" has been updated successfully.`,
      })
    } else {
      // Create new rule
      const newRule: Rule = {
        id: `rule-${rules.length + 1}`,
        ...values,
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        triggers: 0,
        createdAt: new Date(),
      }
      setRules([...rules, newRule])
      toast({
        title: "Rule created",
        description: `Rule "${values.name}" has been created successfully.`,
      })
    }

    setIsDialogOpen(false)
    setEditingRule(null)
    form.reset()
  }

  // Handle rule deletion
  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
    toast({
      title: "Rule deleted",
      description: "The rule has been deleted successfully.",
    })
  }

  // Handle rule editing
  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule)
    form.reset({
      name: rule.name,
      description: rule.description,
      condition: rule.condition,
      action: rule.action,
      priority: rule.priority,
      category: rule.category,
    })
    setIsDialogOpen(true)
  }

  // Sort rules by score for leaderboard
  const sortedRules = [...rules].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Rule Engine Configuration</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingRule(null)
                form.reset({
                  name: "",
                  description: "",
                  condition: "",
                  action: "",
                  priority: "",
                  category: "",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingRule ? "Edit Rule" : "Create New Rule"}</DialogTitle>
              <DialogDescription>
                {editingRule ? "Update the details of the existing rule." : "Define a new rule for fraud detection."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Velocity Check" {...field} />
                      </FormControl>
                      <FormDescription>A descriptive name for the rule</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe what this rule detects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="velocity">Velocity</SelectItem>
                            <SelectItem value="amount">Amount</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                            <SelectItem value="device">Device</SelectItem>
                            <SelectItem value="network">Network</SelectItem>
                            <SelectItem value="behavior">Behavior</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority (1-10)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="10" {...field} />
                        </FormControl>
                        <FormDescription>1 is highest priority</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g. count(transactions) > 5 AND timespan < 10 minutes" {...field} />
                      </FormControl>
                      <FormDescription>The condition that triggers this rule</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="flag_for_review">Flag for Review</SelectItem>
                          <SelectItem value="block_transaction">Block Transaction</SelectItem>
                          <SelectItem value="require_additional_verification">
                            Require Additional Verification
                          </SelectItem>
                          <SelectItem value="require_2fa">Require 2FA</SelectItem>
                          <SelectItem value="notify_admin">Notify Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>What happens when the rule is triggered</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingRule ? "Update Rule" : "Create Rule"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <div className="grid gap-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{rule.name}</CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditRule(rule)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Condition</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{rule.condition}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Action</h4>
                      <p className="text-sm text-muted-foreground">
                        {rule.action === "flag_for_review" && "Flag for Review"}
                        {rule.action === "block_transaction" && "Block Transaction"}
                        {rule.action === "require_additional_verification" && "Require Additional Verification"}
                        {rule.action === "require_2fa" && "Require 2FA"}
                        {rule.action === "notify_admin" && "Notify Admin"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div>Priority: {rule.priority}</div>
                    <div>Category: {rule.category}</div>
                    <div>Triggers: {rule.triggers}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Effectiveness:</span>
                    <span
                      className={`text-sm font-bold ${
                        rule.score >= 90 ? "text-green-500" : rule.score >= 80 ? "text-yellow-500" : "text-red-500"
                      }`}
                    >
                      {rule.score}%
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Rule Performance Leaderboard</CardTitle>
              <CardDescription>Rules ranked by effectiveness score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedRules.map((rule, index) => (
                  <div key={rule.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      {index === 0 ? (
                        <Award className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <span className="text-primary-foreground font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{rule.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        Triggers: {rule.triggers} | Category: {rule.category}
                      </p>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {rule.score}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

