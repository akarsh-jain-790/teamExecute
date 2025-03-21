import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Network, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FDAM</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                <span className="text-primary">Fraud Detection, Redefined</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Secure Payments with AI</p>
            </div>
            <div className="space-x-4">
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform offers cutting-edge tools to detect and prevent fraud
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card hover:border-primary transition-colors">
              <ShieldCheck className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Real-Time Detection</h3>
              <p className="text-sm text-muted-foreground text-center">
                Identify fraudulent transactions as they happen with our AI-powered system
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card hover:border-primary transition-colors">
              <BarChart3 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">AI Insights</h3>
              <p className="text-sm text-muted-foreground text-center">
                Leverage machine learning to uncover hidden patterns and anomalies
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card hover:border-primary transition-colors">
              <Globe className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Geo-spatial Analysis</h3>
              <p className="text-sm text-muted-foreground text-center">
                Visualize fraud hotspots and track suspicious activities across regions
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card hover:border-primary transition-colors">
              <Network className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Network Detection</h3>
              <p className="text-sm text-muted-foreground text-center">
                Uncover fraud networks and connections between suspicious entities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 FDAM by xAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

