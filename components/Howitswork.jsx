import { Card } from "@/components/ui/card"
import { UserPlus, Search, MessageSquare, Star, Sparkles, Video, BookOpen, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Tell us what skills you can teach and what you want to learn. Set your availability and experience level.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get Matched",
    description:
      "Our AI finds the perfect learning partners with complementary skills. Review matches and connect instantly.",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Start Learning",
    description:
      "Chat, schedule sessions, or jump into a live video call. Learn interactively with real-time collaboration.",
  },
  {
    icon: Star,
    step: "04",
    title: "Rate & Grow",
    description: "Rate your sessions to build reputation. Unlock more opportunities as you teach and learn.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-border py-24">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for an exceptional learning experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-white border-border">
              <Sparkles className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-muted-foreground">
                Smart algorithms match you with the perfect learning partners based on skills and goals.
              </p>
            </Card>

            <Card className="p-6 bg-white border-border">
              <Video className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Video Sessions</h3>
              <p className="text-sm text-muted-foreground">
                High-quality video calls with screen sharing for interactive learning experiences.
              </p>
            </Card>

            <Card className="p-6 bg-white border-border">
              <MessageSquare className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Chat</h3>
              <p className="text-sm text-muted-foreground">
                Instant messaging to coordinate sessions and share resources with your learning partners.
              </p>
            </Card>

            <Card className="p-6 bg-white border-border">
              <BookOpen className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premium Courses</h3>
              <p className="text-sm text-muted-foreground">
                Access thousands of expert-led courses when peer learning isn't enough.
              </p>
            </Card>

            <Card className="p-6 bg-white border-border">
              <TrendingUp className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your learning journey with detailed analytics and achievement badges.
              </p>
            </Card>

            <Card className="p-6 bg-white border-border">
              <Star className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rating System</h3>
              <p className="text-sm text-muted-foreground">
                Build your reputation through peer reviews and instructor ratings.
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-teal-400 bg-accent/5 p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-3 text-2xl font-semibold">Example: Perfect Match</h3>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <div className="rounded-lg text-teal-400 border border-border bg-card p-4 text-center">
                <div className="mb-2 text-teal-400 font-semibold">User A</div>
                <div className="text-sm  text-muted-foreground">Knows: Java</div>
                <div className="text-sm text-muted-foreground">Wants: Python</div>
              </div>
              <div className="flex h-8 w-8 text-teal-600 items-center justify-center rounded-full bg-accent">
                ⇄
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="mb-2 text-teal-400 font-semibold">User B</div>
                <div className="text-sm text-muted-foreground">Knows: Python</div>
                <div className="text-sm text-muted-foreground">Wants: Java</div>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              Our AI identifies complementary pairs and suggests swap sessions automatically.
            </p>
          </div>
        </div>
    
    </section>
  )
}

