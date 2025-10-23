"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

import { MapPin, Globe, Star } from "lucide-react"



export default function UserProfile({ user, onEdit }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-be rounded-t-lg">
        <CardTitle className="text-2xl">{user.name}</CardTitle>
        <CardDescription className="text-teal-500">{user.bio}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Location, Language, Rating */}
          <div className="flex flex-wrap gap-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" />
              <span className="text-sm text-gray-700">{user.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-teal-600" />
              <span className="text-sm text-gray-700">{user.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-700">{user.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          {/* Skills Offering */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Skills I Can Teach</h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffering.map((skill) => (
                <Badge key={skill} variant="default" className="bg-teal-500 hover:bg-green-600">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills Seeking */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Skills I Want to Learn</h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsLooking.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-900">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Experience Level:</span> {user.experienceLevel}
            </p>
          </div>

          {onEdit && (
            <Button onClick={onEdit} className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
