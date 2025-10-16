"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Large Text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-teal-500/10 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-teal-600">
              <svg className="w-24 h-24 md:w-32 md:h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200 w-full sm:w-auto"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 w-full sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/skillswap"
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-200 w-full sm:w-auto"
          >
            Browse Learners
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="text-teal-600 hover:text-teal-700 text-sm font-medium hover:underline">
              Home
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/skillswap" className="text-teal-600 hover:text-teal-700 text-sm font-medium hover:underline">
              Find Learners
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="text-teal-600 hover:text-teal-700 text-sm font-medium hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
