/**
 * Skill Embeddings - Maps skills to semantic vectors
 * This simulates word embeddings (like Word2Vec) for skills
 * In production, you'd use pre-trained embeddings or generate them with an AI model
 */

const skillEmbeddings: Record<string, number[]> = {
  // Frontend Skills
  React: [0.9, 0.8, 0.2, 0.1, 0.3],
  JavaScript: [0.95, 0.7, 0.1, 0.2, 0.4],
  "Web Design": [0.7, 0.9, 0.3, 0.1, 0.2],
  CSS: [0.8, 0.85, 0.2, 0.1, 0.3],
  HTML: [0.75, 0.8, 0.15, 0.1, 0.25],

  // Backend Skills
  "Node.js": [0.85, 0.3, 0.8, 0.7, 0.6],
  Python: [0.6, 0.2, 0.9, 0.85, 0.8],
  Java: [0.5, 0.1, 0.95, 0.9, 0.85],
  "Spring Boot": [0.4, 0.05, 0.92, 0.88, 0.82],
  Django: [0.55, 0.15, 0.88, 0.82, 0.78],

  // Data & ML Skills
  "Machine Learning": [0.3, 0.1, 0.7, 0.95, 0.92],
  "Data Science": [0.25, 0.05, 0.65, 0.93, 0.9],
  "Data Analysis": [0.2, 0.0, 0.6, 0.9, 0.88],

  // Database & Architecture
  "Database Design": [0.4, 0.2, 0.85, 0.8, 0.75],
  "System Architecture": [0.3, 0.1, 0.9, 0.85, 0.8],
  "OOP Design": [0.5, 0.3, 0.85, 0.8, 0.75],

  // Mobile & Other
  "React Native": [0.85, 0.7, 0.4, 0.2, 0.3],
  "Mobile Development": [0.8, 0.75, 0.3, 0.15, 0.25],
  "UI/UX": [0.75, 0.9, 0.2, 0.1, 0.15],
  "API Development": [0.6, 0.3, 0.85, 0.75, 0.7],
  DevOps: [0.3, 0.1, 0.8, 0.7, 0.85],
  "Cloud Computing": [0.25, 0.05, 0.75, 0.65, 0.9],
}

/**
 * Get embedding vector for a skill
 * Returns a 5-dimensional vector representing the skill semantically
 */
export function getSkillEmbedding(skill: string): number[] {
  return skillEmbeddings[skill] || [0.5, 0.5, 0.5, 0.5, 0.5] // Default embedding for unknown skills
}

/**
 * Create a user profile vector by averaging skill embeddings
 */
export function createUserProfileVector(skills: string[]): number[] {
  if (skills.length === 0) return [0.5, 0.5, 0.5, 0.5, 0.5]

  const embeddings = skills.map((skill) => getSkillEmbedding(skill))
  const dimensions = embeddings[0].length

  const averaged = Array(dimensions)
    .fill(0)
    .map((_, i) => embeddings.reduce((sum, emb) => sum + emb[i], 0) / embeddings.length)

  return averaged
}

/**
 * Cosine similarity between two vectors
 * Returns a value between 0 and 1 (1 = identical, 0 = orthogonal)
 */
export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0)
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

  if (magnitudeA === 0 || magnitudeB === 0) return 0
  return dotProduct / (magnitudeA * magnitudeB)
}
