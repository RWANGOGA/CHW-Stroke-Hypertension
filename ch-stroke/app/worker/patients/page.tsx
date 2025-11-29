import React from "react";
import Link from "next/link";

type Patient = {
	id: string;
	name: string;
	ageBracket: string;
	hypertension: boolean;
	lastAlert?: string;
};

const samplePatients: Patient[] = [
	{ id: "P1", name: "Amina Yusuf", ageBracket: "25-34", hypertension: false, lastAlert: "2025-11-27" },
	{ id: "P2", name: "Grace Mensah", ageBracket: "35-44", hypertension: true, lastAlert: "2025-11-28" },
	{ id: "P3", name: "Nadia Kamau", ageBracket: "45-54", hypertension: true },
	{ id: "P4", name: "Fatima Ali", ageBracket: "18-24", hypertension: false, lastAlert: "2025-11-26" },
	{ id: "P5", name: "Rose Akello", ageBracket: "55-64", hypertension: true, lastAlert: "2025-11-29" },
];

export default function PatientsPage() {
	return (
		<section>
			<h2 className="heading-md mb-4">Patients</h2>
			<p className="mb-6 text-sm text-muted-foreground">List of simulated patients for the CHW dashboard.</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{samplePatients.map((p) => (
					<article key={p.id} className="p-4 bg-card border rounded-md">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-sm font-medium">{p.name}</div>
								<div className="text-xs opacity-80">ID: {p.id} · {p.ageBracket}</div>
							</div>
							<div className="text-sm">
								<span className={p.hypertension ? "text-destructive font-semibold" : "text-muted-foreground"}>
									{p.hypertension ? "Hypertension" : "No HTN"}
								</span>
							</div>
						</div>

						<div className="mt-3 flex items-center justify-between">
							<div className="text-xs text-muted-foreground">Last alert: {p.lastAlert ?? "—"}</div>
							<Link href={`/worker/patients/${p.id}`} className="text-sm text-primary-foreground hover:underline">View</Link>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
