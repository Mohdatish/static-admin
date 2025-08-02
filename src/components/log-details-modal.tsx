"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Copy, Edit, RotateCcw, Save } from "lucide-react"

interface LogDetailsModalProps {
  log: any
}

export function LogDetailsModal({ log }: LogDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPayload, setEditedPayload] = useState(JSON.stringify(log.payload, null, 2))

  const handleSave = () => {
    try {
      JSON.parse(editedPayload)
      setIsEditing(false)
      // Save logic here
    } catch (error) {
      alert("Invalid JSON format")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(log.payload, null, 2))
  }

  const handleRetry = () => {
    console.log("Retrying log:", log.id)
    // Implement retry logic
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Log Details</h2>
          <p className="text-muted-foreground">ID: {log.id}</p>
        </div>
        <div className="flex items-center gap-2">
          {log.status === "failed" && (
            <Button onClick={handleRetry}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Badge
                variant={log.status === "success" ? "default" : log.status === "failed" ? "destructive" : "secondary"}
              >
                {log.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tenant:</span>
              <span>{log.tenant}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">API:</span>
              <span>{log.api}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Triggered By:</span>
              <Badge variant="outline">{log.triggeredBy}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Response Time:</span>
              <span>{log.responseTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Timestamp:</span>
              <span className="font-mono text-sm">{log.timestamp}</span>
            </div>
            {log.error && (
              <div className="flex justify-between">
                <span className="font-medium">Error:</span>
                <span className="text-red-600">{log.error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Request Initiated</p>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Processing</p>
                  <p className="text-xs text-muted-foreground">API call in progress</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    log.status === "success" ? "bg-green-500" : log.status === "failed" ? "bg-red-500" : "bg-gray-500"
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-medium">
                    {log.status === "success" ? "Completed" : log.status === "failed" ? "Failed" : "Pending"}
                  </p>
                  <p className="text-xs text-muted-foreground">Response time: {log.responseTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payload" className="w-full">
        <TabsList>
          <TabsTrigger value="payload">Payload</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
        </TabsList>

        <TabsContent value="payload" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Request Payload</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedPayload}
                  onChange={(e) => setEditedPayload(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              ) : (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{JSON.stringify(log.payload, null, 2)}</code>
                </pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  {log.status === "success"
                    ? JSON.stringify({ status: "success", message: "Request processed successfully" }, null, 2)
                    : log.status === "failed"
                      ? JSON.stringify({ status: "error", error: log.error, code: 500 }, null, 2)
                      : "Response pending..."}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="headers">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  {JSON.stringify(
                    {
                      "Content-Type": "application/json",
                      Authorization: "Bearer ***",
                      "User-Agent": "AdminPortal/1.0",
                      "X-Tenant-ID": log.tenant.replace(" ", "-").toLowerCase(),
                    },
                    null,
                    2,
                  )}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
