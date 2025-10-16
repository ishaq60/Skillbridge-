"use client"
import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
}  from "lucide-react"
import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", text: "Hello! Welcome to Skillbridge Education Helpline. How can I assist you today?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [currentReview, setCurrentReview] = useState(0)
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  // Handle mounting and initial theme
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'system'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme === 'system' ? systemTheme : savedTheme
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  // Handle theme changes
  const handleThemeChange = (newTheme) => {
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.classList.toggle('dark', systemTheme === 'dark')
    } else {
      setTheme(newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div>
      <nav className="border-b border-border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold dark:text-white">Skillbridge</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </a>
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Reviews
              </a>
              
              {/* Theme Switcher */}
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
                  className="relative"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    System
                  </button>
                </div>
              </div>

              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-border">
              <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </a>
              <a href="#courses" className="block text-sm text-muted-foreground hover:text-foreground">
                Courses
              </a>
              <a href="#reviews" className="block text-sm text-muted-foreground hover:text-foreground">
                Reviews
              </a>
              
              {/* Mobile Theme Switcher */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleThemeChange('light')}
                    className="flex-1"
                  >
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleThemeChange('dark')}
                    className="flex-1"
                  >
                    Dark
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleThemeChange('system')}
                    className="flex-1"
                  >
                    System
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;