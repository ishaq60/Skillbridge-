import {  NextResponse } from "next/server"
import { mockUsers } from "../../../lib/mock-data.ts"
import { findMatches } from "../../../lib/skill-matcher"


export async function POST(request) {
  try {
    const { learn, teach } = await request.json()

    if (!Array.isArray(learn) || !Array.isArray(teach)) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 })
    }

    // Find matches using the skill matcher
    const matches = findMatches(teach, learn, mockUsers)

    return NextResponse.json({
      success: true,
      matches: matches.map((match) => ({
        user: {
          ...match.user,
          createdAt: match.user.createdAt.toISOString(),
        },
        matchScore: match.matchScore,
        commonTeachLearn: match.commonTeachLearn,
      })),
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
