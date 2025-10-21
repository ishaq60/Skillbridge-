"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { Search, Sparkles, Loader2, BookOpen, Users, Award } from "lucide-react"

import { useRouter } from "next/navigation"
import Link from "next/link"






export default function Home() {
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
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Skillbridge</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
                Courses
              </Link>
              <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
                Browse
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Connect
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
