export interface User {
  id: string
  name: string
  bio: string
  skillsOffering: string[]
  skillsLooking: string[]
  experienceLevel: "Beginner" | "Intermediate" | "Advanced"
  location: string
  language: string
  rating: number // 0-5 stars
}

export interface MatchScore {
  userId: string
  score: number
  complementarySkills: string[]
  mutualInterests: string[]
  isMutualMatch?: boolean
}

export interface SkillEmbedding {
  skill: string
  vector: number[]
}

export interface UserProfile {
  userId: string
  skillVector: number[]
  experienceVector: number[]
  interactionHistory: string[] // Track past interactions for collaborative filtering
}

export interface AdvancedMatchScore extends MatchScore {
  cosineSimilarity: number
  collaborativeScore: number
  semanticRelevance: number
  modelType: "cosine-similarity" | "collaborative-filtering"
}
