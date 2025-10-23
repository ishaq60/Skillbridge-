import type { User, MatchScore } from "./types"

/**
 * ML-based matching algorithm that scores compatibility between users
 * Uses multiple factors: mutual matching, skill complementarity, experience level balance, and mutual interests
 */
export function calculateMatchScore(currentUser: User, potentialMatch: User): MatchScore {
  const isMutualMatch =
    currentUser.skillsLooking.some((skill) => potentialMatch.skillsOffering.includes(skill)) &&
    potentialMatch.skillsLooking.some((skill) => currentUser.skillsOffering.includes(skill))

  // Factor 1: Skill Complementarity (40% weight)
  const complementarySkills = currentUser.skillsLooking.filter((skill) => potentialMatch.skillsOffering.includes(skill))
  const mutualTeachingSkills = potentialMatch.skillsLooking.filter((skill) =>
    currentUser.skillsOffering.includes(skill),
  )

  const skillComplementarityScore =
    ((complementarySkills.length + mutualTeachingSkills.length) /
      (currentUser.skillsLooking.length + potentialMatch.skillsLooking.length)) *
    100

  // Factor 2: Experience Level Balance (30% weight)
  const experienceLevelMap = { Beginner: 1, Intermediate: 2, Advanced: 3 }
  const currentLevel = experienceLevelMap[currentUser.experienceLevel]
  const matchLevel = experienceLevelMap[potentialMatch.experienceLevel]

  // Prefer balanced experience levels (not too different)
  const levelDifference = Math.abs(currentLevel - matchLevel)
  const experienceLevelScore = Math.max(0, 100 - levelDifference * 25)

  // Factor 3: Mutual Interest (30% weight)
  const mutualInterests = currentUser.skillsLooking.filter((skill) => potentialMatch.skillsLooking.includes(skill))
  const mutualInterestScore = (mutualInterests.length / Math.max(1, currentUser.skillsLooking.length)) * 100

  // Combined weighted score with mutual match boost
  let totalScore = skillComplementarityScore * 0.4 + experienceLevelScore * 0.3 + mutualInterestScore * 0.3

  if (isMutualMatch) {
    totalScore += 50
  }

  return {
    userId: potentialMatch.id,
    score: Math.round(Math.min(totalScore, 150)), // Cap at 150 for mutual matches
    complementarySkills: [...complementarySkills, ...mutualTeachingSkills],
    mutualInterests,
    isMutualMatch, // Include mutual match flag in response
  }
}

/**
 * Find best matches for a user based on ML scoring
 */
export function findBestMatches(currentUser: User, allUsers: User[], topN = 5): User[] {
  const scores = allUsers
    .filter((user) => user.id !== currentUser.id)
    .map((user) => ({
      user,
      score: calculateMatchScore(currentUser, user),
    }))
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, topN)

  return scores.map((item) => item.user)
}
