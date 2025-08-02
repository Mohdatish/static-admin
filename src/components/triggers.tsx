"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Play, FileText } from "lucide-react"

const apiTemplates = [
  {
    id: "payment",
    name: "Payment Gateway",
    description: "Process payment transactions",
    payload: {
      amount: 100,
      currency: "USD",
      customer_id: "cust_123",
      payment_method: "card",
    },
  },
  {
    id: "user_sync",
    name: "User Sync",
    description: "Synchronize user data",
    payload: {
      user_id: "user_456",
      action: "sync",
      fields: ["email", "profile", "preferences"],
    },
  },
  {
    id: "inventory",
    name: "Inventory Update",
    description: "Update product inventory",
    payload: {
      product_id: "prod_789",
      quantity: 50,
      operation: "add",
    },
  },
]

const triggerHistory = [
  {
    id: "trigger_001",
    api: "Payment Gateway",
    tenant: "Acme Corp",
    status: "success",
    timestamp: "2024-01-15 14:30:25",
    triggeredBy: "admin@acme.com",
  },
  {
    id: "trigger_002",
    api: "User Sync",
    tenant: "TechStart Inc",
    status: "failed",
    timestamp: "2024-01-15 14:25:12",
    triggeredBy: "admin@techstart.com",
  },
  {
    id: "trigger_003",
    api: "Inventory Update",
    tenant: "Global Solutions",
    status: "success",
    timestamp: "2024-01-15 14:20:45",
    triggeredBy: "admin@global.com",
  },
]

export function Triggers() {
  const [selectedTenant, setSelectedTenant] = useState("")
  const [selectedApi, setSelectedApi] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customPayload, setCustomPayload] = useState("")
  const [isTriggering, setIsTriggering] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    const template = apiTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setCustomPayload(JSON.stringify(template.payload, null, 2))
    }
  }

  const handleTrigger = async () => {
    if (!selectedTenant || !selectedApi) {
      alert("Please select tenant and API")
      return
    }

    setIsTriggering(true)

    // Simulate API call
    setTimeout(() => {
      setIsTriggering(false)
      alert("API triggered successfully!")
      // Reset form
      setSelectedTenant("")
      setSelectedApi("")
      setSelectedTemplate("")
      setCustomPayload("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Triggers & Events</h1>
        <p className="text-muted-foreground">Manually trigger APIs and view trigger history</p>
      </div>

      <Tabs defaultValue="trigger" className="w-full">
        <TabsList>
          <TabsTrigger value="trigger">Manual Trigger</TabsTrigger>
          <TabsTrigger value="history">Trigger History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="trigger" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Trigger Form */}
            <Card>
              <CardHeader>
                <CardTitle>Trigger API</CardTitle>
                <CardDescription>Select a tenant and API to trigger manually</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="techstart">TechStart Inc</SelectItem>
                      <SelectItem value="global">Global Solutions</SelectItem>
                      <SelectItem value="startup">StartupXYZ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api">API</Label>
                  <Select value={selectedApi} onValueChange={setSelectedApi}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select API" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment">Payment Gateway</SelectItem>
                      <SelectItem value="user_sync">User Sync</SelectItem>
                      <SelectItem value="inventory">Inventory Update</SelectItem>
                      <SelectItem value="email">Email Service</SelectItem>
                      <SelectItem value="analytics">Analytics Sync</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Template (Optional)</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {apiTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payload">Custom Payload (JSON)</Label>
                  <Textarea
                    id="payload"
                    placeholder="Enter JSON payload..."
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                <Button
                  onClick={handleTrigger}
                  disabled={isTriggering || !selectedTenant || !selectedApi}
                  className="w-full"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isTriggering ? "Triggering..." : "Trigger API"}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Request Preview</CardTitle>
                <CardDescription>Preview of the API request that will be sent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Endpoint</Label>
                    <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">
                      {selectedApi ? `/api/v1/${selectedApi}` : "Select an API"}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Headers</Label>
                    <pre className="mt-1 p-2 bg-muted rounded text-sm overflow-x-auto">
                      <code>
                        {JSON.stringify(
                          {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ***",
                            "X-Tenant-ID": selectedTenant || "tenant-id",
                          },
                          null,
                          2,
                        )}
                      </code>
                    </pre>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Payload</Label>
                    <pre className="mt-1 p-2 bg-muted rounded text-sm overflow-x-auto">
                      <code>{customPayload || "No payload specified"}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Trigger History</CardTitle>
              <CardDescription>History of manually triggered APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>API</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Triggered By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {triggerHistory.map((trigger) => (
                    <TableRow key={trigger.id}>
                      <TableCell className="font-medium">{trigger.api}</TableCell>
                      <TableCell>{trigger.tenant}</TableCell>
                      <TableCell>
                        <Badge variant={trigger.status === "success" ? "default" : "destructive"}>
                          {trigger.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{trigger.timestamp}</TableCell>
                      <TableCell>{trigger.triggeredBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {apiTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mb-4">
                    <code>{JSON.stringify(template.payload, null, 2)}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
