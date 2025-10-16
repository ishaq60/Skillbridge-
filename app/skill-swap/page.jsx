"use client"

import { useState } from "react"


import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"


import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"

import { Star, Users, Clock, Award, CheckCircle2, Search, Menu, X, MessageCircle, Video } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Learners", count: 48 },
  { id: "web-dev", name: "Web Development", count: 12 },
  { id: "mobile", name: "Mobile Development", count: 8 },
  { id: "data-science", name: "Data Science", count: 10 },
  { id: "design", name: "UI/UX Design", count: 7 },
  { id: "business", name: "Business & Marketing", count: 6 },
  { id: "languages", name: "Programming Languages", count: 5 },
]

const learners = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/professional-female-avatar.png",
    category: "web-dev",
    rating: 4.9,
    swaps: 23,
    offering: ["React & Next.js", "JavaScript"],
    seeking: ["UI/UX Design"],
    availability: "Weekends",
    verified: true,
    level: "Expert",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/professional-male-avatar.png",
    category: "data-science",
    rating: 4.8,
    swaps: 31,
    offering: ["Python", "Machine Learning"],
    seeking: ["Web Development"],
    availability: "Evenings",
    verified: true,
    level: "Advanced",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/professional-asian-male-avatar.jpg",
    category: "mobile",
    rating: 4.7,
    swaps: 18,
    offering: ["iOS Development", "Swift"],
    seeking: ["Android Development"],
    availability: "Flexible",
    verified: true,
    level: "Intermediate",
  },
  {
    id: 4,
    name: "David Kumar",
    avatar: "/avatar-1.png",
    category: "design",
    rating: 4.9,
    swaps: 42,
    offering: ["UI/UX Design", "Figma"],
    seeking: ["Frontend Development"],
    availability: "Weekdays",
    verified: true,
    level: "Expert",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    avatar: "/professional-female-avatar.png",
    category: "business",
    rating: 4.6,
    swaps: 15,
    offering: ["Digital Marketing", "SEO"],
    seeking: ["Content Writing"],
    availability: "Mornings",
    verified: true,
    level: "Intermediate",
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "/professional-male-avatar.png",
    category: "languages",
    rating: 4.8,
    swaps: 27,
    offering: ["Java", "Spring Boot"],
    seeking: ["Python"],
    availability: "Weekends",
    verified: true,
    level: "Advanced",
  },
  {
    id: 7,
    name: "Amanda Foster",
    avatar: "/professional-female-avatar.png",
    category: "web-dev",
    rating: 4.7,
    swaps: 20,
    offering: ["Vue.js", "Node.js"],
    seeking: ["React"],
    availability: "Evenings",
    verified: true,
    level: "Intermediate",
  },
  {
    id: 8,
    name: "Robert Lee",
    avatar: "/professional-asian-male-avatar.jpg",
    category: "mobile",
    rating: 4.9,
    swaps: 35,
    offering: ["Android", "Kotlin"],
    seeking: ["iOS Development"],
    availability: "Flexible",
    verified: true,
    level: "Expert",
  },
]

export default function SkillSwapPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredLearners = learners.filter((learner) => {
    const matchesCategory = selectedCategory === "all" || learner.category === selectedCategory
    const matchesSearch =
      learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.offering.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      learner.seeking.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                Skillbridge <span className="text-teal-600">Connect</span>
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category Filter */}
          <aside className={`lg:w-64 flex-shrink-0 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <h2 className="font-semibold text-lg text-slate-900">Filter by Skills</h2>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === category.id
                          ? "bg-teal-600 text-white shadow-md"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge
                        variant="secondary"
                        className={`${
                          selectedCategory === category.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="mt-6 border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-sm">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-teal-600" />
                    Why Choose Us
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-slate-900">Verified Learners</p>
                      <p className="text-xs text-slate-600">All profiles verified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-slate-900">AI Matching</p>
                      <p className="text-xs text-slate-600">Smart skill pairing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-slate-900">Real-time Chat</p>
                      <p className="text-xs text-slate-600">Instant communication</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-slate-900">Video Calls</p>
                      <p className="text-xs text-slate-600">Face-to-face learning</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search learners or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {selectedCategory === "all" ? "All Learners" : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-slate-600">
                {filteredLearners.length} {filteredLearners.length === 1 ? "learner" : "learners"} available
              </p>
            </div>

            {/* Learner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLearners.map((learner) => (
                <Card
                  key={learner.id}
                  className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col bg-white"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={learner.avatar || "/placeholder.svg"}
                          alt={learner.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-teal-100"
                        />
                        {learner.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-teal-600 rounded-full p-1">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg text-slate-900 truncate">{learner.name}</h3>
                            {learner.verified && (
                              <Badge className="mt-1 bg-teal-100 text-teal-700 border-0 text-xs">Verified</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-sm text-slate-900">{learner.rating}</span>
                          </div>
                          <span className="text-sm text-slate-600">• {learner.swaps} swaps</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Offering</p>
                      <div className="flex flex-wrap gap-2">
                        {learner.offering.map((skill, index) => (
                          <Badge key={index} className="bg-teal-600 text-white border-0 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Seeking</p>
                      <div className="flex flex-wrap gap-2">
                        {learner.seeking.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-teal-600 text-teal-700 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-teal-600" />
                      <span>Available: {learner.availability}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center gap-2 pt-4 border-t">
                    <Button asChild className="flex-1 bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                      <Link href={`/contact?user=${learner.id}&name=${encodeURIComponent(learner.name)}`}>
                        <Users className="h-4 w-4 mr-2" />
                        Connect
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                    >
                      <Link href={`/contact?user=${learner.id}&name=${encodeURIComponent(learner.name)}&mode=chat`}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                    >
                      <Link href={`/contact?user=${learner.id}&name=${encodeURIComponent(learner.name)}&mode=video`}>
                        <Video className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredLearners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No learners found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
