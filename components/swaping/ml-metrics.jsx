import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"



export default function MLMetrics({ cosineSimilarity, semanticRelevance, collaborativeScore, score }) {
  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700">ML Matching Metrics</CardTitle>
        <CardDescription className="text-xs">Advanced AI-powered compatibility analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Overall Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Overall Match Score</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-xs">{score}%</Badge>
          </div>
        </div>

        {/* Cosine Similarity */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Semantic Similarity</span>
            <p className="text-xs text-gray-500">Skill profile alignment</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                style={{ width: `${cosineSimilarity}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-blue-600 w-10 text-right">{cosineSimilarity}%</span>
          </div>
        </div>

        {/* Semantic Relevance */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Skill Relevance</span>
            <p className="text-xs text-gray-500">How well skills match</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                style={{ width: `${semanticRelevance}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-green-600 w-10 text-right">{semanticRelevance}%</span>
          </div>
        </div>

        {/* Collaborative Score */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700">Collaborative Score</span>
            <p className="text-xs text-gray-500">Community recommendations</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                style={{ width: `${collaborativeScore}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-orange-600 w-10 text-right">{collaborativeScore}%</span>
          </div>
        </div>

        {/* Model Info */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Model:</strong> Cosine Similarity + Collaborative Filtering + Semantic Analysis
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
