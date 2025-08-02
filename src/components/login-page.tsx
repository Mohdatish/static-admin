"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { Activity, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from "lucide-react"

// Demo users for different roles
const demoUsers = [
  {
    email: "admin@acme.com",
    password: "admin123",
    name: "John Smith",
    role: "Admin",
    tenant: "Acme Corp",
    permissions: ["Full Access", "User Management", "API Controls"],
  },
  {
    email: "editor@techstart.com",
    password: "editor123",
    name: "Sarah Johnson",
    role: "Editor",
    tenant: "TechStart Inc",
    permissions: ["View Data", "Edit Configs", "Trigger APIs"],
  },
  {
    email: "viewer@global.com",
    password: "viewer123",
    name: "Mike Wilson",
    role: "Viewer",
    tenant: "Global Solutions",
    permissions: ["View Data", "View Logs"],
  },
]

interface LoginPageProps {
  onLogin: (authenticated: boolean) => void
  setUser: (user: any) => void
}

export function LoginPage({ onLogin, setUser }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check demo users
    const user = demoUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      setUser(user)
      onLogin(true)

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ email, rememberMe: true }))
      }
    } else {
      setError("Invalid email or password. Try one of the demo accounts below.")
      setShowDemoAccounts(true)
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (demoUser: (typeof demoUsers)[0]) => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setUser(demoUser)
    onLogin(true)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive"
      case "Editor":
        return "default"
      case "Viewer":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-3 w-3" />
      case "Editor":
        return <CheckCircle className="h-3 w-3" />
      case "Viewer":
        return <Eye className="h-3 w-3" />
      default:
        return <Shield className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your multi-tenant admin account</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the admin portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              >
                {showDemoAccounts ? "Hide" : "Show"} Demo Accounts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        {showDemoAccounts && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demo Accounts</CardTitle>
              <CardDescription>Click any account below to sign in instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleDemoLogin(user)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{user.name}</span>
                      <Badge variant={getRoleColor(user.role)} className="flex items-center gap-1">
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.tenant}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Admin Portal. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <Button variant="link" className="text-xs p-0 h-auto">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-xs p-0 h-auto">
              Terms of Service
            </Button>
            <Button variant="link" className="text-xs p-0 h-auto">
              Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
