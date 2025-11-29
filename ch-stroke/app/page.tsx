"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Heart, MessageSquare, TrendingUp, Shield, Users,
  Brain, ChevronRight, CheckCircle2, Zap, Award
} from "lucide-react";

// Images are served from the `public/` folder. Replace these placeholders
// with actual image files in `public/` or add an `assets/` folder and update imports.
const heroImage = "/hero-healthcare-DIF8xrCA.jpg";
const elderlyImage = "/hero-healthcare-DIF8xrCA.jpg"; // TODO: replace with actual elderly image
const dashboardImage = "/hero-healthcare-DIF8xrCA.jpg"; // TODO: replace with actual dashboard image
const chwImage = "/hero-healthcare-DIF8xrCA.jpg"; // existing file in public/

const Index = () => {
  const router = useRouter();

  const features = [
    {
      icon: Heart,
      title: "Wearable Integration",
      description: "Continuous monitoring of heart rate, activity levels, and sleep patterns through seamless wearable device integration"
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel Communication",
      description: "Reach patients through WhatsApp, SMS, and IVR voice calls for comprehensive engagement"
    },
    {
      icon: Brain,
      title: "AI-Powered Triage",
      description: "Advanced machine learning algorithms analyze data patterns and generate intelligent risk assessments"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Early warning systems and trend detection for proactive stroke prevention"
    }
  ];

  const stats = [
    { icon: Zap, label: "24/7 Monitoring", value: "Real-time" },
    { icon: Users, label: "Patients Protected", value: "5+" },
    { icon: Shield, label: "AI Accuracy", value: "95%" },
    { icon: Award, label: "Response Time", value: "< 3min" }
  ];

  const benefits = [
    "Real-time health monitoring",
    "Early risk detection",
    "Automated patient alerts",
    "Comprehensive data analytics",
    "Multi-channel communication",
    "AI-powered insights"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-hero">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">HealthGuard AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
            <Button onClick={() => router.push("/dashboard")} size="sm">
              View Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Shield className="h-3 w-3 mr-2" />
              Emergency QR Technology
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Your <span className="text-primary">life-saving</span>{" "}
              <span className="text-secondary">AI</span> in case of{" "}
              <span className="text-success">emergency</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              AI-powered community health monitoring system combining wearable data, 
              patient communication, and intelligent triage for early intervention
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[{ icon: Zap, label: "24/7", sublabel: "Emergency Access" }, { icon: Activity, label: "3 sec", sublabel: "Data Sync" }, { icon: Shield, label: "100%", sublabel: "Life Protection" }].map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-xl bg-card border shadow-soft">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => router.push("/dashboard")} className="shadow-strong hover:shadow-medium transition-all text-base px-8">
                View Dashboard
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Learn More
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Already monitoring patients? <a href="#" className="text-primary font-medium hover:underline">Access dashboard here</a>
            </p>
          </div>

            <div className="relative animate-fade-in">
            <Image src={heroImage} alt="Healthcare professionals with patients" width={1200} height={800} className="rounded-3xl shadow-strong" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-strong flex items-center gap-3">
              <Heart className="h-8 w-8 text-risk-low" />
              <div>
                <div className="text-xs text-muted-foreground">Life-saving technology</div>
                <div className="font-semibold text-foreground">Trusted by families</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Protecting Every Life Stage</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Who Benefits from HealthGuard?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our system protects people across all life stages and health conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[elderlyImage, dashboardImage].map((img, idx) => (
              <Card key={idx} className="overflow-hidden shadow-medium hover:shadow-strong transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={img} alt="Use case" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-primary font-medium">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {idx === 0 ? "Medical ID Protection" : "Smart Risk Detection"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Quick & Easy Process</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Comprehensive Health Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrated data streams and AI analysis for proactive stroke prevention
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} className="shadow-soft hover:shadow-medium transition-all border-0 bg-gradient-card">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Badge variant="outline" className="mb-4">Key Benefits</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Why Healthcare Providers Choose Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our comprehensive monitoring system empowers community health workers 
              with the tools they need to prevent emergencies and save lives.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image src={chwImage} alt="Community health worker with patient" width={800} height={520} className="rounded-3xl shadow-strong" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
