"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, Clock, Users, PlayCircle, Lock, CheckCircle, Award, BookOpen, Video, ArrowLeft } from "lucide-react"

export default function CourseDetailPage() {
  const params = useParams()
  const [expandedVideo, setExpandedVideo] = useState(null)
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourseData() {
      try {
        const response = await fetch("/data/courses.json")
        const data = await response.json()
        const course = data.courses.find((c) => c.course_id === Number.parseInt(params.id))
        setCourseData(course)
      } catch (error) {
        console.error("Error loading course data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadCourseData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-white">
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
                <Link href="/courses" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Browse Courses
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link
            href="/courses"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Courses
          </Link>
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
              <Link href="/courses" className="text-gray-600 hover:text-teal-600 transition-colors">
                Browse Courses
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Course Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                {courseData.category}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
                {courseData.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6 text-pretty">{courseData.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold text-gray-900">{courseData.rating}</span>
                  </div>
                  <span className="text-gray-600">({courseData.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{courseData.total_students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{courseData.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <img
                  src={courseData.instructor.profile_image || "/placeholder.svg"}
                  alt={courseData.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="font-semibold text-gray-900">{courseData.instructor.name}</p>
                  <p className="text-sm text-teal-600">{courseData.instructor.expertise}</p>
                </div>
              </div>
            </div>

            {/* Right: Enrollment Card (Desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-24">
                <img
                  src={courseData.thumbnail || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-gray-900">${courseData.price}</span>
                    <span className="text-gray-500 line-through">$99.99</span>
                  </div>
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
                    Enroll Now
                  </button>
                  <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-teal-600" />
                What You'll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Master modern web design principles",
                  "Create responsive layouts with CSS",
                  "Design beautiful user interfaces",
                  "Use Figma for professional designs",
                  "Understand color theory and typography",
                  "Build accessible web experiences",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-teal-600" />
                Course Curriculum
              </h2>
              <div className="space-y-2">
                {courseData.videos.map((video, index) => (
                  <div
                    key={video.video_id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-teal-300 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedVideo(expandedVideo === video.video_id ? null : video.video_id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          {video.is_free ? (
                            <PlayCircle className="w-6 h-6 text-teal-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 mb-1">
                            {index + 1}. {video.title}
                          </p>
                          {video.is_free && (
                            <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded">
                              Free Preview
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </button>
                    {expandedVideo === video.video_id && (
                      <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600 mt-3">{video.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-teal-600" />
                About the Instructor
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src={courseData.instructor.profile_image || "/placeholder.svg"}
                  alt={courseData.instructor.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{courseData.instructor.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{courseData.instructor.expertise}</p>
                  <p className="text-gray-600">{courseData.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar (Desktop only - enrollment card is already sticky above) */}
          <div className="hidden lg:block">{/* Empty space for layout - enrollment card is sticky above */}</div>
        </div>
      </div>

      {/* Mobile Enrollment Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${courseData.price}</p>
            <p className="text-sm text-gray-500 line-through">$99.99</p>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}
