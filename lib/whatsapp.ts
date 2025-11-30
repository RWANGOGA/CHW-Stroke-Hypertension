import axios from "axios";

export async function sendWhatsAppMessage(to: string, message: string) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

  await axios.post(
    url,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      },
    }
  );
}

export async function notifyNurse(
  transcript: string,
  severity: number,
  patient: string,
  intents: string[]
) {
  const nurse = process.env.NURSE_NUMBER!;

  const msg = `🚨 *HEARTGUARD RED ALERT*

Patient: ${patient}
Severity: ${severity}
Intents: ${intents.join(", ")}
Transcript: ${transcript}

Please call patient NOW.`;

  await sendWhatsAppMessage(nurse, msg);
}
