import React from 'react';
import { ArrowRight, Users, BookOpen, Sparkles, Video, MessageSquare, Shield } from "lucide-react"

const Feauter = () => {
    return (
        <div>
             {/* Trust Indicators */}
      <section className="border-y border-teal-500/20 bg-gradient-to-r from-teal-500/5 via-transparent to-teal-500/5 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm font-medium text-teal-500 mb-12 uppercase tracking-wider">Trusted by learners worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-16">
            <div className="text-center group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Users</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-sm text-muted-foreground font-medium">Skills Swapped</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">1K+</div>
              <div className="text-sm text-muted-foreground font-medium">Premium Courses</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="text-3xl font-bold bg-gradient-to-br from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-sm text-muted-foreground font-medium">Match Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-sans text-4xl font-bold tracking-tight text-balance lg:text-5xl">
            Everything you need to <span className="text-teal-500">learn</span> and <span className="text-teal-500">teach</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A complete platform for peer-to-peer learning and professional course delivery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <Users className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2"><span className="text-teal-500">AI-Powered</span> Matching</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our intelligent algorithm connects you with the perfect learning partner based on skills, goals, and
              availability.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <Video className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2"><span className="text-teal-500">Real-Time</span> Video Calls</h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn face-to-face with HD video, screen sharing, and interactive whiteboards for effective collaboration.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <MessageSquare className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2"><span className="text-teal-500">Instant</span> Messaging</h3>
            <p className="text-muted-foreground leading-relaxed">
              Chat with your learning partners, share files, and coordinate sessions seamlessly in real-time.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <BookOpen className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2"><span className="text-teal-500">Premium</span> Courses</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access expert-led paid courses with structured curriculum, certificates, and lifetime access to materials.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <Shield className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground leading-relaxed">
              Safe and encrypted transactions for course purchases with support for multiple payment methods.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10">
              <Sparkles className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="font-sans text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get personalized course and partner suggestions based on your learning history and goals.
            </p>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Feauter;