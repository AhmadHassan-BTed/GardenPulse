import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface DiagnosisResult {
  issue: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  treatmentSteps: string[];
}

/**
 * Analyzes a leaf image for disease or nutrient deficiency using Google's Gemini Flash model.
 * 
 * @param base64Image Base64-encoded string of the leaf image (without metadata prefix)
 * @returns Parsed DiagnosisResult object matching the required schema
 */
export async function analyzeLeafDisease(base64Image: string): Promise<DiagnosisResult> {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY.');
  }

  try {
    // Initialize Gemini 1.5 Flash model with JSON restriction
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
      systemInstruction: 'You are an expert botanist and plant pathologist. Analyze the leaf image provided and diagnose any disease, pest issue, nutrient deficiency, or environmental stress. Be specific, accurate, and practical.',
    });

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg',
      },
    };

    const prompt = `Analyze this plant leaf image. Identify any disease, pest, nutrient deficiency, or health issue. 
Return a JSON object matching this schema:
{
  "issue": "Specific name of the disease or issue (e.g. Powdery Mildew, Nitrogen Deficiency, Spider Mites, Healthy)",
  "confidence": A number from 0 to 1 representing your confidence level (e.g. 0.85),
  "severity": "low" | "medium" | "high",
  "explanation": "A concise explanation of why you made this diagnosis and what the symptoms indicate",
  "treatmentSteps": ["Step 1", "Step 2", "Step 3", ...]
}
Provide ONLY the JSON response. Do not include markdown wrappers, backticks, or other text.`;

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('Empty response received from Gemini API.');
    }

    const parsedData: DiagnosisResult = JSON.parse(responseText.trim());
    
    // Validate response fields to prevent runtime errors
    if (!parsedData.issue || typeof parsedData.confidence !== 'number' || !parsedData.severity || !parsedData.explanation || !Array.isArray(parsedData.treatmentSteps)) {
      throw new Error('Gemini API response did not match the expected schema.');
    }

    return parsedData;
  } catch (error) {
    console.error('Gemini leaf analysis failed:', error);
    throw error;
  }
}
