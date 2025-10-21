import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request) {
  try {
    const { query } = await request.json()

    // Call Gemini API to extract skills
    const prompt = `Parse this natural language query and extract the skills the person wants to learn and the skills they can teach. 

Query: "${query}"

Return ONLY valid JSON in this format:
{
  "learn": ["skill1", "skill2", ...],
  "teach": ["skill1", "skill2", ...]
}

If the query doesn't mention learning skills, return empty array for "learn".
If the query doesn't mention teaching skills, return empty array for "teach".`

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
      {
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
      },
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("Gemini API error:", data)
      return NextResponse.json({ success: false, error: "Failed to extract skills" }, { status: 500 })
    }

    // Parse the response
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!content) {
      return NextResponse.json({ success: false, error: "No content in response" }, { status: 500 })
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: "Could not parse skills" }, { status: 500 })
    }

    const skills = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      success: true,
      learnSkills: skills.learn || [],
      teachSkills: skills.teach || [],
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
