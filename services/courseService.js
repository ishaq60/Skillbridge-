// services/courseService.js
import { dbConnect } from '../lib/db';

export async function getCoursesByKeywords(keywords) {
  const { db } = await dbConnect();
  const collection = db.collection('paidcourse');

  const searchTerms = keywords.map(keyword => new RegExp(keyword, 'i'));

  try {
    const courses = await collection.find({
      $or: [
        { title: { $in: searchTerms } },
        { category: { $in: searchTerms } },
        { skills: { $in: searchTerms } },
      ],
    }).limit(3).toArray();
    return courses;
  } catch (error) {
    console.error("Error fetching courses by keywords:", error);
    throw new Error("Could not retrieve courses.");
  }
}
