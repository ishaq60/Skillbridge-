import React from 'react';
import { ArrowRight, Users, BookOpen, Sparkles, Video, MessageSquare, Shield } from "lucide-react"

const Feauter = () => {
    return (
        <div>
             {/* Trust Indicators */}
      <section className="border-y-2 border-teal-200/50 dark:border-teal-800/50 bg-gradient-to-r from-blue-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p className="text-center text-sm font-semibold text-teal-700 dark:text-teal-400 mb-12 uppercase tracking-wider">Trusted by learners worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-16">
            <div className="text-center group cursor-default hover:scale-110 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-br from-teal-600 to-teal-500 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-sm text-teal-700 dark:text-teal-400 font-semibold">Active Users</div>
            </div>
            <div className="text-center group cursor-default hover:scale-110 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-sm text-blue-700 dark:text-blue-400 font-semibold">Skills Swapped</div>
            </div>
            <div className="text-center group cursor-default hover:scale-110 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-br from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent mb-2">1K+</div>
              <div className="text-sm text-cyan-700 dark:text-cyan-400 font-semibold">Premium Courses</div>
            </div>
            <div className="text-center group cursor-default hover:scale-110 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-300 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-sm text-teal-700 dark:text-teal-400 font-semibold">Match Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-balance lg:text-5xl">
            Everything you need to <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">learn</span> and <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">teach</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 text-pretty font-medium">
            A complete platform for peer-to-peer learning and professional course delivery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white"><span className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">AI-Powered</span> Matching</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Our intelligent algorithm connects you with the perfect learning partner based on skills, goals, and availability.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-teal-100 dark:border-teal-900/50 bg-gradient-to-br from-teal-50 to-teal-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg hover:shadow-teal-100/50 dark:hover:shadow-teal-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white"><span className="bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300 bg-clip-text text-transparent">Real-Time</span> Video Calls</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Learn face-to-face with HD video, screen sharing, and interactive whiteboards for effective collaboration.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-cyan-100 dark:border-cyan-900/50 bg-gradient-to-br from-cyan-50 to-cyan-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg hover:shadow-cyan-100/50 dark:hover:shadow-cyan-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white"><span className="bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">Instant</span> Messaging</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Chat with your learning partners, share files, and coordinate sessions seamlessly in real-time.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-violet-100 dark:border-violet-900/50 bg-gradient-to-br from-violet-50 to-violet-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-100/50 dark:hover:shadow-violet-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white"><span className="bg-gradient-to-r from-violet-600 to-violet-500 dark:from-violet-400 dark:to-violet-300 bg-clip-text text-transparent">Premium</span> Courses</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Access expert-led paid courses with structured curriculum, certificates, and lifetime access to materials.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-amber-100 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-amber-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-amber-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure Payments</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Safe and encrypted transactions for course purchases with support for multiple payment methods.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-rose-100 dark:border-rose-900/50 bg-gradient-to-br from-rose-50 to-rose-50/50 dark:from-slate-900 dark:to-slate-800 p-8 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-lg hover:shadow-rose-100/50 dark:hover:shadow-rose-900/50 transition-all duration-300 group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smart Recommendations</h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
              Get personalized course and partner suggestions based on your learning history and goals.
            </p>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Feauter;