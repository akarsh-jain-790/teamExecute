"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Simple validation for demo
      if (username === "admin" && password === "1234") {
        localStorage.setItem("user", JSON.stringify({ username, role: "admin" }))
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        })
        router.push("/dashboard")
      } else if (username === "analyst" && password === "1234") {
        localStorage.setItem("user", JSON.stringify({ username, role: "analyst" }))
        toast({
          title: "Login successful",
          description: "Welcome back, Analyst!",
        })
        router.push("/dashboard")
      } else if (username === "viewer" && password === "1234") {
        localStorage.setItem("user", JSON.stringify({ username, role: "viewer" }))
        toast({
          title: "Login successful",
          description: "Welcome back, Viewer!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try admin/1234, analyst/1234, or viewer/1234",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">FDAM</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>admin/1234, analyst/1234, viewer/1234</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

