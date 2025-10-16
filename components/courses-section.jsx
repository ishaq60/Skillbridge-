
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Code, Palette, TrendingUp, Globe, Database, Smartphone, Star, Clock } from "lucide-react"
import { Button } from "./ui/button"

const courseCategories = [
  {
    id: 1,
    category: "Web Development",
    icon: Code,
    title: "Full-Stack Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 2340,
    duration: "12 weeks",
    price: "$299",
    description: "Master React, Node.js, and MongoDB to build modern web applications from scratch.",
    color: "sky",
  },
  {
    id: 2,
    category: "Design",
    icon: Palette,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    rating: 4.8,
    students: 1890,
    duration: "8 weeks",
    price: "$249",
    description: "Learn design principles, Figma, and create stunning user interfaces.",
    color: "blue",
  },
  {
    id: 3,
    category: "Business",
    icon: TrendingUp,
    title: "Digital Marketing & Growth",
    instructor: "Emily Rodriguez",
    rating: 4.7,
    students: 3120,
    duration: "10 weeks",
    price: "$199",
    description: "Master SEO, social media marketing, and analytics to grow your business.",
    color: "cyan",
  },
  {
    id: 4,
    category: "Languages",
    icon: Globe,
    title: "Spanish for Beginners",
    instructor: "Carlos Martinez",
    rating: 4.9,
    students: 4560,
    duration: "16 weeks",
    price: "$179",
    description: "Learn conversational Spanish with interactive lessons and native speakers.",
    color: "sky",
  },
  {
    id: 5,
    category: "Data Science",
    icon: Database,
    title: "Python Data Analysis",
    instructor: "Dr. Lisa Wang",
    rating: 4.8,
    students: 2890,
    duration: "14 weeks",
    price: "$349",
    description: "Master Python, pandas, and machine learning for data analysis.",
    color: "blue",
  },
  {
    id: 6,
    category: "Mobile Dev",
    icon: Smartphone,
    title: "iOS App Development",
    instructor: "James Wilson",
    rating: 4.7,
    students: 1670,
    duration: "12 weeks",
    price: "$329",
    description: "Build native iOS apps with Swift and SwiftUI from beginner to advanced.",
    color: "cyan",
  },
]

export function CoursesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-gray-900">
            Featured Paid Courses
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
            Learn from expert instructors with our comprehensive courses across multiple categories
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courseCategories.map((course) => {
            const Icon = course.icon
            return (
              <Card
                key={course.id}
                className="flex flex-col border-sky-100 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`bg-${course.color}-100 text-${course.color}-700 hover:bg-${course.color}-100`}
                    >
                      <Icon className="mr-1 h-3 w-3" />
                      {course.category}
                    </Badge>
                    <span className="text-xl font-bold text-sky-700">{course.price}</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{course.rating}</span>
                      <span>({course.students.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-sky-600" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-sky-600 hover:bg-sky-700">Enroll Now</Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
