import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface VerificationResult {
  approved: boolean;
  reason: string;
  confidence: number;
}

export async function verifyBountyProof(
  bountyDescription: string,
  imageBase64: string
): Promise<VerificationResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: [
        {
          parts: [
            { text: `You are a bounty verifier. The bounty requirement is: "${bountyDescription}". 
            Analyze the provided image and determine if it satisfies this requirement. 
            Be strict but fair. If it's a photo of a specific event, look for identifying marks. 
            Return a JSON object with 'approved' (boolean), 'reason' (string), and 'confidence' (number 0-1).` },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64.split(",")[1] || imageBase64,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            approved: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["approved", "reason", "confidence"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      approved: result.approved ?? false,
      reason: result.reason ?? "Verification failed to parse.",
      confidence: result.confidence ?? 0,
    };
  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return {
      approved: false,
      reason: "Error connecting to AI verifier.",
      confidence: 0,
    };
  }
}
