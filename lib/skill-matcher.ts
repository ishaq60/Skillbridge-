/**
 * Calculate match score between user skills and target user
 * @param {string[]} userTeaches - Skills the user can teach
 * @param {string[]} userLearns - Skills the user wants to learn
 * @param {Object} targetUser - The user to match against
 * @returns {Object} Score and common skill pairs
 */
export function calculateMatchScore(userTeaches, userLearns, targetUser) {
  const commonPairs = []
  let score = 0

  // Check if target user teaches what we want to learn
  const targetTeachesSkills = targetUser.skillsToTeach.map((s) => s.name.toLowerCase())
  const targetLearnsSkills = targetUser.skillsToLearn.map((s) => s.name.toLowerCase())

  userLearns.forEach((skill) => {
    const skillLower = skill.toLowerCase()
    if (targetTeachesSkills.some((t) => t.includes(skillLower) || skillLower.includes(t))) {
      score += 40
      commonPairs.push({ skill, userTeaches: false, userLearns: true })
    }
  })

  // Check if target user learns what we teach
  userTeaches.forEach((skill) => {
    const skillLower = skill.toLowerCase()
    if (targetLearnsSkills.some((t) => t.includes(skillLower) || skillLower.includes(t))) {
      score += 40
      commonPairs.push({ skill, userTeaches: true, userLearns: false })
    }
  })

  // Bonus for mutual interest (they teach what we learn AND vice versa)
  const mutualMatches = commonPairs.filter((p) => p.userTeaches && p.userLearns).length
  score += mutualMatches * 20

  return { score: Math.min(score, 100), commonPairs }
}

/**
 * Find matching users based on skill compatibility
 * @param {string[]} userTeaches - Skills the user can teach
 * @param {string[]} userLearns - Skills the user wants to learn
 * @param {Object[]} allUsers - All available users
 * @returns {Object[]} Sorted array of matches with scores
 */
export function findMatches(userTeaches, userLearns, allUsers) {
  const matches = allUsers
    .map((user) => {
      const { score, commonPairs } = calculateMatchScore(userTeaches, userLearns, user)
      return {
        user,
        matchScore: score,
        commonTeachLearn: commonPairs,
      }
    })
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)

  return matches
}
