import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CommunicationTimeline } from "@/components/communication-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patients, communicationLogs } from "@/lib/simulated-data"
import { StatCard } from "@/components/stat-card"
import { MessageSquare, MessageCircle, Phone } from "lucide-react"

export default function CommunicationsPage() {
  const allLogs = Object.values(communicationLogs).flat()
  const whatsappCount = allLogs.filter((l) => l.channel === "whatsapp").length
  const smsCount = allLogs.filter((l) => l.channel === "sms").length
  const ivrCount = allLogs.filter((l) => l.channel === "ivr").length

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header title="Communications" subtitle="Patient communication logs across all channels" />
        <main className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <StatCard title="Total Communications" value={allLogs.length} icon={MessageSquare} variant="primary" />
            <StatCard title="WhatsApp" value={whatsappCount} icon={MessageCircle} />
            <StatCard title="SMS" value={smsCount} icon={MessageSquare} />
            <StatCard title="IVR Calls" value={ivrCount} icon={Phone} />
          </div>

          {/* Patient Communications */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Communication Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={patients[0].id}>
                <TabsList className="mb-4 flex-wrap">
                  {patients.map((patient) => (
                    <TabsTrigger key={patient.id} value={patient.id}>
                      {patient.name.split(" ")[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {patients.map((patient) => (
                  <TabsContent key={patient.id} value={patient.id}>
                    <CommunicationTimeline patientId={patient.id} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
