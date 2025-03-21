"use client"

import { useRef, useEffect } from "react"
import { Chart as ChartJS, type ChartData, type ChartOptions, registerables } from "chart.js"
import { Bar, Line, Pie } from "react-chartjs-2"

ChartJS.register(...registerables)

// Set default options for all charts
const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "hsl(var(--foreground))",
      },
    },
    tooltip: {
      backgroundColor: "hsl(var(--muted))",
      titleColor: "hsl(var(--foreground))",
      bodyColor: "hsl(var(--foreground))",
      borderColor: "hsl(var(--border))",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: {
        color: "hsl(var(--border))",
      },
      ticks: {
        color: "hsl(var(--foreground))",
      },
    },
    y: {
      grid: {
        color: "hsl(var(--border))",
      },
      ticks: {
        color: "hsl(var(--foreground))",
      },
    },
  },
}

// Line Chart Component
export function LineChart({
  data,
  options = {},
}: {
  data: ChartData<"line">
  options?: ChartOptions
}) {
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    // Update chart on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class" && chartRef.current) {
          chartRef.current.update()
        }
      })
    })

    const html = document.documentElement
    observer.observe(html, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <Line ref={chartRef} data={data} options={{ ...defaultOptions, ...options }} />
}

// Bar Chart Component
export function BarChart({
  data,
  options = {},
}: {
  data: ChartData<"bar">
  options?: ChartOptions
}) {
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    // Update chart on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class" && chartRef.current) {
          chartRef.current.update()
        }
      })
    })

    const html = document.documentElement
    observer.observe(html, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <Bar ref={chartRef} data={data} options={{ ...defaultOptions, ...options }} />
}

// Pie Chart Component
export function PieChart({
  data,
  options = {},
}: {
  data: ChartData<"pie">
  options?: ChartOptions
}) {
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    // Update chart on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class" && chartRef.current) {
          chartRef.current.update()
        }
      })
    })

    const html = document.documentElement
    observer.observe(html, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <Pie ref={chartRef} data={data} options={{ ...defaultOptions, ...options }} />
}

