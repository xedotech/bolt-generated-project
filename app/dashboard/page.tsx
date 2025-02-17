"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Network, QrCode, Shield, Star, Wallet, Cpu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DailyCaptcha } from "@/components/DailyCaptcha"
import { NodeMap } from "@/components/NodeMap"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [isConnected, setIsConnected] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [nodes, setNodes] = useState([])
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login"
    }

    // Check if daily CAPTCHA is needed
    const lastVerification = localStorage.getItem("lastCaptchaVerification")
    const now = new Date().getTime()
    if (!lastVerification || now - Number.parseInt(lastVerification) > 24 * 60 * 60 * 1000) {
      setShowCaptcha(true)
    }

    // Fetch nodes for the map
    fetch("/api/nodes/discover")
      .then((response) => response.json())
      .then((data) => setNodes(data.nodes))
      .catch((error) => console.error("Error fetching nodes:", error))

    // Fetch wallet balance
    fetch("/api/wallet/balance")
      .then((response) => response.json())
      .then((data) => setBalance(data.balance))
      .catch((error) => console.error("Error fetching balance:", error))
  }, [status])

  const handleCaptchaVerify = () => {
    setShowCaptcha(false)
    localStorage.setItem("lastCaptchaVerification", new Date().getTime().toString())
  }

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        const response = await fetch("/api/mining/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodeId: "current-device-id" }),
        })
        const data = await response.json()
        if (data.success) {
          setIsConnected(true)
        } else {
          console.error("Failed to start mining:", data.error)
        }
      } catch (error) {
        console.error("Error starting mining:", error)
      }
    } else {
      setIsConnected(false)
      // Implement disconnect logic here
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Node Dashboard</h1>
            <p className="text-muted-foreground">Monitor your node performance and earnings</p>
          </div>
          <div>
            <Button variant={isConnected ? "destructive" : "default"} onClick={handleConnect}>
              {isConnected ? "Disconnect" : "Connect"}
            </Button>
            <Button variant="secondary" onClick={() => signOut()} className="ml-2">
              Sign Out
            </Button>
          </div>
        </header>

        {showCaptcha && (
          <div className="mb-8">
            <DailyCaptcha onVerify={handleCaptchaVerify} />
          </div>
        )}

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Node Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-medium">Your Node</div>
                    <div className="text-sm text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-medium">Uptime</div>
                    <div className="text-sm text-muted-foreground">{isConnected ? "2h 45m" : "0h 0m"}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth Usage</span>
                    <span>{isConnected ? "78%" : "0%"}</span>
                  </div>
                  <Progress value={isConnected ? 78 : 0} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{balance} SHD</div>
                <Link href="/wallet">
                  <Button variant="outline" className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Manage Wallet
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{nodes.length} Nodes</div>
                <Link href="/network">
                  <Button variant="outline" className="w-full">
                    <Network className="w-4 h-4 mr-2" />
                    View Network
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">5 Active</div>
                <Link href="/tasks">
                  <Button variant="outline" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    View Tasks
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mobile Mining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">Active</div>
                <Link href="/mobile-mining">
                  <Button variant="outline" className="w-full">
                    <Cpu className="w-4 h-4 mr-2" />
                    Manage Mining
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Network Map</CardTitle>
            </CardHeader>
            <CardContent>
              <NodeMap nodes={nodes} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain ID Passport</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage your decentralized identity and reputation</p>
              <Link href="/passport">
                <Button variant="outline" className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  View Passport
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
