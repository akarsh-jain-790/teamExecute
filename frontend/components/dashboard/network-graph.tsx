"use client"

import { useEffect, useRef } from "react"
import cytoscape from "cytoscape"

export function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize cytoscape if it doesn't exist
    if (!cyRef.current) {
      // Create cytoscape instance
      cyRef.current = cytoscape({
        container: containerRef.current,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#1e3a8a",
              label: "data(label)",
              color: "#ffffff",
              "text-outline-color": "#1e3a8a",
              "text-outline-width": "1px",
              "font-size": "10px",
              width: "data(size)",
              height: "data(size)",
            },
          },
          {
            selector: "node.fraudulent",
            style: {
              "background-color": "#ef4444",
              "text-outline-color": "#ef4444",
            },
          },
          {
            selector: "node.suspicious",
            style: {
              "background-color": "#f97316",
              "text-outline-color": "#f97316",
            },
          },
          {
            selector: "edge",
            style: {
              width: "data(weight)",
              "line-color": "#94a3b8",
              "curve-style": "bezier",
            },
          },
          {
            selector: "edge.fraudulent",
            style: {
              "line-color": "#ef4444",
              "line-style": "dashed",
            },
          },
        ],
        layout: {
          name: "cose",
          idealEdgeLength: 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: 400000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0,
        },
        elements: generateDummyNetworkData(),
      })

      // Add event listeners
      cyRef.current.on("tap", "node", (evt) => {
        const node = evt.target
        console.log("Tapped node: " + node.id())
      })
    }

    // Cleanup function
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [])

  // Generate dummy network data
  const generateDummyNetworkData = () => {
    const elements = {
      nodes: [
        { data: { id: "user1", label: "User A", size: 30 } },
        { data: { id: "user2", label: "User B", size: 30 } },
        { data: { id: "user3", label: "User C", size: 30 } },
        { data: { id: "user4", label: "User D", size: 30 }, classes: "fraudulent" },
        { data: { id: "user5", label: "User E", size: 30 } },
        { data: { id: "user6", label: "User F", size: 30 }, classes: "suspicious" },
        { data: { id: "merchant1", label: "Merchant X", size: 40 } },
        { data: { id: "merchant2", label: "Merchant Y", size: 40 } },
        { data: { id: "merchant3", label: "Merchant Z", size: 40 }, classes: "suspicious" },
        { data: { id: "device1", label: "Device 1", size: 25 } },
        { data: { id: "device2", label: "Device 2", size: 25 } },
        { data: { id: "device3", label: "Device 3", size: 25 }, classes: "fraudulent" },
        { data: { id: "ip1", label: "IP 1", size: 20 } },
        { data: { id: "ip2", label: "IP 2", size: 20 }, classes: "fraudulent" },
      ],
      edges: [
        { data: { source: "user1", target: "merchant1", weight: 2 } },
        { data: { source: "user1", target: "merchant2", weight: 1 } },
        { data: { source: "user2", target: "merchant1", weight: 3 } },
        { data: { source: "user3", target: "merchant3", weight: 2 } },
        { data: { source: "user4", target: "merchant3", weight: 5 }, classes: "fraudulent" },
        { data: { source: "user4", target: "user6", weight: 4 }, classes: "fraudulent" },
        { data: { source: "user5", target: "merchant2", weight: 2 } },
        { data: { source: "user6", target: "merchant3", weight: 3 }, classes: "fraudulent" },
        { data: { source: "user1", target: "device1", weight: 2 } },
        { data: { source: "user2", target: "device1", weight: 2 } },
        { data: { source: "user3", target: "device2", weight: 2 } },
        { data: { source: "user4", target: "device3", weight: 2 }, classes: "fraudulent" },
        { data: { source: "user6", target: "device3", weight: 2 }, classes: "fraudulent" },
        { data: { source: "device1", target: "ip1", weight: 1 } },
        { data: { source: "device2", target: "ip1", weight: 1 } },
        { data: { source: "device3", target: "ip2", weight: 1 }, classes: "fraudulent" },
      ],
    }

    return elements
  }

  return <div ref={containerRef} className="h-full w-full rounded-md" />
}

