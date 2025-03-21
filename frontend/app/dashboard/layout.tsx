"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  AlertTriangle,
  Bell,
  BookOpen,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

interface UserType {
  username: string
  role: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [user, setUser] = useState<UserType | null>(null)
  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string }[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }

    // Generate dummy notifications
    setNotifications([
      { id: 1, title: "High Risk Transaction", message: "Transaction #45678 flagged as high risk" },
      { id: 2, title: "New Pattern Detected", message: "Unusual activity detected in payment gateway" },
      { id: 3, title: "Rule Triggered", message: "Rule 'Velocity Check' triggered 5 times in the last hour" },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/login")
  }

  if (!mounted || !user) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">FDAM</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <a href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/fraud-reporting"}
                  tooltip="Fraud Reporting"
                >
                  <a href="/dashboard/fraud-reporting">
                    <FileText className="h-5 w-5" />
                    <span>Fraud Reporting</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/investigation"} tooltip="Investigation">
                  <a href="/dashboard/investigation">
                    <ClipboardList className="h-5 w-5" />
                    <span>Investigation</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user.role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/rule-engine"} tooltip="Rule Engine">
                    <a href="/dashboard/rule-engine">
                      <Settings className="h-5 w-5" />
                      <span>Rule Engine</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/api-docs"} tooltip="API Docs">
                  <a href="/dashboard/api-docs">
                    <BookOpen className="h-5 w-5" />
                    <span>API Docs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">{user.username}</span>
                <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">{user.role}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">
                {pathname === "/dashboard"
                  ? "Dashboard"
                  : pathname === "/dashboard/fraud-reporting"
                    ? "Fraud Reporting"
                    : pathname === "/dashboard/rule-engine"
                      ? "Rule Engine Configuration"
                      : pathname === "/dashboard/investigation"
                        ? "Fraud Investigation"
                        : pathname === "/dashboard/api-docs"
                          ? "API Documentation"
                          : ""}
              </h1>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                        {notifications.length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                        <div className="flex w-full items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                          <span className="font-medium">{notification.title}</span>
                        </div>
                        <span className="mt-1 text-xs text-muted-foreground">{notification.message}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

