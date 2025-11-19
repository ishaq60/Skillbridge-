"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import Hero from "./Hero"
import HowItWorksSection from "../app/components/how-it-works-section";
import TestimonialsSection from "../app/components/TestimonialsSection";
import Feauter from "../components/Feauter";

import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Users,
  Video,
  MessageSquare,
  Sparkles,
  BookOpen,
  TrendingUp,
  Star,
  CheckCircle2,
  Send,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Award,
  Globe,
  BarChart3,
} from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";

export default function SkillSwapHome() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 Welcome to Skillbridge Education Helpline. I'm your AI learning assistant. I can help you with:\n\n• Course recommendations and enrollment\n• Learning tips and educational guidance\n• Skill development advice\n\nJust ask me anything!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Alex Thompson",
      role: "Web Developer",
      rating: 5,
      text: "Skillbridge transformed my career! I learned React from an amazing peer and now I'm working at a top tech company.",
      avatar: "/professional-male-avatar.png",
    },
    {
      name: "Maria Garcia",
      role: "UX Designer",
      rating: 5,
      text: "The AI matching is incredible. I found the perfect learning partner who helped me master Figma in just 3 months!",
      avatar: "/professional-female-avatar.png",
    },
    {
      name: "James Chen",
      role: "Data Scientist",
      rating: 5,
      text: "Best investment in my education. The courses are top-notch and the peer learning feature is a game-changer.",
      avatar: "/professional-asian-male-avatar.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Marketing Manager",
      rating: 5,
      text: "I've tried many learning platforms, but Skillbridge stands out. The community is supportive and the instructors are world-class.",
      avatar: "/avatar-1.png",
    },
  ];

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = { type: "user", text: chatInput };
      setChatMessages((prev) => [...prev, userMessage]);
      setChatInput("");
      setChatLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: chatInput }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        const botMessage = { type: "bot", text: data.reply };
        setChatMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = {
          type: "bot",
          text: "❌ Sorry, I encountered an error. Please try again or visit our Help Center for instant answers.",
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setChatLoading(false);
      }
    }
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-foreground">
      {/* Hero Section */}
     <Hero></Hero>

      <Feauter></Feauter>

      <HowItWorksSection></HowItWorksSection>

      <TestimonialsSection></TestimonialsSection>

      {/* Courses Preview Section */}
      <section id="courses" className="py-24 bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
            <div>
              <div className="inline-block mb-4">
                <Badge className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-semibold">FEATURED COURSES</Badge>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-teal-900 to-blue-900 dark:from-teal-300 dark:to-blue-300 bg-clip-text text-transparent">
                Learn from Experts
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Handpicked premium courses taught by industry professionals
              </p>
            </div>
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-2 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 bg-white dark:bg-slate-800 text-base font-semibold"
              >
                View All Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack Web Development",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 12500,
                price: "$89.99",
                image: "/web-development-coding.png",
                badge: "Bestseller",
                icon: "🚀",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Michael Chen",
                rating: 4.8,
                students: 8900,
                price: "$79.99",
                image: "/ui-ux-design-interface.png",
                badge: "Popular",
                icon: "🎨",
                bgGradient: "from-teal-50 to-emerald-50"
              },
              {
                title: "Data Science with Python",
                instructor: "Dr. Emily Rodriguez",
                rating: 4.9,
                students: 15200,
                price: "$99.99",
                image: "/data-science-machine-learning.jpg",
                badge: "Bestseller",
                icon: "📊",
                bgGradient: "from-violet-50 to-purple-50"
              },
            ].map((course, index) => (
              <Card
                key={index}
                className={`overflow-hidden bg-gradient-to-br ${course.bgGradient} dark:from-slate-800 dark:to-slate-700 border-2 border-blue-100 dark:border-blue-900/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-teal-100/50 dark:hover:shadow-teal-900/50`}
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  {course.badge && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0 font-semibold px-3 py-1">
                      {course.badge}
                    </Badge>
                  )}
                  <div className="absolute bottom-4 right-4 text-2xl">{course.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 font-medium">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blue-100 dark:border-blue-900/50">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {course.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Learning Hours", value: "2.5M+", icon: "⏱️", color: "from-teal-400 to-teal-600" },
              { label: "Success Rate", value: "98%", icon: "✅", color: "from-green-400 to-emerald-600" },
              { label: "Global Students", value: "150K+", icon: "🌍", color: "from-blue-400 to-cyan-600" },
              { label: "Expert Instructors", value: "500+", icon: "👨‍🏫", color: "from-purple-400 to-violet-600" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-blue-900/50 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg dark:hover:shadow-teal-900/50 transition-all duration-300 group">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>{stat.value}</div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white via-teal-50/30 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="inline-block mb-4 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-semibold">WHY SKILLBRIDGE</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-900 to-cyan-900 dark:from-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
                The Complete Learning Ecosystem
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                Everything you need to master new skills, connect with peers, and advance your career
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: "Learn for Free or Pay for Expert Training",
                  description:
                    "Exchange skills with peers at zero cost. When you need structured learning from professionals, choose from our premium courses.",
                  icon: <Zap className="w-6 h-6" />,
                  color: "from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-yellow-200 dark:border-yellow-900/50",
                  iconBg: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                },
                {
                  title: "AI-Powered Smart Matching",
                  description:
                    "Our intelligent system finds the perfect learning partners based on your skills, goals, availability, and learning style.",
                  icon: <Sparkles className="w-6 h-6" />,
                  color: "from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-purple-200 dark:border-purple-900/50",
                  iconBg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                },
                {
                  title: "Verified Industry Experts",
                  description:
                    "All instructors are thoroughly vetted with proven expertise and real-world experience in their fields.",
                  icon: <Award className="w-6 h-6" />,
                  color: "from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-blue-200 dark:border-blue-900/50",
                  iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                },
                {
                  title: "Learn at Your Own Pace",
                  description:
                    "On-demand video courses, live sessions with peers, or structured programs. Choose how you want to learn.",
                  icon: <TrendingUp className="w-6 h-6" />,
                  color: "from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-green-200 dark:border-green-900/50",
                  iconBg: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                },
                {
                  title: "Global Community Support",
                  description:
                    "Join thousands of learners worldwide. Get help, share experiences, and grow together in our thriving community.",
                  icon: <Globe className="w-6 h-6" />,
                  color: "from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-cyan-200 dark:border-cyan-900/50",
                  iconBg: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                },
                {
                  title: "Track Your Progress",
                  description:
                    "Detailed analytics, certificates of completion, and personalized learning recommendations to keep you motivated.",
                  icon: <BarChart3 className="w-6 h-6" />,
                  color: "from-rose-50 to-red-50 dark:from-slate-800 dark:to-slate-700",
                  border: "border-rose-200 dark:border-rose-900/50",
                  iconBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                },
              ].map((item, index) => (
                <div key={index} className={`flex gap-4 p-6 rounded-2xl bg-gradient-to-br ${item.color} border-2 ${item.border} hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg dark:hover:shadow-teal-900/50 transition-all duration-300 group`}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-20">
          <div className="absolute top-10 right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="max-w-5xl mx-auto p-8 sm:p-16 bg-white dark:bg-slate-800 border-2 border-teal-200 dark:border-teal-800 shadow-xl">
            <div className="text-center">
              <Badge className="inline-block mb-4 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-semibold">GET STARTED TODAY</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-900 to-blue-900 dark:from-teal-300 dark:to-blue-300 bg-clip-text text-transparent">
                Start Your Learning Journey
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Join over 150,000 learners who are exchanging skills, building connections, and growing with Skillbridge. 
                No credit card required to start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-50 dark:bg-slate-700 border-2 border-blue-200 dark:border-blue-900/50 focus:border-teal-600 dark:focus:border-teal-600 text-base py-3 px-4 rounded-lg text-gray-900 dark:text-white dark:placeholder-gray-400"
                />
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold whitespace-nowrap py-6 px-8 shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium">
                ✓ No credit card required  •  ✓ Start learning in minutes  •  ✓ Join our community today
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 dark:from-teal-500 dark:to-teal-600 dark:hover:from-teal-600 dark:hover:to-teal-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-40 font-semibold group"
        aria-label="Open education helpline chat"
      >
        <div className="relative">
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">!</span>
        </div>
      </button>

      {/* Chatbox Component */}
      {chatOpen && (
        <div className="fixed bottom-28 right-6 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-teal-100 dark:border-teal-900/50 z-40 flex flex-col max-h-[600px] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-5 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Education Helpline</h3>
              <p className="text-sm text-teal-100">Always here to help you learn</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-teal-500 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50 dark:bg-slate-900">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm font-medium whitespace-pre-wrap ${
                    message.type === "user"
                      ? "bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-bl-none"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 p-3 rounded-xl rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div className="p-5 border-b-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try asking:</p>
            <div className="flex gap-2 flex-wrap">
              {["What courses do you have for JavaScript?", "How can I start learning React?", "What are the best skills for web development?"].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setChatInput(prompt)}
                  className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-lg text-sm hover:bg-teal-200 dark:hover:bg-teal-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-5 border-t-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-800 rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about courses, learning tips..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={chatLoading}
                className="flex-1 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-gray-600 focus:border-teal-600 py-2 px-4 rounded-lg text-gray-900 dark:text-white dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <Button
                onClick={handleSendMessage}
                disabled={chatLoading}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
