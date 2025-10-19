// import { Card } from "../../components/ui/card"
// import { Badge } from "../../components/ui/badge"
// import { Button } from "../../components/ui/button"
// import { Star, CheckCircle2, MapPin, Globe, Clock, MessageSquare, Video, TrendingUp } from "lucide-react"
// import Link from "next/link"

// export default function SearchResults({ results }) {
//   if (!results.matches) {
//     return (
//       <div className="max-w-2xl mx-auto text-center py-12">
//         <p className="text-lg text-muted-foreground mb-4">{results.message}</p>
//         <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
//           <p className="text-sm text-teal-700 mb-3">
//             <strong>Extracted Skills:</strong>
//           </p>
//           <div className="flex flex-wrap gap-2 justify-center mb-4">
//             {results.extracted.known.length > 0 && (
//               <>
//                 <span className="text-xs text-muted-foreground">You know:</span>
//                 {results.extracted.known.map((skill) => (
//                   <Badge key={skill} className="bg-teal-600 text-white">
//                     {skill}
//                   </Badge>
//                 ))}
//               </>
//             )}
//             {results.extracted.want.length > 0 && (
//               <>
//                 <span className="text-xs text-muted-foreground">You want to learn:</span>
//                 {results.extracted.want.map((skill) => (
//                   <Badge key={skill} variant="outline" className="border-teal-200 text-teal-700">
//                     {skill}
//                   </Badge>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <p className="text-sm text-muted-foreground mb-4">
//           <strong>Extracted Skills:</strong>
//         </p>
//         <div className="flex flex-wrap gap-2 mb-6">
//           {results.extracted.known.length > 0 && (
//             <>
//               <span className="text-xs text-muted-foreground">You know:</span>
//               {results.extracted.known.map((skill) => (
//                 <Badge key={skill} className="bg-teal-600 text-white">
//                   {skill}
//                 </Badge>
//               ))}
//             </>
//           )}
//           {results.extracted.want.length > 0 && (
//             <>
//               <span className="text-xs text-muted-foreground">You want to learn:</span>
//               {results.extracted.want.map((skill) => (
//                 <Badge key={skill} variant="outline" className="border-teal-200 text-teal-700">
//                   {skill}
//                 </Badge>
//               ))}
//             </>
//           )}
//         </div>
//       </div>

//       <p className="text-sm text-muted-foreground mb-6">{results.message}</p>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.matches.map((user) => (
//           <Card key={user.id} className="overflow-hidden border-border hover:border-teal-600/50 transition-all">
//             {/* Header with Avatar */}
//             <div className="p-6 pb-4">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={user.avatar || "/placeholder.svg"}
//                     alt={user.name}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-teal-100"
//                   />
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold">{user.name}</h3>
//                       {user.verified && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
//                     </div>
//                     <div className="flex items-center gap-1 text-sm">
//                       <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
//                       <span className="font-medium">{user.rating}</span>
//                       <span className="text-muted-foreground">({user.reviews})</span>
//                     </div>
//                   </div>
//                 </div>
//                 <Badge className="bg-teal-100 text-teal-700 border-teal-200 flex items-center gap-1">
//                   <TrendingUp className="w-3 h-3" />
//                   {Math.round(user.matchScore)}%
//                 </Badge>
//               </div>

//               {/* Bio */}
//               <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>

//               <div className="space-y-2 text-sm text-muted-foreground mb-4">
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-teal-600" />
//                   {user.city}, {user.country}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Globe className="w-4 h-4 text-teal-600" />
//                   {user.language}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-4 h-4 text-teal-600" />
//                   {user.availability} • {user.learningLevel}
//                 </div>
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="px-6 pb-4 border-t border-border">
//               {user.canTeach.length > 0 && (
//                 <div className="mb-3">
//                   <p className="text-xs font-semibold text-teal-600 mb-2">CAN TEACH YOU</p>
//                   <div className="flex flex-wrap gap-2">
//                     {user.canTeach.map((skill) => (
//                       <Badge key={skill} className="bg-teal-100 text-teal-700 border-teal-200">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {user.wantsToLearn.length > 0 && (
//                 <div>
//                   <p className="text-xs font-semibold text-muted-foreground mb-2">WANTS TO LEARN</p>
//                   <div className="flex flex-wrap gap-2">
//                     {user.wantsToLearn.map((skill) => (
//                       <Badge key={skill} variant="outline" className="border-border">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="px-6 py-4 border-t border-border flex gap-2">
//               <Link href={`/contact?userId=${user.id}`} className="flex-1">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="w-full border-teal-600/50 text-teal-600 hover:bg-teal-50 bg-transparent"
//                 >
//                   <MessageSquare className="w-4 h-4 mr-2" />
//                   Message
//                 </Button>
//               </Link>
//               <Link href={`/contact?userId=${user.id}&video=true`} className="flex-1">
//                 <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 text-white">
//                   <Video className="w-4 h-4 mr-2" />
//                   Video
//                 </Button>
//               </Link>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Star, CheckCircle2, MapPin, Globe, Clock, MessageSquare, Video, TrendingUp } from "lucide-react"
import CourseCard from "./course-card"

export default function SearchResults({ results }) {
  if (!results.matches && !results.courses) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">{results.message}</p>
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <p className="text-sm text-teal-700 mb-3">
            <strong>Extracted Skills:</strong>
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {results.extracted.known.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground">You know:</span>
                {results.extracted.known.map((skill) => (
                  <Badge key={skill} className="bg-teal-600 text-white">
                    {skill}
                  </Badge>
                ))}
              </>
            )}
            {results.extracted.want.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground">You want to learn:</span>
                {results.extracted.want.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-teal-200 text-teal-700">
                    {skill}
                  </Badge>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Extracted Skills */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground mb-3">Extracted Skills:</p>
        <div className="flex flex-wrap gap-2">
          {results.extracted.known.length > 0 && (
            <>
              <span className="text-xs text-muted-foreground self-center">You know:</span>
              {results.extracted.known.map((skill) => (
                <Badge key={skill} className="bg-teal-600 text-white">
                  {skill}
                </Badge>
              ))}
            </>
          )}
          {results.extracted.want.length > 0 && (
            <>
              <span className="text-xs text-muted-foreground self-center">You want to learn:</span>
              {results.extracted.want.map((skill) => (
                <Badge key={skill} variant="outline" className="border-teal-200 text-teal-700">
                  {skill}
                </Badge>
              ))}
            </>
          )}
        </div>
      </div>

      {/* User Matches Section */}
      {results.matches && results.matches.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Perfect Peer Matches</h2>
            <p className="text-muted-foreground">{results.message}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.matches.map((user) => (
              <Card
                key={user.id}
                className="overflow-hidden border-border hover:border-teal-600/50 transition-all hover:shadow-lg"
              >
                {/* Header with Avatar */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-teal-100"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          {user.verified && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{user.rating}</span>
                          <span className="text-muted-foreground">({user.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {Math.round(user.matchScore)}%
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      {user.city}, {user.country}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-teal-600" />
                      {user.language}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600" />
                      {user.availability} • {user.learningLevel}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="px-6 pb-4 border-t border-border">
                  {user.matchReasons && user.matchReasons.length > 0 && (
                    <div className="mb-4 p-3 bg-teal-50 rounded-md border border-teal-200">
                      <p className="text-xs font-semibold text-teal-700 mb-2">WHY THIS MATCH</p>
                      <ul className="space-y-1">
                        {user.matchReasons.map((reason, idx) => (
                          <li key={idx} className="text-xs text-teal-600">
                            ✓ {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {user.canTeach.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-teal-600 mb-2">CAN TEACH YOU</p>
                      <div className="flex flex-wrap gap-2">
                        {user.canTeach.map((skill) => (
                          <Badge key={skill} className="bg-teal-100 text-teal-700 border-teal-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {user.wantsToLearn.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">WANTS TO LEARN</p>
                      <div className="flex flex-wrap gap-2">
                        {user.wantsToLearn.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-border">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-border flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-teal-600/50 text-teal-600 hover:bg-teal-50 bg-transparent"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-500 text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses Section */}
      {results.courses && results.courses.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Recommended Courses</h2>
            <p className="text-muted-foreground">Enhance your skills with these carefully selected courses</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.courses.map((course) => (
              <CourseCard key={course.course_id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}