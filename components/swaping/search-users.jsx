// "use client"

// import { useState, useMemo } from "react"
// import { Input } from "../../components/ui/input"
// import { Button } from "../../components/ui/button"
// import { Card } from "../../components/ui/card"
// import { Badge } from "../../components/ui/badge"
// import type { User } from "../../lib/matching/types"
// import { Search, X } from "lucide-react"

// interface SearchUsersProps {
//   users: User[]
//   currentUser: User | null
//   matchScores: Record<
//     string,
//     {
//       isMutualMatch: boolean
//       score: number
//       cosineSimilarity: number
//       semanticRelevance: number
//       collaborativeScore: number
//     }
//   >
//   onSelectUser?: (user: User) => void
// }

// export default function SearchUsers({ users, currentUser, matchScores, onSelectUser }: SearchUsersProps) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [searchType, setSearchType] = useState<"all" | "name" | "skills">("all")

//   const filteredUsers = useMemo(() => {
//     if (!searchQuery.trim()) return []

//     const query = searchQuery.toLowerCase()

//     return users
//       .filter((user) => user.id !== currentUser?.id)
//       .filter((user) => {
//         if (searchType === "name") {
//           return user.name.toLowerCase().includes(query)
//         }
//         if (searchType === "skills") {
//           return (
//             user.skillsOffering.some((skill) => skill.toLowerCase().includes(query)) ||
//             user.skillsLooking.some((skill) => skill.toLowerCase().includes(query))
//           )
//         }
//         // "all" - search in name and skills
//         return (
//           user.name.toLowerCase().includes(query) ||
//           user.skillsOffering.some((skill) => skill.toLowerCase().includes(query)) ||
//           user.skillsLooking.some((skill) => skill.toLowerCase().includes(query))
//         )
//       })
//       .sort((a, b) => {
//         // Sort by match score if available
//         const scoreA = matchScores[a.id]?.score || 0
//         const scoreB = matchScores[b.id]?.score || 0
//         return scoreB - scoreA
//       })
//   }, [searchQuery, searchType, users, currentUser, matchScores])

//   return (
//     <div className="space-y-4">
//       {/* Search Header */}
//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold text-gray-900">Search Users</h2>

//         {/* Search Input */}
//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//           <Input
//             placeholder="Search by name or skills..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 pr-10"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           )}
//         </div>

//         {/* Search Type Filter */}
//         <div className="flex gap-2">
//           {(["all", "name", "skills"] as const).map((type) => (
//             <Button
//               key={type}
//               variant={searchType === type ? "default" : "outline"}
//               size="sm"
//               onClick={() => setSearchType(type)}
//               className={searchType === type ? "bg-indigo-600 hover:bg-indigo-700" : "border-gray-300"}
//             >
//               {type === "all" ? "All" : type === "name" ? "Name" : "Skills"}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Search Results */}
//       {searchQuery && (
//         <div className="space-y-3">
//           <p className="text-sm text-gray-600">
//             Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
//           </p>

//           {filteredUsers.length > 0 ? (
//             <div className="grid gap-3 max-h-96 overflow-y-auto">
//               {filteredUsers.map((user) => {
//                 const score = matchScores[user.id]
//                 const isMutual = score?.isMutualMatch

//                 return (
//                   <Card
//                     key={user.id}
//                     className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
//                       isMutual
//                         ? "border-2 border-green-500 bg-green-50"
//                         : "border border-gray-200 hover:border-indigo-300"
//                     }`}
//                     onClick={() => onSelectUser?.(user)}
//                   >
//                     <div className="space-y-2">
//                       {/* User Header */}
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{user.name}</h3>
//                           <p className="text-sm text-gray-600">{user.bio}</p>
//                         </div>
//                         {isMutual && (
//                           <Badge className="bg-green-500 text-white whitespace-nowrap ml-2">Perfect Match</Badge>
//                         )}
//                       </div>

//                       {/* Match Score */}
//                       {score && (
//                         <div className="flex items-center gap-2">
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div
//                               className={`h-2 rounded-full transition-all ${
//                                 isMutual ? "bg-green-500" : "bg-indigo-600"
//                               }`}
//                               style={{ width: `${score.score}%` }}
//                             />
//                           </div>
//                           <span className="text-sm font-semibold text-gray-900 min-w-fit">
//                             {Math.round(score.score)}%
//                           </span>
//                         </div>
//                       )}

//                       {/* Skills */}
//                       <div className="space-y-1">
//                         <p className="text-xs font-semibold text-gray-700">Can teach:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {user.skillsOffering.map((skill) => (
//                             <Badge key={skill} variant="secondary" className="text-xs">
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-1">
//                         <p className="text-xs font-semibold text-gray-700">Wants to learn:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {user.skillsLooking.map((skill) => (
//                             <Badge key={skill} variant="outline" className="text-xs">
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Experience Level */}
//                       <div className="flex items-center justify-between pt-2 border-t border-gray-200">
//                         <span className="text-xs text-gray-600">Level: {user.experienceLevel}</span>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             onSelectUser?.(user)
//                           }}
//                         >
//                           View Details
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 )
//               })}
//             </div>
//           ) : (
//             <Card className="p-8 text-center">
//               <p className="text-gray-500">No users found matching your search</p>
//             </Card>
//           )}
//         </div>
//       )}

//       {/* Empty State */}
//       {!searchQuery && (
//         <Card className="p-8 text-center bg-gray-50">
//           <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//           <p className="text-gray-500">Start typing to search for users by name or skills</p>
//         </Card>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { Search, Sparkles, Loader2, BookOpen, Users, Award } from "lucide-react"

import { useRouter } from "next/navigation"
import Link from "next/link"






export default function SearchUsers() {
  const [error,seterror]=useState(null)
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/extract-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to results with extracted skills
        const params = new URLSearchParams({
          learn: JSON.stringify(data.learnSkills),
          teach: JSON.stringify(data.teachSkills),
        })
        router.push(`/results?${params}`)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }


  const exampleSearches = [
    "I know Java and want to learn Python",
    "Expert in React, need to learn backend",
    "Beginner, want to learn Web Development",
    "Know Python, want to learn Machine Learning",
  ]

  return (
    <div className="min-h-screen bg-white">
     
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Learning Match</h1>
            <p className="text-lg text-muted-foreground">
              Tell us what you know and what you want to learn. Our AI will find the perfect peer to swap skills with.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-600/10 rounded-lg blur-lg" />
              <div className="relative bg-white border-2 border-teal-200 rounded-lg p-1 flex items-center gap-2 hover:border-teal-600 transition-colors">
                <Search className="w-5 h-5 text-teal-600 ml-3" />
                <Input
                  type="text"
                  placeholder="e.g., I know Java and want to learn Python"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0"
                />
                <Button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="mr-1 bg-teal-600 hover:bg-teal-500 text-white border-0"
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

        

          {/* Example Searches */}
         
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4 text-center">Try these searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {exampleSearches.map((example) => (
                  <button
                    key={example}
                    onClick={() => {
                      setQuery(example)
                      setTimeout(() => {
                        const form = document.querySelector("form")
                        form?.dispatchEvent(new Event("submit", { bubbles: true }))
                      }, 0)
                    }}
                    className="px-4 py-2 text-sm bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full transition-colors border border-teal-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          
        </div>
      </section>
    </div>
  )
}
