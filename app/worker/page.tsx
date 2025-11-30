"use client"

import { RiskCard } from "@/components/risk-card"
import { PatientCard } from "@/components/patient-card"
import { AlertCard } from "@/components/alert-card"
import { patients, aiAlerts, getDailyWearableAggregates } from "@/lib/simulated-data"
import { 
  Users, AlertTriangle, Activity, TrendingUp, Phone, MessageCircle, Mail, 
  Mic, Bot, Volume2, Send, Clock, Heart, Brain, Stethoscope, Zap,
  Play, Pause, Download, Upload, Video, AudioLines
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Voice Processing Service
class VoiceProcessingService {
  private intentDictionary = [
    { keyword: "stopped", category: "medication", weight: 3, responses: ["I understand you've stopped your medication. Let me connect you with a nurse."] },
    { keyword: "ran out", category: "medication", weight: 3, responses: ["Running out of medication is important to address. A nurse will help you."] },
    { keyword: "forgot", category: "medication", weight: 2, responses: ["It happens! Try setting a daily alarm reminder."] },
    { keyword: "dizzy", category: "symptom", weight: 2, responses: ["Dizziness can be serious with high BP. Please sit down and rest."] },
    { keyword: "headache", category: "symptom", weight: 2, responses: ["Headaches with high BP need attention. Let me get a nurse to check on you."] },
    { keyword: "chest pain", category: "red_flag", weight: 5, responses: ["🚨 CHEST PAIN IS SERIOUS. A nurse is calling you NOW."] },
    { keyword: "call me", category: "escalation", weight: 3, responses: ["I've requested a nurse to call you. They'll reach out shortly."] }
  ];

  async processVoiceMessage(audioUrl: string): Promise<any> {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate different responses based on "audio content"
    const responses = [
      {
        transcript: "I've been feeling very dizzy today and I think I forgot to take my morning medication. My head is pounding.",
        confidence: 0.94,
        detectedIntents: [
          { keyword: 'dizzy', category: 'symptom', weight: 2 },
          { keyword: 'forgot', category: 'medication', weight: 2 },
          { keyword: 'headache', category: 'symptom', weight: 2 }
        ],
        severityScore: 6,
        autoResponse: "📞 Your symptoms need review. A nurse will call you within 1 hour. Please rest meanwhile."
      },
      {
        transcript: "My blood pressure was 185 over 110 this morning and I have chest pain when I walk.",
        confidence: 0.96,
        detectedIntents: [
          { keyword: 'chest pain', category: 'red_flag', weight: 5 },
          { keyword: 'high BP', category: 'symptom', weight: 3 }
        ],
        severityScore: 9,
        autoResponse: "🚨 CRITICAL ALERT: A nurse is calling you NOW. Please stay by your phone."
      },
      {
        transcript: "I ran out of my amlodipine tablets three days ago and I'm starting to feel unwell.",
        confidence: 0.92,
        detectedIntents: [
          { keyword: 'ran out', category: 'medication', weight: 3 },
          { keyword: 'unwell', category: 'symptom', weight: 2 }
        ],
        severityScore: 7,
        autoResponse: "💊 Medication issue detected. Nurse will arrange refill and call within 30 minutes."
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export default function DashboardPage() {
  const highRiskPatients = patients.filter((p) => p.riskLevel === "high")
  const pendingAlerts = aiAlerts.filter((a) => a.status === "pending")

  // Get sample vitals data for overview
  const samplePatient = patients[0]
  const dailyData = getDailyWearableAggregates(samplePatient.id)
  const latestDay = dailyData[dailyData.length - 1]

  // State for communication features
  const [activeCommunicationTab, setActiveCommunicationTab] = useState("whatsapp")
  const [isProcessingVoice, setIsProcessingVoice] = useState(false)
  const [voiceResult, setVoiceResult] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [automatedMessages, setAutomatedMessages] = useState([
    { id: 1, patient: "John Doe", message: "BP Reminder: Please share your reading", time: "2 min ago", status: "sent" },
    { id: 2, patient: "Sarah Smith", message: "Medication Follow-up", time: "5 min ago", status: "delivered" },
    { id: 3, patient: "Mike Johnson", message: "Weekly Check-in", time: "8 min ago", status: "read" }
  ])

  const audioRef = useRef<HTMLAudioElement>(null)

  // Safe phone number getter - handles missing phone numbers
  const getPatientPhone = (patient: any) => {
    return patient.phone || patient.contact || "256756348528"
  }

  const handleVoiceDemo = async () => {
    setIsProcessingVoice(true);
    const voiceService = new VoiceProcessingService();
    const result = await voiceService.processVoiceMessage("/sample-audio.ogg");
    setVoiceResult(result);
    setIsProcessingVoice(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setRecordedAudio("recorded_audio_sample");
    }, 3000);
  };

  const handlePlayRecordedAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleWhatsAppMessage = (phoneNumber: string) => {
    const message = "Hello! This is HeartGuard Africa. How can we assist you today?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallPatient = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleEmailCHW = () => {
    const subject = "HeartGuard Patient Follow-up - Urgent";
    const body = `Dear Community Health Worker,

I am following up on patient care coordination through the HeartGuard Africa platform.

Patient Details Requiring Attention:
- High blood pressure cases needing monitoring
- Medication adherence follow-ups
- Emergency response coordination

Please review the patient dashboard and provide your clinical assessment.

Best regards,
HeartGuard Clinical Team

Contact: +256 756 348528
Platform: HeartGuard Africa Dashboard`;
    
    window.location.href = `mailto:akandwanahojonan256@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sendAutomatedMessage = (patientId: string) => {
    const newMessage = {
      id: automatedMessages.length + 1,
      patient: patients.find(p => p.id === patientId)?.name || "Patient",
      message: "Automated Health Check-in: How are you feeling today?",
      time: "Just now",
      status: "sending"
    };
    setAutomatedMessages(prev => [newMessage, ...prev]);
    
    setTimeout(() => {
      setAutomatedMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "sent" }
            : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pl-[72px]">
        <main className="p-6 space-y-6">
          {/* Enhanced Risk Overview Cards */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <RiskCard 
              title="Total Patients" 
              value={patients.length} 
              subtitle="Under monitoring" 
              icon={Users}
              variant="default"
            />
            <RiskCard
              title="Hypertension Cases"
              value={highRiskPatients.length}
              subtitle="BP ≥140/90"
              icon={Heart}
              variant="danger"
            />
            <RiskCard
              title="Stroke Risk"
              value={pendingAlerts.length}
              subtitle="High priority alerts"
              icon={Brain}
              variant="warning"
            />
            <RiskCard
              title="Medication Adherence"
              value="86%"
              subtitle="Compliance rate"
              icon={TrendingUp}
              variant="success"
            />
          </div>

          {/* Enhanced Communication Features Section */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageCircle className="h-6 w-6" />
                Clinical Communication Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeCommunicationTab} onValueChange={setActiveCommunicationTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="whatsapp" 
                    className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calls" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Voice Calls
                  </TabsTrigger>
                  <TabsTrigger 
                    value="voice-notes" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  >
                    <Mic className="h-4 w-4" />
                    Voice Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="automated" 
                    className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    <Bot className="h-4 w-4" />
                    Automated
                  </TabsTrigger>
                </TabsList>

                {/* WhatsApp Tab */}
                <TabsContent value="whatsapp" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">Direct WhatsApp Contact</h4>
                        <p className="text-green-700 mb-4">
                          Patients can message you directly at: <strong className="text-green-900">+256 756 348528</strong>
                        </p>
                        <Button 
                          onClick={() => handleWhatsAppMessage("256756348528")}
                          className="bg-green-600 hover:bg-green-700 text-white w-full py-6 text-lg font-semibold"
                        >
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Open WhatsApp Conversation
                        </Button>
                      </div>

                      <div className="p-6 bg-white rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-3 text-lg">Quick Patient Messaging</h4>
                        <p className="text-blue-700 mb-4">
                          Send immediate messages to high-risk patients
                        </p>
                        <div className="space-y-3">
                          {highRiskPatients.slice(0, 3).map((patient) => (
                            <div key={patient.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <div>
                                <span className="font-semibold text-blue-900 block">{patient.name}</span>
                                <span className="text-sm text-blue-600">{getPatientPhone(patient)}</span>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => handleWhatsAppMessage(getPatientPhone(patient))}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-bold text-gray-800 mb-4 text-lg">WhatsApp Clinical Features</h4>
                      <div className="space-y-4">
                        {[
                          { icon: MessageCircle, feature: "Real-time patient messaging", color: "text-green-600" },
                          { icon: AudioLines, feature: "Voice note clinical triage", color: "text-purple-600" },
                          { icon: Heart, feature: "BP reading submission", color: "text-red-600" },
                          { icon: Clock, feature: "Automated medication reminders", color: "text-orange-600" },
                          { icon: AlertTriangle, feature: "Emergency alert system", color: "text-red-600" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                            <span className="text-gray-700 font-medium">{item.feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Voice Calls Tab */}
                <TabsContent value="calls" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-3 text-lg">Direct Patient Calls</h4>
                        <p className="text-blue-700 mb-4">
                          Emergency response and routine follow-up calls
                        </p>
                        <div className="space-y-4">
                          <Button 
                            onClick={() => handleCallPatient("256756348528")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                          >
                            <Phone className="h-5 w-5 mr-2" />
                            Call Emergency Hotline
                          </Button>
                          
                          <div className="space-y-3">
                            {highRiskPatients.slice(0, 3).map((patient) => (
                              <div key={patient.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
                                <div>
                                  <span className="font-semibold text-blue-900 block">{patient.name}</span>
                                  <span className="text-sm text-blue-600">{getPatientPhone(patient)}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleCallPatient(getPatientPhone(patient))}
                                  variant="outline"
                                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                >
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-800 mb-3 text-lg">Call Coordination</h4>
                        <div className="space-y-3 text-orange-700">
                          {[
                            { icon: Phone, text: "Direct patient calling" },
                            { icon: AlertTriangle, text: "Emergency response calls" },
                            { icon: Clock, text: "15-minute response SLA" },
                            { icon: Users, text: "Group call coordination" }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-3 text-lg">CHW Email Coordination</h4>
                        <p className="text-red-700 mb-4">
                          Email Community Health Worker for patient follow-up
                        </p>
                        <Button 
                          onClick={handleEmailCHW}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
                        >
                          <Mail className="h-5 w-5 mr-2" />
                          Email: akandwanahojonan256@gmail.com
                        </Button>
                        <p className="text-sm text-red-600 mt-3 text-center">
                          Pre-filled clinical template ready
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Voice Notes Tab - ENHANCED */}
                <TabsContent value="voice-notes" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Voice Recording Section */}
                      <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-4 text-lg">Record & Process Voice Note</h4>
                        
                        {!recordedAudio ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-purple-700 font-medium">Recording Status:</span>
                              <Badge variant={isRecording ? "destructive" : "secondary"}>
                                {isRecording ? "Recording..." : "Ready"}
                              </Badge>
                            </div>
                            
                            <Button 
                              onClick={handleStartRecording}
                              disabled={isRecording || isProcessingVoice}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold"
                            >
                              {isRecording ? (
                                <>
                                  <div className="animate-pulse bg-red-400 rounded-full h-4 w-4 mr-2"></div>
                                  Recording... (3s)
                                </>
                              ) : (
                                <>
                                  <Mic className="h-5 w-5 mr-2" />
                                  Start Recording Demo
                                </>
                              )}
                            </Button>
                            
                            <div className="text-center">
                              <p className="text-sm text-purple-600">
                                Simulates 3-second voice recording for AI analysis
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Button 
                                onClick={handlePlayRecordedAudio}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Play Recording
                              </Button>
                              <Button 
                                onClick={handleVoiceDemo}
                                disabled={isProcessingVoice}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                              >
                                {isProcessingVoice ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <Bot className="h-4 w-4 mr-1" />
                                    Analyze with AI
                                  </>
                                )}
                              </Button>
                            </div>
                            <audio ref={audioRef} src="/sample-voice-note.mp3" className="hidden" />
                          </div>
                        )}
                      </div>

                      {/* Voice Analysis Results */}
                      {voiceResult && (
                        <div className="space-y-4">
                          <div className="p-4 bg-green-600 rounded-lg text-white">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                              <Bot className="h-5 w-5" />
                              AI Analysis Complete
                            </h4>
                            <div className="flex items-center justify-between">
                              <span>Severity Score:</span>
                              <Badge className="bg-white text-green-700 font-bold text-lg px-3 py-1">
                                {voiceResult.severityScore}/10
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white rounded-lg border border-blue-200">
                            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                              <Volume2 className="h-4 w-4" />
                              Clinical Transcript
                            </h4>
                            <p className="text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
                              "{voiceResult.transcript}"
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                Confidence: {Math.round(voiceResult.confidence * 100)}%
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white rounded-lg border border-purple-200">
                            <h4 className="font-bold text-purple-800 mb-2">Detected Clinical Intents</h4>
                            <div className="flex flex-wrap gap-2">
                              {voiceResult.detectedIntents.map((intent: any, idx: number) => (
                                <Badge 
                                  key={idx} 
                                  className={
                                    intent.weight >= 4 ? "bg-red-100 text-red-700 border-red-300" :
                                    intent.weight >= 3 ? "bg-orange-100 text-orange-700 border-orange-300" :
                                    "bg-blue-100 text-blue-700 border-blue-300"
                                  }
                                >
                                  {intent.keyword} (Severity: {intent.weight})
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-orange-600 rounded-lg text-white">
                            <h4 className="font-bold mb-2">Auto-Response Generated</h4>
                            <p className="font-semibold">{voiceResult.autoResponse}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-4 text-lg">Voice AI Capabilities</h4>
                        <div className="space-y-4">
                          {[
                            { 
                              feature: "Medication Adherence Tracking", 
                              description: "Detects missed doses, side effects, medication issues",
                              examples: ["I stopped taking", "Ran out of pills", "Forgot my medication"],
                              color: "text-red-600"
                            },
                            { 
                              feature: "Symptom Severity Assessment", 
                              description: "Analyzes symptom descriptions and clinical urgency",
                              examples: ["Dizzy when standing", "Headache for days", "Chest discomfort"],
                              color: "text-orange-600"
                            },
                            { 
                              feature: "Emergency Red Flag Detection", 
                              description: "Immediately identifies critical symptoms",
                              examples: ["Chest pain with sweating", "Can't breathe properly", "Fainting"],
                              color: "text-red-600"
                            },
                            { 
                              feature: "Emotional Support Routing", 
                              description: "Recognizes distress and connects to support",
                              examples: ["Feeling overwhelmed", "Scared about health", "Stressed"],
                              color: "text-blue-600"
                            }
                          ].map((capability, idx) => (
                            <div key={idx} className="p-4 bg-white rounded-lg border border-purple-200">
                              <h5 className={`font-semibold ${capability.color} mb-2`}>{capability.feature}</h5>
                              <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {capability.examples.map((example, exIdx) => (
                                  <Badge key={exIdx} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                                    "{example}"
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Automated Messages Tab */}
                <TabsContent value="automated" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-800 mb-4 text-lg">Automated Patient Messaging</h4>
                        <p className="text-orange-700 mb-4">
                          Schedule automated check-ins every 10 minutes
                        </p>
                        <div className="space-y-4">
                          {patients.slice(0, 4).map((patient) => (
                            <div key={patient.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                              <div>
                                <span className="font-semibold text-orange-900 block">{patient.name}</span>
                                <span className="text-sm text-orange-600">Last contact: 5 min ago</span>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => sendAutomatedMessage(patient.id)}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Send Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800 mb-4 text-lg">Message History</h4>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {automatedMessages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-white rounded-lg border border-green-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-green-900">{msg.patient}</span>
                                <Badge variant={
                                  msg.status === "read" ? "default" :
                                  msg.status === "delivered" ? "secondary" :
                                  "outline"
                                } className={
                                  msg.status === "read" ? "bg-green-100 text-green-700" :
                                  msg.status === "delivered" ? "bg-blue-100 text-blue-700" :
                                  "bg-orange-100 text-orange-700"
                                }>
                                  {msg.status}
                                </Badge>
                              </div>
                              <p className="text-green-800 mb-2">{msg.message}</p>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-green-600">{msg.time}</span>
                                <MessageCircle className="h-4 w-4 text-green-500" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Rest of your existing dashboard content */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* High Risk Patients */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="bg-red-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <AlertTriangle className="h-5 w-5" />
                    High Risk Hypertension Patients
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {highRiskPatients.slice(0, 4).map((patient) => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <div>
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="bg-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Brain className="h-5 w-5" />
                    Stroke Risk Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {pendingAlerts.slice(0, 3).map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vitals Summary Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="border border-gray-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-red-800">Avg Blood Pressure</h3>
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full font-semibold">Hypertension</span>
                </div>
                <p className="text-4xl font-bold text-red-600">142/88</p>
                <p className="text-sm text-red-600 mt-1 font-medium">Stage 1 Hypertension</p>
                <div className="mt-4 h-2 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "75%" }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-800">Stroke Risk Score</h3>
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full font-semibold">Monitoring</span>
                </div>
                <p className="text-4xl font-bold text-purple-600">6.2/10</p>
                <p className="text-sm text-purple-600 mt-1 font-medium">Moderate Risk</p>
                <div className="mt-4 h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "62%" }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-800">Medication Adherence</h3>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-semibold">Good</span>
                </div>
                <p className="text-4xl font-bold text-blue-600">86%</p>
                <p className="text-sm text-blue-600 mt-1 font-medium">Compliance Rate</p>
                <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "86%" }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}