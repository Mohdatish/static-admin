"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Database, Shield, Bell, Zap, Globe, Save, RefreshCw, CheckCircle, AlertTriangle, Info } from "lucide-react"

export function SettingsPage() {
  const [isSaving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [systemSettings, setSystemSettings] = useState({
    apiTimeout: "30",
    maxRetries: "3",
    rateLimitPerMinute: "1000",
    logRetentionDays: "90",
    enableCaching: true,
    enableCompression: true,
    enableMetrics: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    enforceHttps: true,
    enableCors: true,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    enableAuditLog: true,
    requireMfa: false,
    allowedIpRanges: "0.0.0.0/0",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableSlack: false,
    slackWebhook: "",
    enableEmail: true,
    emailRecipients: "admin@company.com",
    enableSms: false,
    smsNumbers: "",
    alertThresholds: {
      errorRate: "5",
      responseTime: "1000",
      downtime: "5",
    },
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    enableWebhooks: true,
    webhookUrl: "https://api.company.com/webhooks",
    enableDatadog: false,
    datadogApiKey: "",
    enableNewRelic: false,
    newRelicLicenseKey: "",
    enableSentry: true,
    sentryDsn: "https://sentry.io/...",
  })

  const handleSaveSettings = async (settingsType: string) => {
    setSaving(true)
    setSuccessMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccessMessage(`${settingsType} settings saved successfully!`)
    setTimeout(() => setSuccessMessage(""), 3000)
    setSaving(false)
  }

  const handleTestConnection = async (service: string) => {
    setSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSuccessMessage(`${service} connection test successful!`)
    setTimeout(() => setSuccessMessage(""), 3000)
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and integrations</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure API behavior and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
                  <Input
                    id="api-timeout"
                    value={systemSettings.apiTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, apiTimeout: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-retries">Max Retries</Label>
                  <Input
                    id="max-retries"
                    value={systemSettings.maxRetries}
                    onChange={(e) => setSystemSettings({ ...systemSettings, maxRetries: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (per minute)</Label>
                  <Input
                    id="rate-limit"
                    value={systemSettings.rateLimitPerMinute}
                    onChange={(e) => setSystemSettings({ ...systemSettings, rateLimitPerMinute: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input
                    id="log-retention"
                    value={systemSettings.logRetentionDays}
                    onChange={(e) => setSystemSettings({ ...systemSettings, logRetentionDays: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Caching</p>
                    <p className="text-sm text-muted-foreground">Cache API responses to improve performance</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableCaching}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableCaching: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Compression</p>
                    <p className="text-sm text-muted-foreground">Compress API responses to reduce bandwidth</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableCompression}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableCompression: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Metrics</p>
                    <p className="text-sm text-muted-foreground">Collect detailed performance metrics</p>
                  </div>
                  <Switch
                    checked={systemSettings.enableMetrics}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableMetrics: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveSettings("System")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save System Settings"}
              </Button>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription>Configure database connections and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>Database settings require system restart to take effect.</AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Connection Pool Size</Label>
                  <Input defaultValue="20" />
                </div>
                <div className="space-y-2">
                  <Label>Query Timeout (seconds)</Label>
                  <Input defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Backup Retention (days)</Label>
                  <Input defaultValue="30" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSaveSettings("Database")} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Database Settings
                </Button>
                <Button variant="outline" onClick={() => handleTestConnection("Database")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Policies
              </CardTitle>
              <CardDescription>Configure security settings and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enforce HTTPS</p>
                    <p className="text-sm text-muted-foreground">Redirect all HTTP traffic to HTTPS</p>
                  </div>
                  <Switch
                    checked={securitySettings.enforceHttps}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enforceHttps: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable CORS</p>
                    <p className="text-sm text-muted-foreground">Allow cross-origin requests</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableCors}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableCors: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Audit Log</p>
                    <p className="text-sm text-muted-foreground">Log all user actions and system events</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableAuditLog}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableAuditLog: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require MFA</p>
                    <p className="text-sm text-muted-foreground">Require multi-factor authentication for all users</p>
                  </div>
                  <Switch
                    checked={securitySettings.requireMfa}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireMfa: checked })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                  <Input
                    id="session-timeout"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Allowed IP Ranges</Label>
                <Input
                  id="allowed-ips"
                  value={securitySettings.allowedIpRanges}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIpRanges: e.target.value })}
                  placeholder="192.168.1.0/24, 10.0.0.0/8"
                />
                <p className="text-sm text-muted-foreground">
                  Comma-separated list of IP ranges. Use 0.0.0.0/0 to allow all IPs.
                </p>
              </div>

              <Button onClick={() => handleSaveSettings("Security")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Alert Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>Configure when to trigger alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="error-rate">Error Rate (%)</Label>
                  <Input
                    id="error-rate"
                    value={notificationSettings.alertThresholds.errorRate}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: { ...notificationSettings.alertThresholds, errorRate: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="response-time">Response Time (ms)</Label>
                  <Input
                    id="response-time"
                    value={notificationSettings.alertThresholds.responseTime}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: { ...notificationSettings.alertThresholds, responseTime: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downtime">Downtime (minutes)</Label>
                  <Input
                    id="downtime"
                    value={notificationSettings.alertThresholds.downtime}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: { ...notificationSettings.alertThresholds, downtime: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Channels
              </CardTitle>
              <CardDescription>Configure how and where to send alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Send alerts via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableEmail}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableEmail: checked })
                    }
                  />
                </div>
                {notificationSettings.enableEmail && (
                  <div className="space-y-2">
                    <Label htmlFor="email-recipients">Email Recipients</Label>
                    <Input
                      id="email-recipients"
                      value={notificationSettings.emailRecipients}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, emailRecipients: e.target.value })
                      }
                      placeholder="admin@company.com, ops@company.com"
                    />
                  </div>
                )}
              </div>

              {/* Slack Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Slack Notifications</p>
                    <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableSlack}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableSlack: checked })
                    }
                  />
                </div>
                {notificationSettings.enableSlack && (
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      value={notificationSettings.slackWebhook}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, slackWebhook: e.target.value })
                      }
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                )}
              </div>

              {/* SMS Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableSms}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableSms: checked })
                    }
                  />
                </div>
                {notificationSettings.enableSms && (
                  <div className="space-y-2">
                    <Label htmlFor="sms-numbers">Phone Numbers</Label>
                    <Input
                      id="sms-numbers"
                      value={notificationSettings.smsNumbers}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNumbers: e.target.value })}
                      placeholder="+1234567890, +0987654321"
                    />
                  </div>
                )}
              </div>

              <Button onClick={() => handleSaveSettings("Notification")} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* Webhooks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Webhooks
              </CardTitle>
              <CardDescription>Configure webhook endpoints for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Webhooks</p>
                  <p className="text-sm text-muted-foreground">Send events to external systems</p>
                </div>
                <Switch
                  checked={integrationSettings.enableWebhooks}
                  onCheckedChange={(checked) =>
                    setIntegrationSettings({ ...integrationSettings, enableWebhooks: checked })
                  }
                />
              </div>
              {integrationSettings.enableWebhooks && (
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={integrationSettings.webhookUrl}
                    onChange={(e) => setIntegrationSettings({ ...integrationSettings, webhookUrl: e.target.value })}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monitoring Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Integrations</CardTitle>
              <CardDescription>Connect with external monitoring and observability tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Datadog */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DD</span>
                    </div>
                    <div>
                      <p className="font-medium">Datadog</p>
                      <p className="text-sm text-muted-foreground">Send metrics and logs to Datadog</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrationSettings.enableDatadog ? "default" : "secondary"}>
                      {integrationSettings.enableDatadog ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch
                      checked={integrationSettings.enableDatadog}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableDatadog: checked })
                      }
                    />
                  </div>
                </div>
                {integrationSettings.enableDatadog && (
                  <div className="space-y-2">
                    <Label htmlFor="datadog-key">Datadog API Key</Label>
                    <Input
                      id="datadog-key"
                      type="password"
                      value={integrationSettings.datadogApiKey}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, datadogApiKey: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              {/* New Relic */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">NR</span>
                    </div>
                    <div>
                      <p className="font-medium">New Relic</p>
                      <p className="text-sm text-muted-foreground">Application performance monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrationSettings.enableNewRelic ? "default" : "secondary"}>
                      {integrationSettings.enableNewRelic ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch
                      checked={integrationSettings.enableNewRelic}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableNewRelic: checked })
                      }
                    />
                  </div>
                </div>
                {integrationSettings.enableNewRelic && (
                  <div className="space-y-2">
                    <Label htmlFor="newrelic-key">New Relic License Key</Label>
                    <Input
                      id="newrelic-key"
                      type="password"
                      value={integrationSettings.newRelicLicenseKey}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, newRelicLicenseKey: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Sentry */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-purple-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div>
                      <p className="font-medium">Sentry</p>
                      <p className="text-sm text-muted-foreground">Error tracking and performance monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={integrationSettings.enableSentry ? "default" : "secondary"}>
                      {integrationSettings.enableSentry ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch
                      checked={integrationSettings.enableSentry}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableSentry: checked })
                      }
                    />
                  </div>
                </div>
                {integrationSettings.enableSentry && (
                  <div className="space-y-2">
                    <Label htmlFor="sentry-dsn">Sentry DSN</Label>
                    <Input
                      id="sentry-dsn"
                      value={integrationSettings.sentryDsn}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, sentryDsn: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSaveSettings("Integration")} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Integration Settings
                </Button>
                <Button variant="outline" onClick={() => handleTestConnection("All Integrations")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Test All Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
