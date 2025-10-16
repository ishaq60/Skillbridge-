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
} from "lucide-react";
import { Card } from "./ui/card";

export default function SkillSwapHome() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! Welcome to Skillbridge Education Helpline. How can I assist you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { type: "user", text: chatInput }]);
      setChatInput("");
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Thank you for your message! Our education support team will assist you shortly. You can also browse our Help Center for instant answers.",
          },
        ]);
      }, 1000);
    }
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Hero Section */}
     <Hero></Hero>

      <Feauter></Feauter>

      <HowItWorksSection></HowItWorksSection>

      <TestimonialsSection></TestimonialsSection>

      {/* Courses Preview Section */}
      <section id="courses" className="py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Featured Courses
              </h2>
              <p className="text-muted-foreground">
                Learn from industry experts
              </p>
            </div>
            <Button
              variant="outline"
              className="border-teal-600/50 text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Full-Stack Web Development",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 12500,
                price: "$89.99",
                image: "/web-development-coding.png",
                badge: "Bestseller",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Michael Chen",
                rating: 4.8,
                students: 8900,
                price: "$79.99",
                image: "/ui-ux-design-interface.png",
                badge: "Popular",
              },
              {
                title: "Data Science with Python",
                instructor: "Dr. Emily Rodriguez",
                rating: 4.9,
                students: 15200,
                price: "$99.99",
                image: "/data-science-machine-learning.jpg",
                badge: "Bestseller",
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white border-border hover:border-teal-600/50 transition-all group cursor-pointer"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.badge && (
                    <Badge className="absolute top-3 left-3 bg-teal-600 text-white border-0">
                      {course.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2 text-balance">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-teal-600">
                      {course.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-500 text-white"
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

      {/* Why Choose Us */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Choose Skillbridge?
              </h2>
              <p className="text-lg text-muted-foreground">
                The most comprehensive peer learning platform
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Learn for Free",
                  description:
                    "Exchange skills with peers at no cost. Only pay for premium courses when you want expert instruction.",
                },
                {
                  title: "AI-Powered Matching",
                  description:
                    "Our intelligent system finds the perfect learning partners based on your skills, goals, and availability.",
                },
                {
                  title: "Verified Instructors",
                  description:
                    "All course instructors are vetted professionals with proven expertise in their fields.",
                },
                {
                  title: "Flexible Learning",
                  description:
                    "Learn at your own pace with on-demand courses or schedule live sessions with peers.",
                },
                {
                  title: "Secure Payments",
                  description:
                    "Industry-standard encryption and secure payment processing for all transactions.",
                },
                {
                  title: "Community Support",
                  description:
                    "Join a thriving community of learners and get help whenever you need it.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-teal-50 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto p-8 sm:p-12 bg-white border-teal-200">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners exchanging skills and growing
                together. Sign up now and get matched with your first learning
                partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white border-border"
                />
                <Button className="bg-teal-600 hover:bg-teal-500 text-white whitespace-nowrap">
                  Get Started Free
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No credit card required. Start learning in minutes.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        aria-label="Open education helpline chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chatbox Component */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-border z-50 flex flex-col max-h-[500px]">
          {/* Chat Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Education Helpline</h3>
              <p className="text-xs text-teal-100">We're here to help!</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-teal-500 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-teal-600 text-white rounded-br-none"
                      : "bg-white border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-white border-border"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white px-3"
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
