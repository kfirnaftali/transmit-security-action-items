import { GoogleGenAI } from '@google/genai';
import type { ActionItem } from './types';

export async function generateElaboration(item: ActionItem): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const knowledgeBase = `
        Session Summary: The 3-day session focused on optimizing Dataflow usage. Key topics included:
        - Deployment improvements using Flex Templates over Config Connector for CI/CD.
        - Performance and cost efficiency.
        - A new "Short-Term Aggregation (STA) service" architecture to handle unbounded state growth, using Redis for real-time state management. This service runs in parallel with the long-term pipeline to provide fresh data to the detection service.
        - Dataflow best practices for handling late data using watermarks, windowing, and triggers.
        - Upgrading Python versions in jobs from 3.8 to a more recent, supported version.
        - Optimizing worker image sizes to reduce startup times.
        - Following up on support cases for data freshness metrics.
    `;

    const prompt = `
        Based on the following session summary, please elaborate on the action item below. Provide a detailed explanation of what needs to be done, why it's important, and what the discussion was likely about. Format the response clearly.

        **Session Summary:**
        ${knowledgeBase}

        **Action Item:**
        "${item.description}"

        **Elaboration:**
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    // FIX: Per coding guidelines, access the text property directly from the response object.
    return response.text || "The response from the AI was empty. This may be due to content safety filters.";
}
