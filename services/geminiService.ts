
import { GoogleGenAI, Type } from "@google/genai";
import { BuildAssistantMessage } from "../types";

export const getBuildRecommendation = async (messages: BuildAssistantMessage[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a professional PC building expert for WynderPC. 
    Help users choose parts based on their budget and needs (gaming, productivity, streaming).
    Recommend specific parts and explain why. 
    Format your response in professional, concise Markdown.
    Mention current top-tier brands like NVIDIA, AMD, Intel, Corsair, Lian Li.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a recommendation right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not reach the Build Assistant. Please try again later.";
  }
};
