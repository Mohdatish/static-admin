"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Switch } from "../components/ui/switch"
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Activity, Pause, Play, Settings } from "lucide-react"
import { Checkbox } from "../components/ui/checkbox"

const apiServices = [
  {
    id: "payment_gateway",
    name: "Payment Gateway",
    tenant: "Acme Corp",
    status: "active",
    lastActivity: "2024-01-15 14:30:25",
    requestCount: 1284,
    errorRate: "2.1%",
  },
  {
    id: "user_sync",
    name: "User Sync",
    tenant: "TechStart Inc",
    status: "inactive",
    lastActivity: "2024-01-15 12:15:30",
    requestCount: 856,
    errorRate: "0.8%",
  },
  {
    id: "inventory_update",
    name: "Inventory Update",
    tenant: "Global Solutions",
    status: "active",
    lastActivity: "2024-01-15 14:25:45",
    requestCount: 2103,
    errorRate: "1.5%",
  },
  {
    id: "email_service",
    name: "Email Service",
    tenant: "Acme Corp",
    status: "paused",
    lastActivity: "2024-01-15 13:45:12",
    requestCount: 567,
    errorRate: "5.2%",
  },
  {
    id: "analytics_sync",
    name: "Analytics Sync",
    tenant: "StartupXYZ",
    status: "active",
    lastActivity: "2024-01-15 14:28:18",
    requestCount: 934,
    errorRate: "3.1%",
  },
]

export function ApiControls() {
  const [services, setServices] = useState(apiServices)
  const [tenantFilter, setTenantFilter] = useState("all")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false)

  const handleSelectAll = () => {
    if (selectedServices.length === filteredServices.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(filteredServices.map((service) => service.id))
    }
  }

  const handleSelectService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleBulkAction = async (action: "activate" | "pause" | "configure") => {
    if (selectedServices.length === 0) return

    setIsBulkActionLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setServices(
      services.map((service) => {
        if (selectedServices.includes(service.id)) {
          switch (action) {
            case "activate":
              return { ...service, status: "active" }
            case "pause":
              return { ...service, status: "paused" }
            default:
              return service
          }
        }
        return service
      }),
    )

    setSelectedServices([])
    setIsBulkActionLoading(false)
  }

  const toggleApiStatus = (serviceId: string) => {
    setServices(
      services.map((service) => {
        if (service.id === serviceId) {
          const newStatus = service.status === "active" ? "inactive" : "active"
          return { ...service, status: newStatus }
        }
        return service
      }),
    )
  }

  const pauseApi = (serviceId: string) => {
    setServices(
      services.map((service) => {
        if (service.id === serviceId) {
          return { ...service, status: "paused" }
        }
        return service
      }),
    )
  }

  const filteredServices = services.filter((service) => tenantFilter === "all" || service.tenant === tenantFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "paused":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4" />
      case "inactive":
        return <Pause className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Controls</h1>
          <p className="text-muted-foreground">Manage API service status and configurations</p>
        </div>
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

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active APIs</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredServices.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently processing requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive APIs</CardTitle>
            <Pause className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredServices.filter((s) => s.status === "inactive").length}</div>
            <p className="text-xs text-muted-foreground">Disabled services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paused APIs</CardTitle>
            <Pause className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredServices.filter((s) => s.status === "paused").length}</div>
            <p className="text-xs text-muted-foreground">Temporarily paused</p>
          </CardContent>
        </Card>
      </div>

      {/* API Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Services</CardTitle>
          <CardDescription>Manage the status and configuration of API services</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Requests (24h)</TableHead>
                <TableHead>Error Rate</TableHead>
                <TableHead>Controls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleSelectService(service.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.tenant}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(service.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(service.status)}
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{service.lastActivity}</TableCell>
                  <TableCell>{service.requestCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        Number.parseFloat(service.errorRate) > 3
                          ? "text-red-600"
                          : Number.parseFloat(service.errorRate) > 1
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {service.errorRate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.status === "active"}
                        onCheckedChange={() => toggleApiStatus(service.id)}
                        disabled={service.status === "paused"}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => pauseApi(service.id)}
                        disabled={service.status === "paused"}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>
            Perform actions on multiple API services
            {selectedServices.length > 0 && (
              <span className="ml-2 text-primary">({selectedServices.length} selected)</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => handleBulkAction("activate")}
              disabled={selectedServices.length === 0 || isBulkActionLoading}
            >
              <Play className="mr-2 h-4 w-4" />
              {isBulkActionLoading ? "Processing..." : "Activate Selected"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkAction("pause")}
              disabled={selectedServices.length === 0 || isBulkActionLoading}
            >
              <Pause className="mr-2 h-4 w-4" />
              {isBulkActionLoading ? "Processing..." : "Pause Selected"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkAction("configure")}
              disabled={selectedServices.length === 0 || isBulkActionLoading}
            >
              <Settings className="mr-2 h-4 w-4" />
              Bulk Configure
            </Button>
            {selectedServices.length > 0 && (
              <Button variant="ghost" onClick={() => setSelectedServices([])} size="sm">
                Clear Selection
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
