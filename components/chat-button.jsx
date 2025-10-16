"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatButton() {
  return (
    <Link href="/chatbox" className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="24/7 AI Help"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
      </span>
    </Link>
  )
}
