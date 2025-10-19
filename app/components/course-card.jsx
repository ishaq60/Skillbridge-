import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Star, Users, Clock, ShoppingCart } from "lucide-react"

export default function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden border-border hover:border-teal-600/50 transition-all hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-teal-50 to-teal-100 overflow-hidden">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
        {course.relevanceScore && course.relevanceScore > 0 && (
          <Badge className="absolute top-3 right-3 bg-teal-600 text-white">
            {Math.round(course.relevanceScore)}% Match
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <Badge variant="outline" className="mb-2 border-teal-200 text-teal-700">
          {course.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-base mb-2 line-clamp-2">{course.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
          <img
            src={course.instructor.profile_image || "/placeholder.svg"}
            alt={course.instructor.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{course.instructor.name}</p>
            <p className="text-xs text-muted-foreground truncate">{course.instructor.expertise}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-muted-foreground">({course.total_reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-muted-foreground">{(course.total_students / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-muted-foreground">{course.duration}</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-teal-600">${course.price}</span>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white flex-1">
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Enroll
          </Button>
        </div>
      </div>
    </Card>
  )
}
