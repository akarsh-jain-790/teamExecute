"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export function FraudMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2)

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapInstanceRef.current)

      // Generate dummy fraud hotspots
      const fraudHotspots = [
        { lat: 40.7128, lng: -74.006, intensity: 95, transactions: 120 }, // New York
        { lat: 34.0522, lng: -118.2437, intensity: 88, transactions: 95 }, // Los Angeles
        { lat: 51.5074, lng: -0.1278, intensity: 92, transactions: 110 }, // London
        { lat: 48.8566, lng: 2.3522, intensity: 85, transactions: 78 }, // Paris
        { lat: 55.7558, lng: 37.6173, intensity: 90, transactions: 105 }, // Moscow
        { lat: 35.6762, lng: 139.6503, intensity: 82, transactions: 65 }, // Tokyo
        { lat: 22.3193, lng: 114.1694, intensity: 94, transactions: 115 }, // Hong Kong
        { lat: 1.3521, lng: 103.8198, intensity: 87, transactions: 82 }, // Singapore
        { lat: -33.8688, lng: 151.2093, intensity: 80, transactions: 60 }, // Sydney
        { lat: 19.4326, lng: -99.1332, intensity: 91, transactions: 108 }, // Mexico City
      ]

      // Add fraud hotspots to map
      fraudHotspots.forEach((spot) => {
        const radius = (spot.intensity / 10) * 50000 // Scale radius based on intensity
        const color = getColorForIntensity(spot.intensity)

        const circle = L.circle([spot.lat, spot.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: radius,
        }).addTo(mapInstanceRef.current!)

        circle.bindPopup(`
          <div style="text-align: center;">
            <h3 style="margin: 0; font-size: 16px;">Fraud Hotspot</h3>
            <p style="margin: 5px 0;">Risk Score: <strong>${spot.intensity}%</strong></p>
            <p style="margin: 5px 0;">Flagged Transactions: <strong>${spot.transactions}</strong></p>
          </div>
        `)
      })
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Helper function to get color based on intensity
  const getColorForIntensity = (intensity: number): string => {
    if (intensity >= 90) return "#ef4444" // Red
    if (intensity >= 80) return "#f97316" // Orange
    if (intensity >= 70) return "#eab308" // Yellow
    return "#22c55e" // Green
  }

  return <div ref={mapRef} className="h-full w-full rounded-md" />
}

