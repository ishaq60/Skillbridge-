import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import MLMetrics from "./ml-metrics"

import { MapPin, Globe, Star } from "lucide-react"



export default function MatchesList({ matches, currentUser, matchScores }) {
  if (matches.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-12 text-center">
          <p className="text-gray-500 mb-4">
            No matches found yet. Click "Find Matches" to discover skill exchange opportunities!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {matches.map((match) => {
        const matchData = matchScores?.[match.id]
        const isMutualMatch = matchData?.isMutualMatch
        const matchScore = matchData?.score

        return (
          <Card
            key={match.id}
            className={`border-0 shadow-lg hover:shadow-xl transition-all ${
              isMutualMatch ? "ring-2 ring-green-400 bg-green-50" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{match.name}</CardTitle>
                    {isMutualMatch && (
                      <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">Perfect Match</Badge>
                    )}
                  </div>
                  <CardDescription>{match.bio}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="ml-2">
                    {match.experienceLevel}
                  </Badge>
                  {matchScore && <Badge className="bg-indigo-600 hover:bg-indigo-700">{matchScore}% Match</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location, Language, Rating */}
              <div className="flex flex-wrap gap-4 pb-3 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-indigo-600" />
                  <span className="text-gray-700">{match.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={16} className="text-indigo-600" />
                  <span className="text-gray-700">{match.language}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-700">{match.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              {/* {matchData && (
                <MLMetrics
                  cosineSimilarity={matchData.cosineSimilarity}
                  semanticRelevance={matchData.semanticRelevance}
                  collaborativeScore={matchData.collaborativeScore}
                  score={matchScore || 0}
                />
              )} */}

              {/* Complementary Skills */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">They Can Teach You:</h4>
                <div className="flex flex-wrap gap-2">
                  {match.skillsOffering
                    .filter((skill) => currentUser?.skillsLooking.includes(skill))
                    .map((skill) => (
                      <Badge key={skill} className="bg-green-500 hover:bg-green-600">
                        {skill}
                      </Badge>
                    ))}
                </div>
              </div>

              {/* What You Can Teach Them */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">You Can Teach Them:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUser?.skillsOffering
                    .filter((skill) => match.skillsLooking.includes(skill))
                    .map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-900">
                        {skill}
                      </Badge>
                    ))}
                </div>
              </div>

              <Button
                className={`w-full mt-4 ${
                  isMutualMatch ? "bg-teal-600 hover:bg-green-700" : "bg-teal-400 hover:bg-indigo-700"
                }`}
              >
                {isMutualMatch ? "Connect Now - Perfect Match!" : `Connect with ${match.name.split(" ")[0]}`}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
