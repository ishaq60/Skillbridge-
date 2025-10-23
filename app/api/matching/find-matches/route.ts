import { calculateAdvancedMatchScore, findBestMatchesAdvanced } from "../../../../lib/matching/advanced-matching-model"
import { sampleUsers } from "../../../../lib/matching/sample-data"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    // Find the current user
    const currentUser = sampleUsers.find((user) => user.id === userId)
    if (!currentUser) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    const matches = findBestMatchesAdvanced(currentUser, sampleUsers, 5)

    const matchScores: Record<
      string,
      {
        isMutualMatch: boolean
        score: number
        cosineSimilarity: number
        semanticRelevance: number
        collaborativeScore: number
      }
    > = {}
    matches.forEach((match) => {
      const advancedScore = calculateAdvancedMatchScore(currentUser, match, sampleUsers)
      matchScores[match.id] = {
        isMutualMatch: advancedScore.isMutualMatch || false,
        score: advancedScore.score,
        cosineSimilarity: advancedScore.cosineSimilarity,
        semanticRelevance: advancedScore.semanticRelevance,
        collaborativeScore: advancedScore.collaborativeScore,
      }
    })

    return Response.json({ matches, matchScores })
  } catch (error) {
    console.error("Matching error:", error)
    return Response.json({ error: "Failed to find matches" }, { status: 500 })
  }
}
