"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog"
import { Search, RefreshCw, Eye, RotateCcw } from "lucide-react"
import { LogDetailsModal } from "../components/log-details-modal"

const logs = [
  {
    id: "log_001",
    status: "success",
    timestamp: "2024-01-15 14:30:25",
    tenant: "Acme Corp",
    api: "Payment Gateway",
    triggeredBy: "webhook",
    responseTime: "245ms",
    payload: { amount: 100, currency: "USD", customer_id: "cust_123" },
  },
  {
    id: "log_002",
    status: "failed",
    timestamp: "2024-01-15 14:28:12",
    tenant: "TechStart Inc",
    api: "User Sync",
    triggeredBy: "manual",
    responseTime: "1.2s",
    error: "Connection timeout",
    payload: { user_id: "user_456", action: "sync" },
  },
  {
    id: "log_003",
    status: "success",
    timestamp: "2024-01-15 14:25:45",
    tenant: "Global Solutions",
    api: "Inventory Update",
    triggeredBy: "scheduled",
    responseTime: "180ms",
    payload: { product_id: "prod_789", quantity: 50 },
  },
  {
    id: "log_004",
    status: "pending",
    timestamp: "2024-01-15 14:22:18",
    tenant: "Acme Corp",
    api: "Email Service",
    triggeredBy: "webhook",
    responseTime: "-",
    payload: { template: "welcome", recipient: "user@example.com" },
  },
  {
    id: "log_005",
    status: "failed",
    timestamp: "2024-01-15 14:20:33",
    tenant: "StartupXYZ",
    api: "Analytics Sync",
    triggeredBy: "manual",
    responseTime: "3.1s",
    error: "Invalid API key",
    payload: { event: "page_view", user_id: "user_999" },
  },
]

export function ApiLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tenantFilter, setTenantFilter] = useState("all")
  const [selectedLog, setSelectedLog] = useState<any>(null)

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.api.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const matchesTenant = tenantFilter === "all" || log.tenant === tenantFilter

    return matchesSearch && matchesStatus && matchesTenant
  })

  const handleRetry = (logId: string) => {
    console.log("Retrying log:", logId)
    // Implement retry logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Logs</h1>
          <p className="text-muted-foreground">Monitor and troubleshoot API requests across all tenants</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by API, tenant, or log ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Tenants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tenants</SelectItem>
                <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                <SelectItem value="TechStart Inc">TechStart Inc</SelectItem>
                <SelectItem value="Global Solutions">Global Solutions</SelectItem>
                <SelectItem value="StartupXYZ">StartupXYZ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>API</TableHead>
                  <TableHead>Triggered By</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "success" ? "default" : log.status === "failed" ? "destructive" : "secondary"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>{log.tenant}</TableCell>
                    <TableCell className="font-medium">{log.api}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.triggeredBy}</Badge>
                    </TableCell>
                    <TableCell>{log.responseTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl" style={{backgroundColor:"#fff"}}>
                            <LogDetailsModal log={log} />
                          </DialogContent>
                        </Dialog>
                        {log.status === "failed" && (
                          <Button variant="ghost" size="sm" onClick={() => handleRetry(log.id)}>
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredLogs.length} of {logs.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
