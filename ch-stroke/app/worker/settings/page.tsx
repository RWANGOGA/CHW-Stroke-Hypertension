import React from "react";

export default function SettingsPage() {
	return (
		<section>
			<h2 className="heading-md mb-4">Worker Settings</h2>
			<p className="mb-4 text-sm text-muted-foreground">Settings for the CHW dashboard (prototype).</p>

			<div className="grid gap-4 max-w-2xl">
				<div className="p-4 bg-card border rounded-md">
					<label className="block text-sm font-medium">Notification channel</label>
					<div className="mt-2 flex gap-2">
						<button className="px-3 py-1 rounded-md border">WhatsApp</button>
						<button className="px-3 py-1 rounded-md border">SMS</button>
						<button className="px-3 py-1 rounded-md border">IVR</button>
					</div>
				</div>

				<div className="p-4 bg-card border rounded-md">
					<label className="block text-sm font-medium">Simulation controls</label>
					<div className="mt-2 text-sm text-muted-foreground">Adjust how simulated data is generated (placeholder).</div>
				</div>
			</div>
		</section>
	);
}
