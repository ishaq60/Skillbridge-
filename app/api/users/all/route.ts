import { sampleUsers } from "../../../../lib/matching/sample-data"

export async function GET() {
  return Response.json(sampleUsers)
}
