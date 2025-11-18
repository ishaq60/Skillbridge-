// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"; // Default to gemini-pro
const GEMINI_API_URL_FLASH = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; // Use 1.5-flash for specific cases
const GEMINI_API_URL_FLASH_2_0 = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"; // Use 2.0-flash from example

async function callGeminiApi(prompt, modelUrl) {
  const url = modelUrl || GEMINI_API_URL_FLASH_2_0; // Use 2.0-flash as default based on user example

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(data.error?.message || "Failed to get response from Gemini API");
    }

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("No content in Gemini API response.");
    }
    return content;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export async function classifyIntent(message) {
  const prompt = `Classify the following user message into one of two categories: "COURSE_QUERY" or "NORMAL_ANSWER".
  "COURSE_QUERY" is for messages related to learning, skills, or course suggestions.
  "NORMAL_ANSWER" is for all other messages.

  Message: "${message}"
  Classification:`;

  try {
    const text = await callGeminiApi(prompt, GEMINI_API_URL_FLASH_2_0); // Using 2.0-flash for classification
    
    if (text.includes("COURSE_QUERY")) {
      return "COURSE_QUERY";
    } else {
      return "NORMAL_ANSWER";
    }

  } catch (error) {
    console.error("Error classifying intent with Gemini:", error);
    throw new Error("Could not classify intent.");
  }
}

export async function generateResponse(prompt) {
  try {
    return await callGeminiApi(prompt, GEMINI_API_URL_FLASH_2_0); // Using 2.0-flash for general response
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    throw new Error("Could not generate response.");
  }
}

export async function extractSkills(query) {
  const prompt = `Parse this natural language query and extract the skills the person wants to learn and the skills they can teach. 

Query: "${query}"

Return ONLY valid JSON in this format:
{
  "learn": ["skill1", "skill2", ...],
  "teach": ["skill1", "skill2", ...]
}

If the query doesn't mention learning skills, return empty array for "learn".
If the query doesn't mention teaching skills, return empty array for "teach".`;

  try {
    const content = await callGeminiApi(prompt, GEMINI_API_URL_FLASH_2_0);
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse skills from Gemini response.");
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error extracting skills with Gemini:", error);
    throw new Error("Could not extract skills.");
  }
}
