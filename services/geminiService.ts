
import { GoogleGenAI } from "@google/genai";
import type { OrderDetails } from '../types';
import { saveOrder } from './supabase';
import { BOT_KNOWLEDGE_BASE } from './botKnowledge';

/**
 * Robust GoogleGenAI initialization for Vercel environment.
 */
const getAI = () => {
  const key = process.env.API_KEY;
  if (!key || key === 'undefined') {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey: key });
};

export const generateMeditationScript = async (details: OrderDetails): Promise<string> => {
  try {
    const ai = getAI();
    const userPrompt = `Draft the foundational script for a bespoke meditation.
      Customer: ${details.name}
      Goal: ${details.detailedGoal}
      Resonance: ${details.voice} Tone
      Brand: THE FREQUENCY CODE™`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a Senior Manifestation Architect. Generate a high-end, professional meditation script foundation that our human team will use to record. Use luxurious and authoritative language.",
      },
    });

    const script = response.text || "Neural blueprint structure initiated.";
    await saveOrder(details, script);
    return script;
  } catch (error: any) {
    console.error("AI Generation Failed:", error);
    return "Drafting foundation manually. Studio protocol active.";
  }
};

export const chatWithSupport = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> => {
    try {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model' as any, parts: h.parts })),
                { role: 'user', parts: [{ text: message }] }
            ],
            config: {
                systemInstruction: BOT_KNOWLEDGE_BASE,
                temperature: 0.7,
            }
        });
        return response.text || "Synchronizing with studio servers...";
    } catch (error: any) {
        console.error("Chat error:", error);
        return "The neural link is experiencing lag. Please contact us directly at studio@thefrequencycode.com if this persists.";
    }
}
