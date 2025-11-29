"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "./risk-badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, Eye, Phone, FileText } from "lucide-react"
import { patients } from "@/lib/simulated-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PatientTableProps {
  showSearch?: boolean
  limit?: number
}

export function PatientTable({ showSearch = true, limit }: PatientTableProps) {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "risk" | "adherence">("risk")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.id.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "risk") {
        const riskOrder = { high: 3, moderate: 2, low: 1 }
        comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
      } else if (sortBy === "adherence") {
        comparison = a.adherenceScore - b.adherenceScore
      }
      return sortOrder === "desc" ? -comparison : comparison
    })
    .slice(0, limit)

  const handleSort = (column: "name" | "risk" | "adherence") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort by {sortBy}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSort("risk")}>Risk Level</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("adherence")}>Adherence</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="hidden md:table-cell">Conditions</TableHead>
              <TableHead className="hidden lg:table-cell">Adherence</TableHead>
              <TableHead className="hidden lg:table-cell">Last Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.id} &middot; {patient.age}y &middot; {patient.gender}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <RiskBadge level={patient.riskLevel} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {patient.knownHypertension && (
                      <Badge variant="secondary" className="text-xs">
                        HTN
                      </Badge>
                    )}
                    {patient.pastStrokeHistory && (
                      <Badge variant="secondary" className="text-xs">
                        Stroke Hx
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${
                          patient.adherenceScore >= 90
                            ? "bg-emerald-500"
                            : patient.adherenceScore >= 70
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${patient.adherenceScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{patient.adherenceScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm text-muted-foreground">
                    {new Date(patient.lastContact).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call patient</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View notes</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
