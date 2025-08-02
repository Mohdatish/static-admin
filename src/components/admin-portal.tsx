"use client"

import { useState } from "react"
import { BarChart3, FileText, Zap, Users, Settings, Activity, Bell, Search, User, LogOut, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Dashboard } from "../components/dashboard"
import { ApiLogs } from "../components/api-logs"
import { Triggers } from "../components/triggers"
import { UserManagement } from "../components/user-management"
import { ApiControls } from "../components/api-controls"
import { LoginPage } from "../components/login-page"
import { ProfilePage } from "../components/profile-page"
import { SettingsPage } from "../components/settings-page"

const navigation = [
  { name: "Dashboard", icon: BarChart3, id: "dashboard" },
  { name: "API Logs", icon: FileText, id: "logs" },
  { name: "Triggers", icon: Zap, id: "triggers" },
  { name: "API Controls", icon: Settings, id: "controls" },
  { name: "Users", icon: Users, id: "users" },
  { name: "Profile", icon: User, id: "profile" },
  { name: "Settings", icon: Settings, id: "settings" },
]

export function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "logs":
        return <ApiLogs />
      case "triggers":
        return <Triggers />
      case "controls":
        return <ApiControls />
      case "users":
        return <UserManagement />
      case "profile":
        return <ProfilePage user={user} setUser={setUser} />
      case "settings":
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  const Sidebar = ({ mobile = false }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4">
        <Activity className="h-8 w-8 text-primary" />
        <span className="ml-2 text-lg font-semibold">Admin Portal</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id)
              if (mobile) setSidebarOpen(false)
            }}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  )

  if (!isAuthenticated) {
    return <LoginPage onLogin={setIsAuthenticated} setUser={setUser} />
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r bg-card lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <div className="relative ml-4 w-96 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search logs, tenants, APIs..." className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{"Admin User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setIsAuthenticated(false)
                    setUser(null)
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
