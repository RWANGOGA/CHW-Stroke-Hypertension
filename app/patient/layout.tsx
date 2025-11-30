import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex bg-background text-foreground">
			<Sidebar role="patient" />
			<div className="flex-1">
				<Header title="Patient" avatarSrc="/hero-healthcare-DIF8xrCA.jpg" />
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
}
