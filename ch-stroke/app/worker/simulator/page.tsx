import React from "react";

export default function SimulatorPage() {
	return (
		<section>
			<h2 className="heading-md mb-4">Simulator</h2>
			<p className="mb-4 text-sm text-muted-foreground">Generate and inspect simulated wearable + communication datasets for the prototype.</p>

			<div className="grid gap-4 max-w-3xl">
				<div className="p-4 bg-card border rounded-md">
					<h3 className="text-sm font-medium mb-2">Wearable data example</h3>
					<pre className="text-xs p-2 bg-muted rounded">{
`# sample Python generation (shown for reference)
import numpy as np
n = 56
heart_rate = np.random.normal(loc=82, scale=7, size=n)
step_count = np.random.normal(loc=2500, scale=1200, size=n)
sleep_hours = np.random.normal(loc=6.5, scale=1.0, size=n)`
}</pre>
				</div>

				<div className="p-4 bg-card border rounded-md">
					<h3 className="text-sm font-medium mb-2">Communication sample</h3>
					<pre className="text-xs p-2 bg-muted rounded">{
`{
	"user_id": "P2",
	"channel": "whatsapp",
	"text": "Mild chest tightness this morning but it reduced. No head pressure."
}`
}</pre>
				</div>

				<div className="p-4 bg-card border rounded-md">
					<div className="text-sm">Actions (prototype):</div>
					<div className="mt-2 flex gap-2">
						<button className="px-3 py-1 rounded-md bg-primary-foreground text-white">Push sample dataset</button>
						<button className="px-3 py-1 rounded-md border">Download CSV</button>
					</div>
				</div>
			</div>
		</section>
	);
}
