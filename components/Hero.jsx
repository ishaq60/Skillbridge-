import { ArrowRight, Badge, Sparkles } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
    return (
        <div>
             <section className="relative overflow-hidden py-20 sm:py-40 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-teal-200/50 dark:border-teal-700/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <Badge className="mb-0 bg-transparent text-teal-700 dark:text-teal-300 border-0 font-semibold text-sm">
                ✨ AI-Powered Learning Platform
              </Badge>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-teal-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Exchange Skills, Learn Together
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 text-pretty max-w-2xl mx-auto leading-relaxed font-medium">
              Connect with peers to swap skills or learn from expert instructors. AI-powered matching, real-time video calls, and a thriving global learning community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/skillexchange">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all text-base py-6 px-8"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link 
              href={"/courses"}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-slate-700 font-semibold text-base py-6 px-8"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-700 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                <span className="font-medium">10K+ Active Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                <span className="font-medium">500+ Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
                <span className="font-medium">98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Hero;