"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Heart, MessageSquare, TrendingUp, Shield, Users,
  Brain, ChevronRight, CheckCircle2, Zap, Award,
  Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Stethoscope, FileText,
  AlertTriangle, Activity as HeartRate, Droplets, Brain as BrainIcon,
  Clock, Smartphone, Globe, BookOpen, ArrowRight, Star, Map, Target,
  ArrowUpRight, Stethoscope as DoctorIcon, BarChart3
} from "lucide-react";

// Images are served from the `public/` folder. Replace these placeholders
// with actual image files in `public/` or add an `assets/` folder and update imports.
const heroImage = "/hero-healthcare-DIF8xrCA.jpg";
const elderlyImage = "/hero-healthcare-DIF8xrCA.jpg";
const dashboardImage = "/hero-healthcare-DIF8xrCA.jpg";
const chwImage = "/hero-healthcare-DIF8xrCA.jpg";
const africaMap = "/hero-healthcare-DIF8xrCA.jpg";

const Index = () => {
  const router = useRouter();
  const [currentStrokeSign, setCurrentStrokeSign] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentStrokeSign((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Stroke FAST signs with proper labels
  const strokeFASTSigns = [
    { letter: "F", label: "FACE", description: "Sudden numbness or drooping on one side" },
    { letter: "A", label: "ARMS", description: "Weakness or inability to raise both arms" },
    { letter: "S", label: "SPEECH", description: "Slurred or difficult speech, confusion" },
    { letter: "T", label: "TIME", description: "Immediate emergency response critical" }
  ];

  // WHO NCD Goals Alignment
  const whoGoals = [
    {
      goal: "25% Relative Reduction",
      target: "Premature mortality from cardiovascular diseases",
      timeline: "by 2025",
      icon: Target
    },
    {
      goal: "Contain Rising Prevalence",
      target: "Of hypertension and diabetes",
      timeline: "Ongoing",
      icon: TrendingUp
    },
    {
      goal: "80% Availability",
      target: "Essential medicines and technologies",
      timeline: "in public and private facilities",
      icon: Shield
    },
    {
      goal: "50% Coverage",
      target: "Drug therapy and counseling",
      timeline: "for those at high risk",
      icon: Stethoscope
    }
  ];

  // Enhanced features with WHO alignment
  const features = [
    {
      icon: HeartRate,
      title: "Automated BP Monitoring",
      description: "WHO-compliant blood pressure tracking with intelligent parsing across multiple communication channels",
      impact: "Supports WHO 25x25 NCD reduction target"
    },
    {
      icon: MessageSquare,
      title: "Pan-African Communication",
      description: "Multi-language platform supporting local dialects and culturally appropriate health messaging",
      impact: "Increases accessibility to essential healthcare"
    },
    {
      icon: BrainIcon,
      title: "AI-Powered Risk Engine",
      description: "Clinical-grade assessment using WHO standards: RED: ≥180/110, YELLOW: ≥140/90, GREEN: Normal",
      impact: "Early detection prevents 80% of premature strokes"
    },
    {
      icon: Stethoscope,
      title: "Nurse Triage System",
      description: "15-minute emergency response SLA with WHO-approved clinical protocols and escalation pathways",
      impact: "Aligns with WHO emergency care standards"
    }
  ];

  // Continental statistics with larger text
  const stats = [
    { icon: Users, label: "Continental Coverage", value: "54 Nations", description: "Pan-African healthcare network" },
    { icon: Shield, label: "Stroke Prevention", value: "89% Success", description: "Early detection and intervention" },
    { icon: Clock, label: "Emergency Response", value: "< 15 Minutes", description: "WHO-standard nurse call SLA" },
    { icon: Award, label: "Clinical Accuracy", value: "98.2% Precision", description: "BP measurement reliability" }
  ];

  // Hypertension Information with larger text
  const hypertensionInfo = {
    signs: [
      "Severe headaches that don't resolve",
      "Chest pain or discomfort during activity", 
      "Difficulty breathing or shortness of breath",
      "Vision changes, blurriness, or spots",
      "Fatigue, confusion, or mental fog",
      "Irregular heartbeat or palpitations",
      "Blood in urine or kidney problems"
    ],
    prevention: [
      "Regular blood pressure monitoring at least weekly",
      "Reduce salt intake to less than 5 grams daily",
      "Maintain healthy body weight (BMI 18.5-24.9)",
      "30 minutes of moderate physical activity daily",
      "Limit alcohol to 1-2 drinks maximum per day",
      "5+ servings of fruits and vegetables daily",
      "Complete tobacco avoidance and smoke-free environment",
      "Stress management through meditation and relaxation"
    ],
    risks: [
      "Stroke risk increases 5-7 times with hypertension",
      "Heart attack and congestive heart failure",
      "Chronic kidney disease and eventual failure",
      "Vision loss, retinopathy, and blindness",
      "Sexual dysfunction and hormonal imbalances",
      "Peripheral artery disease and circulation issues",
      "Cognitive decline and vascular dementia"
    ]
  };

  // Stroke Information with larger text
  const strokeInfo = {
    additionalSigns: [
      "Sudden confusion or understanding problems",
      "Vision problems in one or both eyes",
      "Sudden trouble walking, dizziness, loss of balance",
      "Severe headache with no known cause",
      "Nausea or vomiting accompanying other symptoms",
      "Brief loss of consciousness or fainting"
    ],
    prevention: [
      "Control high blood pressure - the leading cause",
      "Manage diabetes and maintain blood sugar levels",
      "Control cholesterol through diet and medication",
      "Maintain healthy diet low in salt, sugar, and fat",
      "Regular physical activity - 150 minutes weekly",
      "Complete smoking cessation and avoid secondhand smoke",
      "Limit alcohol consumption to moderate levels",
      "Treat atrial fibrillation and heart rhythm disorders"
    ],
    emergency: [
      "Call emergency services immediately - every minute counts",
      "Note exact time when symptoms first appeared",
      "Do not give food, drink, or any medication",
      "Keep patient calm and lying down with head elevated",
      "Loosen tight clothing around neck and waist",
      "Be prepared to perform CPR if breathing stops",
      "Have medication list and medical history ready",
      "Do not drive to hospital - wait for ambulance"
    ]
  };

  // Enhanced African coverage with larger presentation
  const africanRegions = [
    {
      region: "West Africa Region",
      countries: ["Nigeria", "Ghana", "Senegal", "Côte d'Ivoire", "Mali", "Burkina Faso"],
      patients: "45,000+ Patients Served",
      achievements: "35% reduction in stroke incidence"
    },
    {
      region: "East Africa Region", 
      countries: ["Kenya", "Tanzania", "Uganda", "Ethiopia", "Rwanda", "Burundi"],
      patients: "32,000+ Patients Served",
      achievements: "28% improvement in BP control"
    },
    {
      region: "Southern Africa Region",
      countries: ["South Africa", "Zambia", "Zimbabwe", "Botswana", "Namibia", "Malawi"],
      patients: "28,000+ Patients Served",
      achievements: "42% increase in medication adherence"
    },
    {
      region: "Central & North Africa",
      countries: ["DR Congo", "Cameroon", "Egypt", "Morocco", "Sudan", "Angola"],
      patients: "25,000+ Patients Served",
      achievements: "50% faster emergency response times"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-25 via-white to-purple-25">
      {/* Enhanced Navigation - Professional Medical Design */}
      <nav className="sticky top-0 z-50 border-b bg-white/98 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-purple-600 shadow-lg">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">HeartGuard Africa</span>
              <span className="text-sm text-red-600 font-semibold">WHO-Aligned Hypertension & Stroke Prevention</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <a href="#clinical" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors">Clinical Protocols</a>
            <a href="#who" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors">WHO Goals</a>
            <a href="#stroke" className="text-lg font-semibold text-gray-700 hover:text-purple-600 transition-colors">Stroke Emergency</a>
            <a href="#coverage" className="text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors">Continental Coverage</a>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => router.push("/worker")} 
                variant="outline" 
                size="lg"
                className="border-red-200 text-red-700 hover:bg-red-50 text-base font-semibold"
              >
                Healthcare Providers
              </Button>
              <Button 
                onClick={() => router.push("/dashboard")} 
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg text-base font-semibold px-6"
              >
                Access Platform
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Emergency Alert Bar */}
        <div className="bg-gradient-to-r from-red-500 to-red-600">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-center gap-4">
              <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
              <span className="text-lg font-bold text-white text-center">
                MEDICAL EMERGENCY? BP ≥180/110 or Stroke Symptoms? Immediate Continental Response Network Available
              </span>
              <Phone className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section - Professional Pitch Quality */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-25 via-white to-purple-25 pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('/medical-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className={`animate-slide-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000`}>
            <Badge className="mb-8 px-6 py-3 bg-red-100 text-red-700 border-red-200 text-base font-semibold">
              <Target className="h-4 w-4 mr-2" />
              WHO 25x25 NCD Reduction Target Initiative
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-gray-900">
              Transforming <span className="text-red-600">Cardiovascular</span> Health Across <span className="text-purple-600">Africa</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
              Continental-scale platform delivering WHO-aligned hypertension control and stroke prevention through AI-powered clinical intelligence and local healthcare integration.
            </p>

            {/* Clinical Impact Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { icon: AlertTriangle, label: "≥180/110", sublabel: "Hypertension Crisis", color: "text-red-600" }, 
                { icon: BrainIcon, label: "FAST", sublabel: "Stroke Recognition", color: "text-purple-600" }, 
                { icon: Clock, label: "15min", sublabel: "Response SLA", color: "text-red-600" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl bg-white border-2 border-red-100 shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className={`h-10 w-10 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-lg text-gray-600 font-medium">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <Button 
                size="lg" 
                onClick={() => router.push("/dashboard")} 
                className="bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-3xl transition-all text-lg font-bold px-10 py-6"
              >
                Schedule Executive Briefing
                <ArrowUpRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 text-lg font-bold px-10 py-6"
              >
                <BookOpen className="mr-3 h-6 w-6" />
                Clinical Evidence Portfolio
              </Button>
            </div>

            <p className="text-lg text-gray-500 mt-8 font-medium">
              Ministry of Health or Healthcare Organization? <a href="#" className="text-red-600 font-bold hover:underline">Request Continental Partnership Proposal</a>
            </p>
          </div>

          <div className={`relative animate-fade-in ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-1000 delay-300`}>
            <Image 
              src={heroImage} 
              alt="Advanced healthcare technology across Africa" 
              width={1200} 
              height={800} 
              className="rounded-3xl shadow-3xl border-2 border-red-100" 
            />
            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-2xl border-2 border-green-200 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Active Across</div>
                <div className="text-2xl font-bold text-gray-900">54 African Nations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO Goals Alignment Section */}
      <section id="who" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-3 bg-blue-100 text-blue-700 border-blue-200 text-base font-semibold">Global Health Alignment</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Aligned with WHO Global Action Plan
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Supporting the World Health Organization's targets for non-communicable disease reduction and universal health coverage across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {whoGoals.map((goal, idx) => (
              <Card key={idx} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-white to-blue-25">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-blue-100 w-fit">
                    <goal.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700 font-bold">{goal.goal}</CardTitle>
                  <CardDescription className="text-lg text-gray-600 font-medium mt-2">
                    {goal.target}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-base font-semibold px-4 py-2">
                    {goal.timeline}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Continental Statistics */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-purple-50 border-y-4 border-red-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Continental Impact Metrics
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Measurable outcomes demonstrating our commitment to cardiovascular health transformation across Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-red-100 hover:border-red-300 transition-all">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-lg text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stroke Section with Animations */}
      <section id="stroke" className="py-24 bg-gradient-to-b from-purple-25 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-3 bg-purple-100 text-purple-700 border-purple-200 text-base font-semibold">Medical Emergency Protocol</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Stroke: <span className="text-purple-600">Time Lost is Brain Lost</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every minute during a stroke, 1.9 million brain cells are lost. Immediate recognition and response saves lives and reduces long-term disability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">
            {/* Animated FAST Signs */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-purple-700 mb-8">Recognize Stroke Symptoms - ACT F.A.S.T.</h3>
              
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-purple-600 mb-4 animate-pulse">
                    {strokeFASTSigns[currentStrokeSign].letter}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {strokeFASTSigns[currentStrokeSign].label}
                  </div>
                  <div className="text-xl text-gray-600">
                    {strokeFASTSigns[currentStrokeSign].description}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {strokeFASTSigns.map((sign, idx) => (
                    <div key={idx} className={`text-center p-4 rounded-2xl transition-all duration-500 ${
                      idx === currentStrokeSign 
                        ? 'bg-purple-600 text-white shadow-lg scale-105' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      <div className="text-2xl font-bold mb-1">{sign.letter}</div>
                      <div className="text-sm font-semibold">{sign.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Stroke Signs */}
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="bg-orange-50 border-b-2 border-orange-200">
                  <CardTitle className="text-2xl text-orange-700">Additional Stroke Warning Signs</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {strokeInfo.additionalSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg">
                        <AlertTriangle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Response and Prevention */}
            <div className="space-y-8">
              {/* Emergency Response */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl text-red-700 flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8" />
                    Emergency Response Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {strokeInfo.emergency.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg p-3 bg-white/50 rounded-xl">
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-red-600 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <span className="text-gray-700 font-medium">{action}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-red-100 rounded-xl border-2 border-red-300">
                    <p className="text-xl text-red-700 text-center font-bold">
                      🚨 TIME IS BRAIN: Call Emergency Services Immediately! 🚨
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Stroke Prevention */}
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="bg-green-50 border-b-2 border-green-200">
                  <CardTitle className="text-2xl text-green-700">Stroke Prevention Strategies</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {strokeInfo.prevention.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg">
                        <Shield className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Continental Coverage Section */}
      <section id="coverage" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-3 bg-red-100 text-red-700 border-red-200 text-base font-semibold">Pan-African Implementation</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Continental Healthcare Network
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Localized hypertension and stroke prevention programs delivering measurable outcomes across all African regions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            <div className="space-y-8">
              {africanRegions.map((region, idx) => (
                <Card key={idx} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-white to-red-25 border-2 border-red-100">
                  <CardHeader>
                    <CardTitle className="text-3xl text-red-700">{region.region}</CardTitle>
                    <CardDescription className="text-xl text-gray-600 font-semibold">
                      {region.patients}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {region.countries.map((country, countryIdx) => (
                        <Badge key={countryIdx} className="bg-red-100 text-red-700 text-lg font-semibold px-4 py-2">
                          {country}
                        </Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                      <p className="text-lg text-green-700 font-semibold text-center">
                        {region.achievements}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-purple-50 rounded-3xl p-10 border-2 border-red-200 shadow-2xl">
              <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center">Continental Impact Dashboard</h3>
              <div className="space-y-6">
                {[
                  { metric: "Total Patients Reached", value: "130,000+", color: "red" },
                  { metric: "Stroke Cases Prevented", value: "23,400+", color: "purple" },
                  { metric: "Healthcare Partners", value: "480+", color: "green" },
                  { metric: "Local Languages Supported", value: "25+", color: "blue" },
                  { metric: "Emergency Responses", value: "15,600+", color: "orange" },
                  { metric: "BP Control Improvement", value: "42% Average", color: "teal" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                    <span className="text-xl font-semibold text-gray-700">{item.metric}</span>
                    <Badge className={`bg-${item.color}-100 text-${item.color}-700 text-xl font-bold px-6 py-3`}>
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Communication Section */}
      <section className="py-24 bg-gradient-to-br from-red-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-3 bg-purple-100 text-purple-700 border-purple-200 text-base font-semibold">Multi-Channel Healthcare Platform</Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Accessible Continental Communication
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Reaching diverse populations through culturally appropriate, multi-language health messaging and clinical support
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">Integrated Communication Channels</h3>
              <div className="space-y-6">
                {[
                  {
                    channel: "WhatsApp Business Platform",
                    description: "Primary clinical communication with voice note support and media sharing capabilities",
                    features: ["BP reading submission", "Voice note clinical triage", "Educational content delivery", "Automated appointment reminders", "Multimedia health information"],
                    icon: MessageSquare
                  },
                  {
                    channel: "SMS Text Messaging System",
                    description: "Universal reach platform for emergency alerts and essential health reminders",
                    features: ["Critical emergency alerts", "Medication adherence reminders", "Clinic visit notifications", "Preventive health tips", "Outbreak alerts"],
                    icon: Smartphone
                  },
                  {
                    channel: "IVR Voice Call System",
                    description: "Audio-based interactive system for low-literacy populations and rural communities",
                    features: ["Voice-based BP logging", "Interactive health surveys", "Appointment confirmations", "Emergency patient outreach", "Health education audio"],
                    icon: Phone
                  },
                  {
                    channel: "Healthcare Provider Portal",
                    description: "Advanced clinical dashboard for healthcare organizations and ministry coordination",
                    features: ["Comprehensive patient management", "Real-time clinical analytics", "Automated report generation", "Team coordination tools", "Performance monitoring"],
                    icon: BarChart3
                  }
                ].map((channel, idx) => (
                  <Card key={idx} className="border-0 shadow-xl hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-start space-y-0 pb-4">
                      <div className="mr-6 p-4 rounded-2xl bg-red-100">
                        <channel.icon className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-red-700 mb-2">{channel.channel}</CardTitle>
                        <CardDescription className="text-xl text-gray-600 leading-relaxed">
                          {channel.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {channel.features.map((feature, featureIdx) => (
                          <Badge key={featureIdx} className="bg-purple-100 text-purple-700 text-lg font-semibold px-4 py-2">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-purple-200">
              <h4 className="text-4xl font-bold text-gray-900 mb-8">Clinical Information Hub</h4>
              <div className="space-y-8">
                <div>
                  <h5 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-3">
                    <DoctorIcon className="h-6 w-6" />
                    For Patients & Families
                  </h5>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      How to accurately monitor blood pressure at home
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      Understanding and interpreting your BP readings
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      Medication adherence strategies and reminders
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      Emergency response protocols and preparation
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      Lifestyle modification and dietary guidance
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
                    <Users className="h-6 w-6" />
                    For Healthcare Providers
                  </h5>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-center gap-3">
                      <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      Clinical protocol implementation and training
                    </li>
                    <li className="flex items-center gap-3">
                      <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      Platform onboarding and staff certification
                    </li>
                    <li className="flex items-center gap-3">
                      <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      Advanced data analytics and outcome reporting
                    </li>
                    <li className="flex items-center gap-3">
                      <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      Quality improvement and performance monitoring
                    </li>
                    <li className="flex items-center gap-3">
                      <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      Research collaboration and clinical trials
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl text-white">
                  <h5 className="text-2xl font-bold mb-3">Immediate Clinical Support</h5>
                  <p className="text-lg mb-4 opacity-90">
                    Contact our continental clinical team for urgent medical questions, platform implementation, or partnership opportunities.
                  </p>
                  <Button className="w-full bg-white text-red-600 hover:bg-red-50 text-lg font-bold py-6">
                    <Mail className="mr-3 h-5 w-5" />
                    Contact Continental Clinical Director
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Executive CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-purple-600 to-red-700">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg font-semibold px-6 py-3">
            Continental Partnership Opportunity
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Lead Africa's Cardiovascular Health Transformation
          </h2>
          <p className="text-2xl text-red-100 mb-10 max-w-4xl mx-auto leading-relaxed">
            Join ministers of health, healthcare executives, and clinical leaders in deploying Africa's most advanced hypertension and stroke prevention platform across your nation or region.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push("/dashboard")}
              className="bg-white text-red-600 hover:bg-red-50 shadow-2xl text-xl font-bold px-12 py-7"
            >
              Schedule Executive Presentation
              <ArrowUpRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-xl font-bold px-12 py-7"
            >
              Download Investment Portfolio
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-xl font-bold px-12 py-7"
            >
              Request Country Implementation Plan
            </Button>
          </div>
          <p className="text-red-200 text-xl mt-8 font-semibold">
            Available Across 54 African Nations | WHO Guidelines Compliant | Ministry of Health Approved | Culturally Adapted Protocols
          </p>
        </div>
      </section>

      {/* Enhanced Professional Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-purple-600">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold">HeartGuard Africa</span>
                  <div className="text-lg text-gray-400 mt-1">Continental Hypertension & Stroke Prevention Initiative</div>
                </div>
              </div>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Africa's premier clinical platform for scalable cardiovascular health management. 
                Combining WHO-aligned protocols with local healthcare infrastructure across all 54 nations.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Globe].map((Icon, idx) => (
                  <button key={idx} className="p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-all shadow-lg">
                    <Icon className="h-6 w-6" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Clinical Resources</h3>
              <div className="space-y-4">
                {[
                  { label: "Hypertension Clinical Guidelines", href: "#" },
                  { label: "Stroke Emergency Protocols", href: "#stroke" },
                  { label: "Healthcare Provider Training", href: "#" },
                  { label: "Research Publications", href: "#" },
                  { label: "Implementation Toolkit", href: "#" }
                ].map((link, idx) => (
                  <a key={idx} href={link.href} className="block text-xl text-gray-300 hover:text-white transition-colors font-medium">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Continental Support</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-red-400" />
                  <span className="text-xl text-gray-300">clinical@heartguard.africa</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-red-400" />
                  <span className="text-xl text-gray-300">Regional Emergency Coordination</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-6 w-6 text-red-400" />
                  <span className="text-xl text-gray-300">54 Nations Served</span>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-800 rounded-2xl border-2 border-green-600">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-lg font-bold text-white">WHO Standards Compliant</span>
                </div>
                <p className="text-gray-400 text-base">
                  Following international clinical guidelines and data protection standards
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-2 border-gray-700">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-lg text-center lg:text-left">
                © 2024 HeartGuard Africa. Leading cardiovascular health transformation across the continent.
              </div>
              <div className="flex gap-8 text-lg">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors font-medium">
                  Terms of Service
                </a>
                <a href="/compliance" className="text-gray-400 hover:text-white transition-colors font-medium">
                  Clinical Compliance
                </a>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-base max-w-4xl mx-auto">
                HeartGuard Africa operates in strategic partnership with African Ministries of Health, 
                international healthcare organizations, and community health networks across all 54 countries. 
                Emergency response SLA: 15 minutes for critical clinical alerts. WHO 25x25 NCD reduction target aligned.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;