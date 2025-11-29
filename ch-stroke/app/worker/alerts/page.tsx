import React from "react";

type AlertItem = {
	id: string;
	patient: string;
	level: "low" | "moderate" | "high";
	reason: string;
	timestamp: string;
};

const sampleAlerts: AlertItem[] = [
	{ id: "A1", patient: "P2", level: "high", reason: "Chest pain reported + rising HR", timestamp: "2025-11-28T09:12:00Z" },
	{ id: "A2", patient: "P5", level: "moderate", reason: "Low steps 3 days + HR drift", timestamp: "2025-11-29T07:20:00Z" },
	{ id: "A3", patient: "P3", level: "low", reason: "Missed medication (self-report)", timestamp: "2025-11-27T15:30:00Z" },
];

export default function AlertsPage() {
	return (
		<section>
			<h2 className="heading-md mb-4">Alerts</h2>
			<p className="mb-4 text-sm text-muted-foreground">AI-triage alerts generated from simulated data.</p>

			<div className="space-y-3">
				{sampleAlerts.map((a) => (
					<div key={a.id} className="p-3 bg-card border rounded-md flex items-start justify-between">
						<div>
							<div className="flex items-center gap-3">
								<div className={
									"w-3 h-3 rounded-full " + (a.level === "high" ? "bg-destructive" : a.level === "moderate" ? "bg-amber-400" : "bg-green-400")
								} />
								<div className="text-sm font-medium">{a.patient} — {a.reason}</div>
							</div>
							<div className="text-xs text-muted-foreground mt-1">{new Date(a.timestamp).toLocaleString()}</div>
						</div>
						<div className="flex items-center gap-2">
							<button className="px-3 py-1 rounded-md bg-primary-foreground text-white">View</button>
							<button className="px-3 py-1 rounded-md border">Snooze</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

