"use client";

import Image from "next/image";
import { Quote } from "lucide-react";


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

// Simple marquee
function MarqueePrimitive({ children, durationInMs = 20000, direction = "left", ...props }) {
  return (
    <>
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div
        className="w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        {...props}
      >
        <div
          className="flex gap-8 pb-4"
          style={{
            width: "calc(200% + 32px)",
            animation: `scroll-${direction} ${durationInMs}ms linear infinite`,
          }}
        >
          <div className="flex gap-8 flex-shrink-0">{children}</div>
          <div className="flex gap-8 flex-shrink-0">{children}</div>
        </div>
      </div>
    </>
  );
}

// Review card
const ReviewCard = ({ review }) => (
  <div className="glass-card card-hover-effect rounded-lg px-6 py-8 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] flex flex-col group bg-white shadow-md">
    <div className="flex flex-col h-full">
      {/* Quote Icon */}
      <div className="flex justify-center mb-6">
        <Quote size={40} className="text-teal-600" />
      </div>

      {/* Review Text */}
      <div className="flex-1 mb-6">
        <p className="text-neutral-700 text-base md:text-lg leading-relaxed text-center font-medium">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Reviewer Info */}
      <div className="flex flex-col items-center text-center pt-6 border-t border-neutral-200 mt-auto">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 ring-2 ring-teal-200 group-hover:ring-teal-400 transition-all duration-300">
          <Image
            src={review.avatar}
            alt={review.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="font-bold text-neutral-800 text-base md:text-lg">
          {review.name}
        </p>
        <p className="text-teal-600 text-sm md:text-base font-medium">
          {review.role}
        </p>

        {/* Optional: Display stars */}
        <div className="flex justify-center mt-2">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            Loved by <span className="text-teal-600">learners worldwide</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Hear from our global community of learners who achieved career success.
          </p>
        </div>

        {/* Reviews Marquee */}
        <MarqueePrimitive durationInMs={35000} direction="left">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </MarqueePrimitive>
      </div>
    </section>
  );
}
