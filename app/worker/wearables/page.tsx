import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { WearableCharts } from "@/components/wearable-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patients, dashboardStats } from "@/lib/simulated-data"
import { StatCard } from "@/components/stat-card"
import { Activity, Heart, Footprints, Moon } from "lucide-react"

export default function WearablesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header title="Wearable Data" subtitle="Simulated health metrics from patient wearables" />
        <main className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <StatCard
              title="Total Readings"
              value={dashboardStats.totalWearableReadings}
              icon={Activity}
              variant="primary"
            />
            <StatCard title="Heart Rate Metrics" value="56/patient" subtitle="14 days x 4 readings" icon={Heart} />
            <StatCard title="Step Count Data" value="56/patient" subtitle="Daily activity tracking" icon={Footprints} />
            <StatCard title="Sleep Data" value="14 days" subtitle="Per patient" icon={Moon} />
          </div>

          {/* Patient Wearable Data */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Wearable Trends</CardTitle>
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
                    <WearableCharts patientId={patient.id} />
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
