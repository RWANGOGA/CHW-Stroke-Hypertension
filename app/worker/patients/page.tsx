import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { PatientCard } from "@/components/patient-card"
import { patients } from "@/lib/simulated-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, List } from "lucide-react"

export default function PatientsPage() {
  const highRisk = patients.filter((p) => p.riskLevel === "high")
  const moderateRisk = patients.filter((p) => p.riskLevel === "moderate")
  const lowRisk = patients.filter((p) => p.riskLevel === "low")

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[72px]">
        <Header title="Patients" subtitle="Manage and monitor all enrolled patients" />
        <main className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search patients..." className="pl-9 h-10 bg-card" />
            </div>
            <Button variant="outline" className="h-10 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex border rounded-lg overflow-hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none bg-primary/10">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* High Risk Section */}
          {highRisk.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <h2 className="text-lg font-semibold">High Risk ({highRisk.length})</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {highRisk.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            </section>
          )}

          {/* Moderate Risk Section */}
          {moderateRisk.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <h2 className="text-lg font-semibold">Moderate Risk ({moderateRisk.length})</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {moderateRisk.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            </section>
          )}

          {/* Low Risk Section */}
          {lowRisk.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-semibold">Low Risk ({lowRisk.length})</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lowRisk.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
