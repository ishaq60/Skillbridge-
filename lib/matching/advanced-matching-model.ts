import type { User, AdvancedMatchScore } from "./types"
import { createUserProfileVector, cosineSimilarity, getSkillEmbedding } from "./skill-embeddings"



// Simulated interaction history (in production, this would come from a database)
const interactionHistory: Record<string, Set<string>> = {}

/**
 * Calculate Cosine Similarity Score
 * Measures semantic similarity between user skill profiles
 */
function calculateCosineSimilarityScore(currentUser: User, potentialMatch: User): number {
  const currentVector = createUserProfileVector([...currentUser.skillsOffering, ...currentUser.skillsLooking])
  const matchVector = createUserProfileVector([...potentialMatch.skillsOffering, ...potentialMatch.skillsLooking])

  return cosineSimilarity(currentVector, matchVector)
}

/**
 * Calculate Collaborative Filtering Score
 * Finds users with similar skill interests and recommends their matches
 */
function calculateCollaborativeScore(currentUser: User, potentialMatch: User, allUsers: User[]): number {
  // Find users similar to current user
  const similarUsers = allUsers
    .filter((u) => u.id !== currentUser.id && u.id !== potentialMatch.id)
    .map((u) => ({
      user: u,
      similarity: cosineSimilarity(
        createUserProfileVector([...currentUser.skillsOffering, ...currentUser.skillsLooking]),
        createUserProfileVector([...u.skillsOffering, ...u.skillsLooking]),
      ),
    }))
    .filter((item) => item.similarity > 0.6)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)

  // Check if similar users have interacted with potential match
  let collaborativeScore = 0
  similarUsers.forEach((item) => {
    if (interactionHistory[item.user.id]?.has(potentialMatch.id)) {
      collaborativeScore += item.similarity * 0.3
    }
  })

  return Math.min(collaborativeScore, 1)
}

/**
 * Calculate Semantic Relevance Score
 * Measures how well the skills align semantically
 */
function calculateSemanticRelevance(currentUser: User, potentialMatch: User): number {
  let relevanceScore = 0
  let totalComparisons = 0

  // Check how well potential match's offerings match current user's needs
  currentUser.skillsLooking.forEach((skill) => {
    const skillVector = getSkillEmbedding(skill)
    potentialMatch.skillsOffering.forEach((offeredSkill) => {
      const offeredVector = getSkillEmbedding(offeredSkill)
      relevanceScore += cosineSimilarity(skillVector, offeredVector)
      totalComparisons++
    })
  })

  // Check mutual teaching opportunities
  potentialMatch.skillsLooking.forEach((skill) => {
    const skillVector = getSkillEmbedding(skill)
    currentUser.skillsOffering.forEach((offeredSkill) => {
      const offeredVector = getSkillEmbedding(offeredSkill)
      relevanceScore += cosineSimilarity(skillVector, offeredVector)
      totalComparisons++
    })
  })

  return totalComparisons > 0 ? relevanceScore / totalComparisons : 0
}

/**
 * Calculate Location Distance Score
 * Prioritizes users in same location or nearby
 */
function calculateLocationScore(currentUser: User, potentialMatch: User): number {
  if (currentUser.location === potentialMatch.location) {
    return 1.0 // Same location = perfect score
  }
  // Extract city from location string
  const currentCity = currentUser.location.split(",")[0].trim()
  const matchCity = potentialMatch.location.split(",")[0].trim()

  if (currentCity === matchCity) {
    return 0.8 // Same city = high score
  }

  // Different locations get lower score
  return 0.3
}

/**
 * Calculate Language Match Score
 * Prioritizes users with same language
 */
function calculateLanguageScore(currentUser: User, potentialMatch: User): number {
  return currentUser.language === potentialMatch.language ? 1.0 : 0.4
}

/**
 * Calculate Rating Score
 * Prioritizes highly-rated users
 */
function calculateRatingScore(potentialMatch: User): number {
  // Normalize rating from 0-5 to 0-1 scale
  return potentialMatch.rating / 5
}

/**
 * Advanced ML-based matching algorithm with location, language, and rating
 */
export function calculateAdvancedMatchScore(
  currentUser: User,
  potentialMatch: User,
  allUsers: User[],
): AdvancedMatchScore {
  // Calculate individual scores
  const cosineSim = calculateCosineSimilarityScore(currentUser, potentialMatch)
  const collaborativeScore = calculateCollaborativeScore(currentUser, potentialMatch, allUsers)
  const semanticRelevance = calculateSemanticRelevance(currentUser, potentialMatch)

  // Experience level compatibility (0-1 scale)
  const experienceLevelMap = { Beginner: 1, Intermediate: 2, Advanced: 3 }
  const levelDiff = Math.abs(
    experienceLevelMap[currentUser.experienceLevel] - experienceLevelMap[potentialMatch.experienceLevel],
  )
  const experienceCompatibility = Math.max(0, 1 - levelDiff * 0.25)

  const locationScore = calculateLocationScore(currentUser, potentialMatch)
  const languageScore = calculateLanguageScore(currentUser, potentialMatch)
  const ratingScore = calculateRatingScore(potentialMatch)

  // Weighted combination of all factors (updated weights to include new factors)
  const finalScore =
    cosineSim * 0.25 + // Semantic similarity
    semanticRelevance * 0.25 + // Skill relevance
    collaborativeScore * 0.15 + // Collaborative filtering
    experienceCompatibility * 0.08 + // Experience balance
    locationScore * 0.15 + // Location proximity (HIGH PRIORITY)
    languageScore * 0.12 + // Language match (HIGH PRIORITY)
    ratingScore * 0.0 // Rating as tiebreaker

  // Check for mutual match bonus
  const isMutualMatch =
    currentUser.skillsLooking.some((skill) => potentialMatch.skillsOffering.includes(skill)) &&
    potentialMatch.skillsLooking.some((skill) => currentUser.skillsOffering.includes(skill))

  const complementarySkills = currentUser.skillsLooking.filter((skill) => potentialMatch.skillsOffering.includes(skill))
  const mutualInterests = currentUser.skillsLooking.filter((skill) => potentialMatch.skillsLooking.includes(skill))

  return {
    userId: potentialMatch.id,
    score: Math.round((finalScore + (isMutualMatch ? 0.2 : 0)) * 100), // Convert to 0-100 scale
    complementarySkills,
    mutualInterests,
    isMutualMatch,
    cosineSimilarity: Math.round(cosineSim * 100),
    collaborativeScore: Math.round(collaborativeScore * 100),
    semanticRelevance: Math.round(semanticRelevance * 100),
    modelType: "cosine-similarity",
  }
}

/**
 * Find best matches using advanced ML model
 */
export function findBestMatchesAdvanced(currentUser: User, allUsers: User[], topN = 5): User[] {
  const scores = allUsers
    .filter((user) => user.id !== currentUser.id)
    .map((user) => ({
      user,
      score: calculateAdvancedMatchScore(currentUser, user, allUsers),
    }))
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, topN)

  return scores.map((item) => item.user)
}

/**
 * Record user interaction for collaborative filtering
 */
export function recordInteraction(userId: string, matchedUserId: string): void {
  if (!interactionHistory[userId]) {
    interactionHistory[userId] = new Set()
  }
  interactionHistory[userId].add(matchedUserId)
}
