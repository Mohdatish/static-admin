"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const apiActivityData = [
  { time: "00:00", success: 120, failed: 5 },
  { time: "04:00", success: 98, failed: 8 },
  { time: "08:00", success: 180, failed: 12 },
  { time: "12:00", success: 220, failed: 15 },
  { time: "16:00", success: 195, failed: 8 },
  { time: "20:00", success: 165, failed: 6 },
]

const recentLogs = [
  {
    id: "1",
    tenant: "Acme Corp",
    api: "Payment Gateway",
    status: "success",
    timestamp: "2024-01-15 14:30:25",
    triggeredBy: "webhook",
  },
  {
    id: "2",
    tenant: "TechStart Inc",
    api: "User Sync",
    status: "failed",
    timestamp: "2024-01-15 14:28:12",
    triggeredBy: "manual",
  },
  {
    id: "3",
    tenant: "Global Solutions",
    api: "Inventory Update",
    status: "success",
    timestamp: "2024-01-15 14:25:45",
    triggeredBy: "scheduled",
  },
  {
    id: "4",
    tenant: "Acme Corp",
    api: "Email Service",
    status: "pending",
    timestamp: "2024-01-15 14:22:18",
    triggeredBy: "webhook",
  },
]

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedTenant, setSelectedTenant] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor API integrations and workflows across all tenants</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Tenants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tenants</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="techstart">TechStart Inc</SelectItem>
              <SelectItem value="global">Global Solutions</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.8%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12ms</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Activity Over Time</CardTitle>
            <CardDescription>Success vs Failed requests in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={apiActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="success" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Usage by Tenant</CardTitle>
            <CardDescription>Total requests per tenant today</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { tenant: "Acme Corp", requests: 450 },
                  { tenant: "TechStart", requests: 320 },
                  { tenant: "Global Sol", requests: 280 },
                  { tenant: "StartupXYZ", requests: 234 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tenant" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent API Activity</CardTitle>
          <CardDescription>Latest API calls and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      log.status === "success" ? "default" : log.status === "failed" ? "destructive" : "secondary"
                    }
                  >
                    {log.status}
                  </Badge>
                  <div>
                    <p className="font-medium">{log.api}</p>
                    <p className="text-sm text-muted-foreground">{log.tenant}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{log.triggeredBy}</p>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">View All Logs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
