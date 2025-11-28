import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex bg-background text-foreground">
			<Sidebar role="worker" />
			<div className="flex-1">
				<Header title="Worker" avatarSrc="/hero-healthcare-DIF8xrCA.jpg" />
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
}
