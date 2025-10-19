import { NextResponse } from "next/server"
import users from "../../../public/data/users.json"
import coursesData from "../../../public/data/courses.json"

const skillKeywords = {
  Python: ["python", "py"],
  Java: ["java"],
  JavaScript: ["javascript", "js", "node"],
  React: ["react", "reactjs"],
  Angular: ["angular"],
  Vue: ["vue", "vuejs"],
  "C++": ["c++", "cpp"],
  "C#": ["c#", "csharp"],
  Go: ["golang", "go"],
  Rust: ["rust"],
  PHP: ["php"],
  Ruby: ["ruby"],
  Swift: ["swift"],
  Kotlin: ["kotlin"],
  TypeScript: ["typescript", "ts"],
  HTML: ["html"],
  CSS: ["css"],
  SQL: ["sql", "database", "postgresql", "mysql"],
  MongoDB: ["mongodb", "mongo"],
  PostgreSQL: ["postgresql", "postgres"],
  Django: ["django"],
  Flask: ["flask"],
  Express: ["express", "expressjs"],
  Spring: ["spring"],
  "Machine Learning": ["machine learning", "ml", "ai", "artificial intelligence"],
  "Data Science": ["data science", "data analysis"],
  "Web Development": ["web development", "web dev", "frontend", "backend"],
  "Mobile Development": ["mobile development", "ios", "android"],
  DevOps: ["devops", "docker", "kubernetes"],
  Cloud: ["aws", "azure", "gcp", "cloud"],
  "English Communication": ["english", "communication", "speaking"],
  Spanish: ["spanish"],
  French: ["french"],
  German: ["german"],
  Hindi: ["hindi"],
  Bengali: ["bengali"],
  "Public Speaking": ["public speaking", "presentation"],
  "Technical Writing": ["technical writing", "documentation"],
  "UI/UX Design": ["ui/ux", "design", "figma", "ux design"],
  "Product Design": ["product design"],
  AWS: ["aws", "amazon web services"],
  Azure: ["azure"],
  GCP: ["gcp", "google cloud"],
  Figma: ["figma"],
  "Next.js": ["next.js", "nextjs"],
}

function extractSkills(text) {
  const lowerText = text.toLowerCase()
  const known = []
  const want = []

  // Split text into sentences to better identify context
  const sentences = text.split(/[.!?]/)

  sentences.forEach((sentence) => {
    const lowerSentence = sentence.toLowerCase()

    // Extract "know" skills
    const knowKeywords = [
      "know",
      "expert",
      "skilled",
      "proficient",
      "experienced",
      "can teach",
      "i have",
      "i'm good at",
      "teach",
      "expertise in",
      "master",
      "proficient in",
      "know how to",
      "familiar with",
    ]

    const knowMatch = knowKeywords.some((kw) => lowerSentence.includes(kw))

    if (knowMatch) {
      for (const [skill, keywords] of Object.entries(skillKeywords)) {
        for (const keyword of keywords) {
          if (lowerSentence.includes(keyword) && !known.includes(skill)) {
            known.push(skill)
            break
          }
        }
      }
    }

    // Extract "want" skills
    const wantKeywords = [
      "want",
      "learn",
      "study",
      "interested",
      "need",
      "improve",
      "want to learn",
      "like to learn",
      "seeking",
      "looking to learn",
      "interested in learning",
      "would like to learn",
    ]

    const wantMatch = wantKeywords.some((kw) => lowerSentence.includes(kw))

    if (wantMatch) {
      for (const [skill, keywords] of Object.entries(skillKeywords)) {
        for (const keyword of keywords) {
          if (lowerSentence.includes(keyword) && !known.includes(skill) && !want.includes(skill)) {
            want.push(skill)
            break
          }
        }
      }
    }
  })

  // If no skills found with context, extract all mentioned skills
  if (known.length === 0 && want.length === 0) {
    for (const [skill, keywords] of Object.entries(skillKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          known.push(skill)
          break
        }
      }
    }
  }

  return { known: [...new Set(known)], want: [...new Set(want)] }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function calculateOptimizedMatchScore(userKnown, userWant, userLanguage, userCountry, userCoordinates, candidate) {
  let score = 0

  const canTeach = userWant.filter((skill) => candidate.offering.includes(skill))
  const wantsToLearn = userKnown.filter((skill) => candidate.seeking.includes(skill))
  const totalSkillMatches = canTeach.length + wantsToLearn.length

  // Perfect 2-way match (they teach what you want AND want what you know) = 100%
  if (canTeach.length > 0 && wantsToLearn.length > 0) {
    // Both directions match - this is ideal
    const perfectMatchBonus = Math.min(canTeach.length * wantsToLearn.length * 25, 100)
    score = Math.min(50 + perfectMatchBonus, 100)
  } else if (totalSkillMatches > 0) {
    // One direction matches
    const skillScore = Math.min(totalSkillMatches * 20, 60)
    score += skillScore
  }

  // Secondary factors only matter if there's at least one skill match
  if (totalSkillMatches > 0) {
    const languageMatch = userLanguage.toLowerCase() === candidate.language.toLowerCase() ? 1 : 0
    score += languageMatch * 10

    const countryMatch = userCountry.toLowerCase() === candidate.country.toLowerCase() ? 1 : 0
    score += countryMatch * 5

    score += (candidate.rating / 5) * 8

    if (candidate.verified) {
      score += 3
    }

    let distanceScore = 0
    if (userCoordinates && candidate.coordinates) {
      const distance = calculateDistance(
        userCoordinates.lat,
        userCoordinates.lng,
        candidate.coordinates.lat,
        candidate.coordinates.lng,
      )
      distanceScore = Math.max(3 - distance / 200, 0)
    }
    score += distanceScore
  }

  return Math.min(score, 100)
}

function findOptimizedMatches(known, want, userLanguage, userCountry, userCoordinates) {
  return users
    .map((user) => {
      const canTeach = want.filter((skill) => user.offering.includes(skill))
      const wantsToLearn = known.filter((skill) => user.seeking.includes(skill))

      return {
        ...user,
        matchScore: calculateOptimizedMatchScore(known, want, userLanguage, userCountry, userCoordinates, user),
        canTeach,
        wantsToLearn,
        matchReasons: [
          ...canTeach.map((skill) => `They can teach you ${skill}`),
          ...wantsToLearn.map((skill) => `They want to learn ${skill}`),
        ],
      }
    })
    .filter((user) => user.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)
}

function findRecommendedCourses(known, want) {
  return coursesData.courses
    .map((course) => {
      let relevanceScore = 0

      want.forEach((skill) => {
        if (
          course.category.toLowerCase().includes(skill.toLowerCase()) ||
          course.title.toLowerCase().includes(skill.toLowerCase())
        ) {
          relevanceScore += 30
        }
      })

      want.forEach((skill) => {
        if (course.title.toLowerCase().includes(skill.toLowerCase())) {
          relevanceScore += 20
        }
      })

      want.forEach((skill) => {
        if (course.instructor.expertise.toLowerCase().includes(skill.toLowerCase())) {
          relevanceScore += 15
        }
      })

      relevanceScore += (course.rating / 5) * 10

      if (course.total_students > 2000) {
        relevanceScore += 5
      }

      return {
        ...course,
        relevanceScore,
      }
    })
    .filter((course) => course.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6)
}

export async function POST(request) {
  try {
    const { query, userLanguage = "English", userCountry = "USA", userCoordinates } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 })
    }

    const { known, want } = extractSkills(query)

    if (known.length === 0 && want.length === 0) {
      const courses = findRecommendedCourses([], [])
      return NextResponse.json(
        {
          query,
          extracted: { known, want },
          matches: null,
          courses: courses.length > 0 ? courses : null,
          message:
            "Please specify skills you know or want to learn (e.g., 'I know Java and want to learn Python'). Check out our recommended courses below!",
        },
        { status: 200 },
      )
    }

    const matches = findOptimizedMatches(known, want, userLanguage, userCountry, userCoordinates)
    const courses = findRecommendedCourses(known, want)

    return NextResponse.json({
      query,
      extracted: { known, want },
      matches: matches.length > 0 ? matches : null,
      courses: courses.length > 0 ? courses : null,
      message:
        matches.length > 0
          ? `Found ${matches.length} perfect match${matches.length !== 1 ? "es" : ""} for you!`
          : "No peer matches found. Check out our recommended courses below!",
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
