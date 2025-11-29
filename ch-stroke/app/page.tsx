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

export default function Index() {
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                {[
                  { icon: Zap, label: "24/7", sublabel: "Emergency Access" },
                  { icon: Activity, label: "3 sec", sublabel: "Data Sync" },
                  { icon: Shield, label: "100%", sublabel: "Life Protection" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 rounded-xl bg-card border shadow-soft">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => router.push("/dashboard")}
                  className="shadow-strong hover:shadow-medium transition-all text-base px-8"
                >
                  View Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base px-8"
                >
                  Learn More
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                Already monitoring patients? <a href="#" className="text-primary font-medium hover:underline">Access dashboard here</a>
              </p>
            </div>

            <div className="relative animate-fade-in">
              <Image 
                src="/hero-healthcare-DIF8xrCA.jpg"
                alt="Healthcare professionals with patients"
                width={1200}
                height={800}
                className="rounded-3xl shadow-strong w-full h-auto"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-strong">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-risk-low" />
                  <div>
                    <div className="text-xs text-muted-foreground">Life-saving technology</div>
                    <div className="font-semibold text-foreground">Trusted by families</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases with Images */}
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
            <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-all group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/hero-healthcare-DIF8xrCA.jpg"
                  alt="Elderly person with wearable device"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">65+ Years</Badge>
                  <h3 className="text-2xl font-display font-bold">Perfect for Seniors</h3>
                  <p className="text-sm text-white/90 mt-1">Peace of mind for families</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Ideal for seniors with hypertension, dementia, or mobility issues. 
                  Continuous monitoring provides security and early detection.
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Medical ID Protection
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-all group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/image.png"
                  alt="Healthcare dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">All Ages</Badge>
                  <h3 className="text-2xl font-display font-bold">AI-Powered Monitoring</h3>
                  <p className="text-sm text-white/90 mt-1">Real-time health insights</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Advanced algorithms analyze vital signs and patterns, 
                  providing health workers with actionable insights instantly.
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Smart Risk Detection
                </div>
              </CardContent>
            </Card>
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

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              How HealthGuard Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to comprehensive health monitoring
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {[
                { num: "1", title: "Data Collection", desc: "Wearable devices monitor vital signs while patients respond to health check-ins" },
                { num: "2", title: "AI Analysis", desc: "Machine learning processes patterns and calculates real-time risk scores" },
                { num: "3", title: "CHW Action", desc: "Health workers receive prioritized alerts and AI-generated recommendations" },
                { num: "4", title: "Early Intervention", desc: "Proactive care prevents emergencies before they happen" }
              ].map((step, idx) => (
                <Card key={idx} className="shadow-medium hover:shadow-strong transition-all border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">{step.num}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Badge variant="secondary" className="px-6 py-3 text-base">
                <Zap className="h-4 w-4 mr-2" />
                Ready in under 5 minutes
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
              <Image 
                src="/image.png"
                alt="Community health worker with patient"
                width={800}
                height={600}
                className="rounded-3xl shadow-strong w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong max-w-xs">
                <div className="text-3xl font-bold text-foreground mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Early risk detection accuracy</div>
                <div className="mt-3 flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-hero border-2 border-white" />
                  ))}
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-medium">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 backdrop-blur-sm text-white border-0">
            Start Protecting Lives Today
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to See the System in Action?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore the CHW dashboard with simulated patient data and AI-powered insights
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="bg-white text-primary hover:bg-white/90 shadow-strong text-base px-8"
            >
              Launch Dashboard Demo
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base px-8"
            >
              For Organizations
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-hero">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-foreground">HealthGuard AI</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 HealthGuard AI • Hypertension & Stroke Prevention System • Technical Prototype</p>
          </div>
        </div>
      </footer>
    </div>
  );
}