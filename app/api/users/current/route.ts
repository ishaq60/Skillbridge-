import { sampleUsers } from "../../../../lib/matching/sample-data"

export async function GET() {
  // Return the first user as the current user for demo purposes
  return Response.json(sampleUsers[0])
}
