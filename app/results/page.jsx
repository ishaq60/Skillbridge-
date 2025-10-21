"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { Search, Sparkles, MessageCircle, Star, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// export default function Home() {
//   const [error, setError] = useState(null)
//   const [query, setQuery] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [matches, setMatches] = useState([])
//   const [learnSkills, setLearnSkills] = useState([])
//   const [teachSkills, setTeachSkills] = useState([])

//   const handleSearch = async (e) => {
//     e.preventDefault()
//     if (!query.trim()) return

//     setLoading(true)
//     setError(null)
//     setMatches([])

//     try {
//       // 1️⃣ Extract skills
//       const skillRes = await fetch("/api/extract-skills", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query }),
//       })
//       const skillData = await skillRes.json()

//       if (!skillData.success) throw new Error("Failed to extract skills")

//       setLearnSkills(skillData.learnSkills)
//       setTeachSkills(skillData.teachSkills)

//       // 2️⃣ Find matches
//       const matchRes = await fetch("/api/find-matches", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           learn: skillData.learnSkills,
//           teach: skillData.teachSkills,
//         }),
//       })
//       const matchData = await matchRes.json()

//       if (matchData.success) {
//         setMatches(matchData.matches)
//       } else {
//         setError("No matches found.")
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const exampleSearches = [
//     "I know Java and want to learn Python",
//     "Expert in React, need to learn backend",
//     "Beginner, want to learn Web Development",
//     "Know Python, want to learn Machine Learning",
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link href="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold">Skillbridge</span>
//             </Link>
//             <div className="flex items-center gap-4">
//               <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
//                 Courses
//               </Link>
//               <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
//                 Browse
//               </Link>
//               <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
//                 Connect
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="py-12 sm:py-16 bg-gradient-to-b from-teal-50 to-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center mb-8">
//             <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Learning Match</h1>
//             <p className="text-lg text-muted-foreground">
//               Tell us what you know and what you want to learn. Our AI will find the perfect peer to swap skills with.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-600/10 rounded-lg blur-lg" />
//               <div className="relative bg-white border-2 border-teal-200 rounded-lg p-1 flex items-center gap-2 hover:border-teal-600 transition-colors">
//                 <Search className="w-5 h-5 text-teal-600 ml-3" />
//                 <Input
//                   type="text"
//                   placeholder="e.g., I know Java and want to learn Python"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="flex-1 bg-transparent border-0 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0"
//                 />
//                 <Button
//                   type="submit"
//                   disabled={loading || !query.trim()}
//                   className="mr-1 bg-teal-600 hover:bg-teal-500 text-white border-0"
//                 >
//                   {loading ? "Searching..." : "Search"}
//                 </Button>
//               </div>
//             </div>
//           </form>

//           {/* Error Message */}
//           {error && (
//             <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//               {error}
//             </div>
//           )}

//           {/* Example Searches */}
//           <div className="max-w-2xl mx-auto mb-12">
//             <p className="text-sm text-muted-foreground mb-4 text-center">Try these searches:</p>
//             <div className="flex flex-wrap gap-2 justify-center">
//               {exampleSearches.map((example) => (
//                 <button
//                   key={example}
//                   onClick={() => setQuery(example)}
//                   className="px-4 py-2 text-sm bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full transition-colors border border-teal-200"
//                 >
//                   {example}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="max-w-6xl mx-auto">
//             {loading && (
//               <p className="text-center text-gray-600 py-12">Finding your perfect matches...</p>
//             )}

//             {!loading && matches.length > 0 && (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {matches.map((match) => (
//                   <Card
//                     key={match.user.id}
//                     className="border-0 bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative"
//                   >
//                     <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-full px-4 py-2 flex items-center gap-2 font-semibold">
//                       <Star className="h-4 w-4 fill-current" />
//                       {match.matchScore}%
//                     </div>

//                     <div className="p-6">
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200">
//                           <Image
//                             src={match.user.avatar || "/placeholder.svg"}
//                             alt={match.user.name}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-lg text-gray-900">{match.user.name}</h3>
//                           <p className="text-sm text-gray-600">
//                             Joined {new Date(match.user.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>

//                       <p className="text-gray-700 text-sm mb-4">{match.user.bio}</p>

//                       <div className="mb-4">
//                         <p className="text-xs font-semibold text-gray-600 uppercase mb-2">They can teach</p>
//                         <div className="flex flex-wrap gap-2">
//                           {match.user.skillsToTeach.slice(0, 3).map((skill) => (
//                             <span
//                               key={skill.id}
//                               className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium"
//                             >
//                               {skill.name}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="mb-6">
//                         <p className="text-xs font-semibold text-gray-600 uppercase mb-2">They want to learn</p>
//                         <div className="flex flex-wrap gap-2">
//                           {match.user.skillsToLearn.slice(0, 3).map((skill) => (
//                             <span
//                               key={skill.id}
//                               className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
//                             >
//                               {skill.name}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <Button className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 gap-2">
//                         <MessageCircle className="h-4 w-4" />
//                         Connect
//                       </Button>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {!loading && matches.length === 0 && learnSkills.length > 0 && (
//               <p className="text-center text-gray-500 py-12">No matches found. Try different skills!</p>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


export default function Home() {
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState([])
  const [learnSkills, setLearnSkills] = useState([])
  const [teachSkills, setTeachSkills] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setMatches([])

    try {
      const skillRes = await fetch("/api/extract-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const skillData = await skillRes.json()

      if (!skillData.success) throw new Error("Failed to extract skills")

      setLearnSkills(skillData.learnSkills)
      setTeachSkills(skillData.teachSkills)

      const matchRes = await fetch("/api/find-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learn: skillData.learnSkills,
          teach: skillData.teachSkills,
        }),
      })
      const matchData = await matchRes.json()

      if (matchData.success) {
        setMatches(matchData.matches)
      } else {
        setError("No matches found.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
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
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Skillbridge</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/courses" className="text-sm text-gray-600 hover:text-gray-900">
                Courses
              </a>
              <a href="/marketplace" className="text-sm text-gray-600 hover:text-gray-900">
                Browse
              </a>
              <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Connect
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-12 sm:py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Learning Match</h1>
            <p className="text-lg text-gray-600">
              Tell us what you know and what you want to learn. Our AI will find the perfect peer to swap skills with.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-600/10 rounded-lg blur-lg" />
              <div className="relative bg-white border-2 border-teal-200 rounded-lg p-1 flex items-center gap-2 hover:border-teal-600 transition-colors">
                <Search className="w-5 h-5 text-teal-600 ml-3" />
                <Input
                  type="text"
                  placeholder="e.g., I know Java and want to learn Python"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="flex-1 bg-transparent border-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading || !query.trim()}
                  className="mr-1 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-sm text-gray-600 mb-4 text-center">Try these searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {exampleSearches.map((example) => (
                <button
                  key={example}
                  onClick={() => setQuery(example)}
                  className="px-4 py-2 text-sm bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full transition-colors border border-teal-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-teal-600 mb-4" />
                <p className="text-gray-600 text-lg">Finding your perfect matches...</p>
              </div>
            )}

            {!loading && matches.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                  <Card
                    key={match.user.id}
                    className="border border-gray-200 bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow relative"
                  >
                    <div className="absolute top-4 right-4 bg-teal-600 text-white rounded-full px-4 py-2 flex items-center gap-2 font-semibold shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                      {match.matchScore}%
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-teal-700">
                            {match.user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{match.user.name}</h3>
                          <p className="text-sm text-gray-600">
                            Joined {new Date(match.user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4">{match.user.bio}</p>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">They can teach</p>
                        <div className="flex flex-wrap gap-2">
                          {match.user.skillsToTeach.slice(0, 3).map((skill) => (
                            <span
                              key={skill.id}
                              className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">They want to learn</p>
                        <div className="flex flex-wrap gap-2">
                          {match.user.skillsToLearn.slice(0, 3).map((skill) => (
                            <span
                              key={skill.id}
                              className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium border border-teal-200"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Connect
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!loading && matches.length === 0 && learnSkills.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 text-center max-w-md">
                  We couldn't find anyone matching your skills right now. Try different skills or check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}