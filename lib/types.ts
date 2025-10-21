export interface Skill {
  id: string
  name: string
  category: string
  proficiency: "beginner" | "intermediate" | "advanced"
}

export interface User {
  id: string
  name: string
  bio: string
  avatar: string
  skillsToTeach: Skill[]
  skillsToLearn: Skill[]
  createdAt: Date
}

export interface MatchResult {
  user: User
  matchScore: number
  commonTeachLearn: {
    skill: string
    userTeaches: boolean
    userLearns: boolean
  }[]
}

export interface SearchQuery {
  wantToLearn: string
  canTeach: string
}
