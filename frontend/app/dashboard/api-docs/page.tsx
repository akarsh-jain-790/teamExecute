import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiDocsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>FDAM API Documentation</CardTitle>
          <CardDescription>
            Comprehensive guide to integrating with the Fraud Detection, Alert, and Monitoring API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            The FDAM API provides programmatic access to fraud detection capabilities, rule management, and transaction
            monitoring. Use this API to integrate fraud detection into your payment systems.
          </p>

          <h3 className="text-lg font-semibold mb-2">Base URL</h3>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            https://api.fdam.example.com/v1
          </code>

          <h3 className="text-lg font-semibold mt-6 mb-2">Authentication</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All API requests require authentication using an API key. Include your API key in the request header as
            follows:
          </p>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm block mb-4">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Endpoints</CardTitle>
              <CardDescription>Endpoints for submitting and analyzing transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-green-600">POST</Badge>
                      <span>/transactions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Submit a new transaction for fraud analysis</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Request Body</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "transaction_id": "string",
  "amount": "number",
  "currency": "string",
  "payer": {
    "id": "string",
    "email": "string",
    "ip_address": "string",
    "device_fingerprint": "string"
  },
  "payee": {
    "id": "string",
    "name": "string"
  },
  "payment_method": {
    "type": "string",
    "last4": "string",
    "expiry": "string"
  },
  "timestamp": "string (ISO 8601)"
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "transaction_id": "string",
  "fraud_score": "number",
  "risk_level": "string (low, medium, high)",
  "action": "string (approve, review, block)",
  "rules_triggered": [
    {
      "rule_id": "string",
      "name": "string",
      "description": "string"
    }
  ],
  "timestamp": "string (ISO 8601)"
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/transactions/{"{transaction_id}"}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Retrieve details of a specific transaction</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Path Parameters</h4>
                        <p className="text-sm text-muted-foreground">
                          <code className="bg-muted px-1 py-0.5 rounded">transaction_id</code> - The ID of the
                          transaction to retrieve
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "transaction_id": "string",
  "amount": "number",
  "currency": "string",
  "payer": {
    "id": "string",
    "email": "string",
    "ip_address": "string"
  },
  "payee": {
    "id": "string",
    "name": "string"
  },
  "payment_method": {
    "type": "string",
    "last4": "string"
  },
  "fraud_analysis": {
    "score": "number",
    "risk_level": "string",
    "action": "string",
    "rules_triggered": [
      {
        "rule_id": "string",
        "name": "string"
      }
    ]
  },
  "timestamp": "string (ISO 8601)",
  "status": "string (pending, completed, blocked)"
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/transactions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">List transactions with optional filtering</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">start_date</code> - Filter by start date (ISO
                            8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">end_date</code> - Filter by end date (ISO
                            8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">risk_level</code> - Filter by risk level
                            (low, medium, high)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">status</code> - Filter by status (pending,
                            completed, blocked)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">limit</code> - Number of results per page
                            (default: 20, max: 100)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">offset</code> - Pagination offset (default:
                            0)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "total": "number",
  "limit": "number",
  "offset": "number",
  "transactions": [
    {
      "transaction_id": "string",
      "amount": "number",
      "currency": "string",
      "fraud_score": "number",
      "risk_level": "string",
      "timestamp": "string (ISO 8601)",
      "status": "string"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Rule Engine Endpoints</CardTitle>
              <CardDescription>Endpoints for managing fraud detection rules</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-green-600">POST</Badge>
                      <span>/rules</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Create a new fraud detection rule</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Request Body</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "name": "string",
  "description": "string",
  "condition": "string",
  "action": "string (flag_for_review, block_transaction, require_additional_verification)",
  "priority": "number (1-10)",
  "category": "string"
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "rule_id": "string",
  "name": "string",
  "description": "string",
  "condition": "string",
  "action": "string",
  "priority": "number",
  "category": "string",
  "created_at": "string (ISO 8601)",
  "status": "string (active, inactive)"
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/rules</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">List all fraud detection rules</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">category</code> - Filter by category
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">status</code> - Filter by status (active,
                            inactive)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">limit</code> - Number of results per page
                            (default: 20, max: 100)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">offset</code> - Pagination offset (default:
                            0)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "total": "number",
  "limit": "number",
  "offset": "number",
  "rules": [
    {
      "rule_id": "string",
      "name": "string",
      "description": "string",
      "condition": "string",
      "action": "string",
      "priority": "number",
      "category": "string",
      "created_at": "string (ISO 8601)",
      "status": "string",
      "performance": {
        "triggers": "number",
        "effectiveness": "number"
      }
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-yellow-600">PUT</Badge>
                      <span>/rules/{"{rule_id}"}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Update an existing fraud detection rule</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Path Parameters</h4>
                        <p className="text-sm text-muted-foreground">
                          <code className="bg-muted px-1 py-0.5 rounded">rule_id</code> - The ID of the rule to update
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Request Body</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "name": "string",
  "description": "string",
  "condition": "string",
  "action": "string",
  "priority": "number",
  "category": "string",
  "status": "string (active, inactive)"
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "rule_id": "string",
  "name": "string",
  "description": "string",
  "condition": "string",
  "action": "string",
  "priority": "number",
  "category": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)",
  "status": "string"
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Endpoints</CardTitle>
              <CardDescription>Endpoints for managing fraud alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/alerts</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">List fraud alerts with optional filtering</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">start_date</code> - Filter by start date (ISO
                            8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">end_date</code> - Filter by end date (ISO
                            8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">status</code> - Filter by status (new,
                            acknowledged, resolved)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">severity</code> - Filter by severity (low,
                            medium, high)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">limit</code> - Number of results per page
                            (default: 20, max: 100)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">offset</code> - Pagination offset (default:
                            0)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "total": "number",
  "limit": "number",
  "offset": "number",
  "alerts": [
    {
      "alert_id": "string",
      "title": "string",
      "message": "string",
      "transaction_id": "string",
      "rule_id": "string",
      "severity": "string",
      "status": "string",
      "created_at": "string (ISO 8601)",
      "updated_at": "string (ISO 8601)"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-yellow-600">PUT</Badge>
                      <span>/alerts/{"{alert_id}"}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Update the status of an alert</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Path Parameters</h4>
                        <p className="text-sm text-muted-foreground">
                          <code className="bg-muted px-1 py-0.5 rounded">alert_id</code> - The ID of the alert to update
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Request Body</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "status": "string (acknowledged, resolved)",
  "notes": "string"
}`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "alert_id": "string",
  "title": "string",
  "message": "string",
  "transaction_id": "string",
  "rule_id": "string",
  "severity": "string",
  "status": "string",
  "notes": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Endpoints</CardTitle>
              <CardDescription>Endpoints for retrieving fraud analytics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/analytics/summary</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">
                          Get a summary of fraud analytics for a specified time period
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">start_date</code> - Start date (ISO 8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">end_date</code> - End date (ISO 8601)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "period": {
    "start_date": "string (ISO 8601)",
    "end_date": "string (ISO 8601)"
  },
  "transactions": {
    "total": "number",
    "flagged": "number",
    "blocked": "number"
  },
  "amount": {
    "total": "number",
    "flagged": "number",
    "blocked": "number"
  },
  "fraud_rate": "number",
  "top_rules": [
    {
      "rule_id": "string",
      "name": "string",
      "triggers": "number",
      "effectiveness": "number"
    }
  ],
  "fraud_by_category": [
    {
      "category": "string",
      "count": "number",
      "percentage": "number"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/analytics/trends</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Get fraud trends over time</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">start_date</code> - Start date (ISO 8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">end_date</code> - End date (ISO 8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">interval</code> - Time interval (hourly,
                            daily, weekly, monthly)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "period": {
    "start_date": "string (ISO 8601)",
    "end_date": "string (ISO 8601)",
    "interval": "string"
  },
  "data_points": [
    {
      "timestamp": "string (ISO 8601)",
      "transactions": "number",
      "flagged": "number",
      "blocked": "number",
      "fraud_rate": "number"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-600">GET</Badge>
                      <span>/analytics/geo</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Description</h4>
                        <p className="text-sm text-muted-foreground">Get geographical distribution of fraud</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Query Parameters</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">start_date</code> - Start date (ISO 8601)
                          </li>
                          <li>
                            <code className="bg-muted px-1 py-0.5 rounded">end_date</code> - End date (ISO 8601)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Response</h4>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                          {`{
  "regions": [
    {
      "country": "string",
      "state": "string",
      "city": "string",
      "transactions": "number",
      "flagged": "number",
      "fraud_rate": "number",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

