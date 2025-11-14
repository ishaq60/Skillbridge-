import { ArrowRight, Badge } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
    return (
        <div>
             <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 " />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-teal-100 text-teal-700 border-teal-200">
              AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Exchange Skills, Learn Together
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Connect with peers to swap skills or learn from expert
              instructors. AI-powered matching, real-time video calls, and a
              thriving learning community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/skillexchange">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-500 text-white w-full sm:w-auto"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link 
              href={"/courses"}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Hero;