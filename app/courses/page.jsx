"use client"

import { useState, useEffect } from "react"

import { Search, Star, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const coursesPerPage = 6

  const categories = [
    "All",
    "Web Development",
    "Web Design",
    "Data Science",
    "Mobile Development",
    "Design",
    "Marketing",
  ]

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch("/data/courses.json")
        const data = await response.json()
        setCourses(data.courses)
        setFilteredCourses(data.courses)
      } catch (error) {
        console.error("Error loading courses:", error)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  useEffect(() => {
    let filtered = courses

    if (selectedCategory !== "All") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredCourses(filtered)
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, courses])

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-teal-600">
              Skillbridge
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                Home
              </Link>
              <Link href="/skillswap" className="text-gray-600 hover:text-teal-600 transition-colors">
                Find Learners
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-teal-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">Explore Our Courses</h1>
          <p className="text-lg text-gray-600 text-pretty">
            Discover high-quality courses taught by expert instructors. Learn new skills and advance your career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category ? "bg-teal-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                    {category === "All" && <span className="ml-2 text-sm opacity-75">({courses.length})</span>}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} of{" "}
                {filteredCourses.length} courses
              </p>
            </div>

            {/* Course Grid */}
            {currentCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCourses.map((course) => (
                  <Link
                    key={course.course_id}
                    href={`/courses/${course?.course_id}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
                        ${course.price}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded mb-2">
                        {course.category}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={course.instructor.profile_image || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700">{course.instructor.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{course.rating}</span>
                          <span>({course.total_reviews})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.total_students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-teal-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
