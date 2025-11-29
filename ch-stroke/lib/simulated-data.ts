export interface Patient {
  id: string
  name: string
  age: number
  ageBracket: string
  gender: string
  knownHypertension: boolean
  medications: string[]
  pastStrokeHistory: boolean
  symptoms: string[]
  lifestyleRisks: {
    saltIntake: "low" | "moderate" | "high"
    alcohol: "none" | "occasional" | "frequent"
    stress: "low" | "moderate" | "high"
  }
  riskScore: number
  riskLevel: "low" | "moderate" | "high"
  lastContact: string
  adherenceScore: number
  enrollmentDate: string
}

export interface WearableReading {
  id: string
  patientId: string
  timestamp: string
  heartRate: number
  heartRateVariability: number
  stepCount: number
  sleepHours: number
}

export interface CommunicationLog {
  id: string
  patientId: string
  channel: "whatsapp" | "sms" | "ivr"
  timestamp: string
  direction: "inbound" | "outbound"
  message: string
  extractedSymptoms: string[]
  mood: "positive" | "neutral" | "negative"
  riskKeywords: string[]
  severity: "low" | "moderate" | "high"
}

export interface AIAlert {
  id: string
  patientId: string
  timestamp: string
  type: "wearable" | "communication" | "combined"
  title: string
  description: string
  riskLevel: "low" | "moderate" | "high"
  recommendedAction: string
  status: "pending" | "acknowledged" | "resolved"
  ruleTriggered: string
}

// Generate simulated wearable data (56 readings per patient - 14 days x 4 readings/day)
function generateWearableData(
  patientId: string,
  baseHeartRate: number,
  baseSteps: number,
  baseSleep: number,
): WearableReading[] {
  const readings: WearableReading[] = []
  const startDate = new Date("2024-01-01")

  for (let i = 0; i < 56; i++) {
    const date = new Date(startDate)
    date.setHours(date.getHours() + i * 6)

    // Add some variability and trends
    const dayOfWeek = Math.floor(i / 4)
    const trendFactor = dayOfWeek > 10 ? 1.05 : 1 // Slight upward trend in last days

    readings.push({
      id: `wr-${patientId}-${i}`,
      patientId,
      timestamp: date.toISOString(),
      heartRate: Math.round((baseHeartRate + (Math.random() - 0.5) * 14) * trendFactor),
      heartRateVariability: Math.round(40 + (Math.random() - 0.5) * 20),
      stepCount: Math.max(0, Math.round(baseSteps + (Math.random() - 0.5) * 2400)),
      sleepHours: Math.max(3, Math.min(9, baseSleep + (Math.random() - 0.5) * 2)),
    })
  }

  return readings
}

// Generate communication logs (7 per channel per patient)
function generateCommunicationLogs(patientId: string, patientName: string): CommunicationLog[] {
  const logs: CommunicationLog[] = []
  const channels: Array<"whatsapp" | "sms" | "ivr"> = ["whatsapp", "sms", "ivr"]
  const days = [1, 2, 3, 5, 7, 10, 14]

  const whatsappConversations = [
    {
      bot: "Good morning! How are you feeling today? Any headaches, chest pain, or dizziness?",
      user: "Feeling okay today. Slight headache in the morning but took my medication.",
      symptoms: ["headache"],
      mood: "neutral" as const,
      severity: "low" as const,
      keywords: ["headache"],
    },
    {
      bot: "Thank you for checking in. Did you take your BP medication today?",
      user: "Yes, I took it after breakfast. My readings were 140/90 this morning.",
      symptoms: [],
      mood: "neutral" as const,
      severity: "moderate" as const,
      keywords: ["BP"],
    },
    {
      bot: "How was your sleep last night?",
      user: "Not great, woke up several times. Feeling tired today.",
      symptoms: ["fatigue", "poor sleep"],
      mood: "negative" as const,
      severity: "moderate" as const,
      keywords: ["tired"],
    },
    {
      bot: "Any chest discomfort or breathing difficulties today?",
      user: "Mild chest tightness this morning but it reduced after resting.",
      symptoms: ["chest tightness"],
      mood: "neutral" as const,
      severity: "high" as const,
      keywords: ["chest pain", "chest tightness"],
    },
    {
      bot: "Have you been monitoring your blood pressure at home?",
      user: "Yes, it was a bit high yesterday - 150/95. Today seems better.",
      symptoms: [],
      mood: "neutral" as const,
      severity: "moderate" as const,
      keywords: ["high BP"],
    },
    {
      bot: "How is your stress level this week?",
      user: "Work has been stressful. Having trouble relaxing at night.",
      symptoms: ["stress", "anxiety"],
      mood: "negative" as const,
      severity: "moderate" as const,
      keywords: ["stress"],
    },
    {
      bot: "Final check-in for the week. How are you overall?",
      user: "Feeling better. Following the diet plan and walking more.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
  ]

  const smsMessages = [
    {
      message: "BP check ok yesterday. Feeling fine today.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
    {
      message: "Missed morning dose. Took it at lunch instead.",
      symptoms: [],
      mood: "neutral" as const,
      severity: "moderate" as const,
      keywords: ["missed dose"],
    },
    {
      message: "Headache since morning. Drank water and resting.",
      symptoms: ["headache"],
      mood: "neutral" as const,
      severity: "moderate" as const,
      keywords: ["headache"],
    },
    {
      message: "Feeling dizzy when standing up quickly.",
      symptoms: ["dizziness"],
      mood: "negative" as const,
      severity: "high" as const,
      keywords: ["dizziness"],
    },
    {
      message: "Good day. Walked 30 minutes. BP 135/85.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
    {
      message: "Tired. Not sleeping well. Worried about work.",
      symptoms: ["fatigue", "poor sleep", "stress"],
      mood: "negative" as const,
      severity: "moderate" as const,
      keywords: ["tired", "stress"],
    },
    {
      message: "All meds taken. Feeling normal today.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
  ]

  const ivrTranscripts = [
    {
      transcript: "I'm doing alright today. Took my medications as prescribed. No major complaints.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
    {
      transcript: "I felt some dizziness when I woke up but it passed after eating.",
      symptoms: ["dizziness"],
      mood: "neutral" as const,
      severity: "moderate" as const,
      keywords: ["dizziness"],
    },
    {
      transcript: "My blood pressure reading was high this morning. I'm a bit worried.",
      symptoms: ["anxiety"],
      mood: "negative" as const,
      severity: "moderate" as const,
      keywords: ["high BP", "worried"],
    },
    {
      transcript: "I felt chest tightness last night. It lasted about 10 minutes then went away.",
      symptoms: ["chest tightness"],
      mood: "negative" as const,
      severity: "high" as const,
      keywords: ["chest pain", "chest tightness"],
    },
    {
      transcript: "Feeling much better today. Following the low salt diet. Energy is good.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
    {
      transcript: "Had palpitations yesterday evening. Was stressed about family matters.",
      symptoms: ["palpitations", "stress"],
      mood: "negative" as const,
      severity: "high" as const,
      keywords: ["palpitations", "stress"],
    },
    {
      transcript: "Everything is fine. Taking medications regularly. Blood pressure is stable.",
      symptoms: [],
      mood: "positive" as const,
      severity: "low" as const,
      keywords: [],
    },
  ]

  let logId = 0

  channels.forEach((channel) => {
    days.forEach((day, idx) => {
      const date = new Date("2024-01-01")
      date.setDate(date.getDate() + day - 1)

      if (channel === "whatsapp") {
        const conv = whatsappConversations[idx]
        logs.push({
          id: `cl-${patientId}-${logId++}`,
          patientId,
          channel,
          timestamp: date.toISOString(),
          direction: "outbound",
          message: conv.bot,
          extractedSymptoms: [],
          mood: "neutral",
          riskKeywords: [],
          severity: "low",
        })
        logs.push({
          id: `cl-${patientId}-${logId++}`,
          patientId,
          channel,
          timestamp: new Date(date.getTime() + 3600000).toISOString(),
          direction: "inbound",
          message: conv.user,
          extractedSymptoms: conv.symptoms,
          mood: conv.mood,
          riskKeywords: conv.keywords,
          severity: conv.severity,
        })
      } else if (channel === "sms") {
        const msg = smsMessages[idx]
        logs.push({
          id: `cl-${patientId}-${logId++}`,
          patientId,
          channel,
          timestamp: date.toISOString(),
          direction: "inbound",
          message: msg.message,
          extractedSymptoms: msg.symptoms,
          mood: msg.mood,
          riskKeywords: msg.keywords,
          severity: msg.severity,
        })
      } else {
        const ivr = ivrTranscripts[idx]
        logs.push({
          id: `cl-${patientId}-${logId++}`,
          patientId,
          channel,
          timestamp: date.toISOString(),
          direction: "inbound",
          message: ivr.transcript,
          extractedSymptoms: ivr.symptoms,
          mood: ivr.mood,
          riskKeywords: ivr.keywords,
          severity: ivr.severity,
        })
      }
    })
  })

  return logs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

// 5 Simulated Patients
export const patients: Patient[] = [
  {
    id: "P001",
    name: "Grace Nakamura",
    age: 58,
    ageBracket: "55-64",
    gender: "Female",
    knownHypertension: true,
    medications: ["Lisinopril 10mg", "Amlodipine 5mg"],
    pastStrokeHistory: false,
    symptoms: ["occasional headaches", "fatigue"],
    lifestyleRisks: { saltIntake: "moderate", alcohol: "none", stress: "high" },
    riskScore: 72,
    riskLevel: "high",
    lastContact: "2024-01-14",
    adherenceScore: 85,
    enrollmentDate: "2023-11-15",
  },
  {
    id: "P002",
    name: "James Okonkwo",
    age: 62,
    ageBracket: "55-64",
    gender: "Male",
    knownHypertension: true,
    medications: ["Metoprolol 50mg", "Hydrochlorothiazide 25mg"],
    pastStrokeHistory: true,
    symptoms: ["dizziness", "chest discomfort"],
    lifestyleRisks: { saltIntake: "high", alcohol: "occasional", stress: "moderate" },
    riskScore: 85,
    riskLevel: "high",
    lastContact: "2024-01-14",
    adherenceScore: 72,
    enrollmentDate: "2023-09-20",
  },
  {
    id: "P003",
    name: "Maria Santos",
    age: 45,
    ageBracket: "45-54",
    gender: "Female",
    knownHypertension: true,
    medications: ["Losartan 50mg"],
    pastStrokeHistory: false,
    symptoms: ["occasional palpitations"],
    lifestyleRisks: { saltIntake: "low", alcohol: "none", stress: "moderate" },
    riskScore: 45,
    riskLevel: "moderate",
    lastContact: "2024-01-13",
    adherenceScore: 92,
    enrollmentDate: "2023-12-01",
  },
  {
    id: "P004",
    name: "Robert Chen",
    age: 52,
    ageBracket: "45-54",
    gender: "Male",
    knownHypertension: false,
    medications: [],
    pastStrokeHistory: false,
    symptoms: ["mild stress"],
    lifestyleRisks: { saltIntake: "moderate", alcohol: "occasional", stress: "low" },
    riskScore: 28,
    riskLevel: "low",
    lastContact: "2024-01-12",
    adherenceScore: 95,
    enrollmentDate: "2024-01-01",
  },
  {
    id: "P005",
    name: "Fatima Hassan",
    age: 67,
    ageBracket: "65+",
    gender: "Female",
    knownHypertension: true,
    medications: ["Enalapril 10mg", "Aspirin 81mg"],
    pastStrokeHistory: true,
    symptoms: ["vision changes", "headaches"],
    lifestyleRisks: { saltIntake: "moderate", alcohol: "none", stress: "high" },
    riskScore: 78,
    riskLevel: "high",
    lastContact: "2024-01-14",
    adherenceScore: 88,
    enrollmentDate: "2023-08-10",
  },
]

// Generate wearable data for each patient
export const wearableData: Record<string, WearableReading[]> = {
  P001: generateWearableData("P001", 82, 2500, 6.5),
  P002: generateWearableData("P002", 88, 1800, 5.5),
  P003: generateWearableData("P003", 75, 3500, 7),
  P004: generateWearableData("P004", 72, 4500, 7.5),
  P005: generateWearableData("P005", 85, 2000, 6),
}

// Generate communication logs for each patient
export const communicationLogs: Record<string, CommunicationLog[]> = {
  P001: generateCommunicationLogs("P001", "Grace Nakamura"),
  P002: generateCommunicationLogs("P002", "James Okonkwo"),
  P003: generateCommunicationLogs("P003", "Maria Santos"),
  P004: generateCommunicationLogs("P004", "Robert Chen"),
  P005: generateCommunicationLogs("P005", "Fatima Hassan"),
}

// AI-Generated Alerts (minimum 12 as per spec)
export const aiAlerts: AIAlert[] = [
  {
    id: "ALT001",
    patientId: "P002",
    timestamp: "2024-01-14T09:30:00Z",
    type: "combined",
    title: "High Risk - Immediate BP Check Recommended",
    description:
      "Elevated resting heart rate (95 bpm) combined with reported dizziness and chest tightness. Past stroke history increases risk.",
    riskLevel: "high",
    recommendedAction:
      "Contact patient immediately. Recommend urgent BP check and potential clinic visit within 24 hours.",
    status: "pending",
    ruleTriggered: "RULE C: Combined wearable + text pattern",
  },
  {
    id: "ALT002",
    patientId: "P005",
    timestamp: "2024-01-14T08:15:00Z",
    type: "communication",
    title: "Vision Changes Reported",
    description:
      "Patient reported vision changes during IVR call. Combined with existing hypertension and past stroke history.",
    riskLevel: "high",
    recommendedAction:
      "Urgent follow-up call. Assess for stroke symptoms (FAST protocol). Consider immediate medical attention.",
    status: "acknowledged",
    ruleTriggered: "RULE B: High-risk keyword detection",
  },
  {
    id: "ALT003",
    patientId: "P001",
    timestamp: "2024-01-13T14:20:00Z",
    type: "wearable",
    title: "Reduced Activity + HR Drift",
    description:
      "Step count below 1500 for 3 consecutive days. Resting heart rate increased from baseline 82 to 89 bpm.",
    riskLevel: "moderate",
    recommendedAction:
      "Schedule check-in call within 48 hours. Inquire about energy levels and potential barriers to activity.",
    status: "pending",
    ruleTriggered: "RULE A: Low steps + rising HR",
  },
  {
    id: "ALT004",
    patientId: "P001",
    timestamp: "2024-01-12T11:00:00Z",
    type: "communication",
    title: "Stress and Sleep Issues",
    description:
      "Patient reported high work stress and difficulty sleeping. Combined with existing high stress risk profile.",
    riskLevel: "moderate",
    recommendedAction: "Discuss stress management techniques. Consider referral to counseling services.",
    status: "resolved",
    ruleTriggered: "RULE B: Moderate-risk keywords",
  },
  {
    id: "ALT005",
    patientId: "P002",
    timestamp: "2024-01-12T16:45:00Z",
    type: "wearable",
    title: "Poor Sleep Affecting BP Stability",
    description: "Sleep duration below 4 hours for 2 nights. Heart rate variability shows increased volatility.",
    riskLevel: "high",
    recommendedAction: "Priority follow-up. Assess sleep patterns and potential causes. Review medication timing.",
    status: "acknowledged",
    ruleTriggered: "RULE A: Sleep < 4hrs + HR volatility",
  },
  {
    id: "ALT006",
    patientId: "P003",
    timestamp: "2024-01-11T10:30:00Z",
    type: "communication",
    title: "Palpitations Reported",
    description: "Patient mentioned palpitations during stressful period. No concerning wearable patterns observed.",
    riskLevel: "moderate",
    recommendedAction: "Monitor over next 48 hours. If symptoms persist, recommend ECG evaluation.",
    status: "resolved",
    ruleTriggered: "RULE B: Moderate-risk keywords",
  },
  {
    id: "ALT007",
    patientId: "P005",
    timestamp: "2024-01-11T09:00:00Z",
    type: "combined",
    title: "BP Trending Upward",
    description: "Self-reported BP readings trending upward over 4 days. Wearable shows corresponding HR increase.",
    riskLevel: "high",
    recommendedAction: "Schedule home visit. Review medication adherence. Consider dosage adjustment consultation.",
    status: "pending",
    ruleTriggered: "RULE C: Combined pattern + baseline risk",
  },
  {
    id: "ALT008",
    patientId: "P002",
    timestamp: "2024-01-10T13:15:00Z",
    type: "communication",
    title: "Missed Medication Dose",
    description: "Patient reported missing morning dose. History of adherence challenges noted.",
    riskLevel: "moderate",
    recommendedAction: "Reinforce medication importance. Discuss reminder strategies.",
    status: "resolved",
    ruleTriggered: "RULE B: Missed dose keyword",
  },
  {
    id: "ALT009",
    patientId: "P001",
    timestamp: "2024-01-09T17:30:00Z",
    type: "wearable",
    title: "Possible Stress Episode",
    description: "Heart rate spike to 118 bpm during period of low physical activity.",
    riskLevel: "moderate",
    recommendedAction: "Check in on emotional wellbeing. Review stress management plan.",
    status: "resolved",
    ruleTriggered: "RULE A: HR max > 120 with inactivity",
  },
  {
    id: "ALT010",
    patientId: "P003",
    timestamp: "2024-01-08T11:45:00Z",
    type: "wearable",
    title: "Activity Pattern Change",
    description: "Significant increase in daily steps (from 3500 to 5200). Positive lifestyle modification detected.",
    riskLevel: "low",
    recommendedAction: "Acknowledge improvement. Encourage continued activity.",
    status: "resolved",
    ruleTriggered: "RULE A: Positive trend detection",
  },
  {
    id: "ALT011",
    patientId: "P004",
    timestamp: "2024-01-07T09:00:00Z",
    type: "communication",
    title: "Routine Check - All Clear",
    description: "Patient reports feeling well. No concerning symptoms or keywords detected.",
    riskLevel: "low",
    recommendedAction: "Continue standard monitoring schedule.",
    status: "resolved",
    ruleTriggered: "RULE B: Low-risk keywords",
  },
  {
    id: "ALT012",
    patientId: "P005",
    timestamp: "2024-01-06T14:00:00Z",
    type: "combined",
    title: "Headache with Elevated HR",
    description: "Recurring headaches reported via WhatsApp. Wearable shows resting HR 10% above baseline.",
    riskLevel: "high",
    recommendedAction: "Urgent BP measurement. If elevated, recommend clinic visit same day.",
    status: "acknowledged",
    ruleTriggered: "RULE C: Symptom + vital sign correlation",
  },
]

// Dashboard Statistics
export const dashboardStats = {
  totalPatients: patients.length,
  highRiskPatients: patients.filter((p) => p.riskLevel === "high").length,
  moderateRiskPatients: patients.filter((p) => p.riskLevel === "moderate").length,
  lowRiskPatients: patients.filter((p) => p.riskLevel === "low").length,
  pendingAlerts: aiAlerts.filter((a) => a.status === "pending").length,
  averageAdherence: Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / patients.length),
  totalCommunications: Object.values(communicationLogs).flat().length,
  totalWearableReadings: Object.values(wearableData).flat().length,
}

// Helper function to get daily aggregated wearable data for charts
export function getDailyWearableAggregates(patientId: string) {
  const readings = wearableData[patientId] || []
  const dailyData: Record<string, { heartRate: number[]; steps: number[]; sleep: number[] }> = {}

  readings.forEach((reading) => {
    const date = reading.timestamp.split("T")[0]
    if (!dailyData[date]) {
      dailyData[date] = { heartRate: [], steps: [], sleep: [] }
    }
    dailyData[date].heartRate.push(reading.heartRate)
    dailyData[date].steps.push(reading.stepCount)
    dailyData[date].sleep.push(reading.sleepHours)
  })

  return Object.entries(dailyData).map(([date, data]) => ({
    date,
    avgHeartRate: Math.round(data.heartRate.reduce((a, b) => a + b, 0) / data.heartRate.length),
    totalSteps: data.steps.reduce((a, b) => a + b, 0),
    avgSleep: Math.round((data.sleep.reduce((a, b) => a + b, 0) / data.sleep.length) * 10) / 10,
  }))
}

// Helper function to calculate risk score based on rules
export function calculateRiskScore(
  patient: Patient,
  wearable: WearableReading[],
  communications: CommunicationLog[],
): number {
  let score = 0

  // Baseline health intake (20%)
  if (patient.knownHypertension) score += 10
  if (patient.pastStrokeHistory) score += 15
  if (patient.lifestyleRisks.saltIntake === "high") score += 5
  if (patient.lifestyleRisks.stress === "high") score += 5
  if (patient.lifestyleRisks.alcohol === "frequent") score += 5

  // Wearable patterns (40%)
  const recentReadings = wearable.slice(-8) // Last 2 days
  const avgHR = recentReadings.reduce((sum, r) => sum + r.heartRate, 0) / recentReadings.length
  const avgSleep = recentReadings.reduce((sum, r) => sum + r.sleepHours, 0) / recentReadings.length
  const avgSteps = recentReadings.reduce((sum, r) => sum + r.stepCount, 0) / recentReadings.length

  if (avgHR > 90) score += 15
  else if (avgHR > 85) score += 8
  if (avgSleep < 5) score += 12
  else if (avgSleep < 6) score += 6
  if (avgSteps < 2000) score += 10
  else if (avgSteps < 3000) score += 5

  // Communication patterns (40%)
  const recentComms = communications.filter((c) => c.direction === "inbound").slice(-5)
  const highRiskComms = recentComms.filter((c) => c.severity === "high").length
  const moderateRiskComms = recentComms.filter((c) => c.severity === "moderate").length

  score += highRiskComms * 10
  score += moderateRiskComms * 5

  return Math.min(100, score)
}
