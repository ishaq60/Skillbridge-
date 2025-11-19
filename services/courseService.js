// services/courseService.js
import { dbConnect } from '../lib/db';

export async function getCoursesByKeywords(keywords) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection('paidcourses');

    if (!keywords || keywords.length === 0) {
      // Return featured courses if no keywords provided
      return await collection
        .find({})
        .sort({ rating: -1, total_students: -1 })
        .limit(5)
        .toArray();
    }

    // Create regex patterns for each keyword
    const searchTerms = keywords.map(keyword => ({
      $regex: keyword,
      $options: 'i' // Case-insensitive search
    }));

    // Search for courses matching keywords in title, category, or description
    const courses = await collection.find({
      $or: [
        { title: { $regex: keywords.join('|'), $options: 'i' } },
        { category: { $regex: keywords.join('|'), $options: 'i' } },
        { description: { $regex: keywords.join('|'), $options: 'i' } },
        { skills: { $in: keywords } },
      ],
    })
      .limit(5)
      .toArray();

    return courses;
  } catch (error) {
    console.error("Error fetching courses by keywords:", error);
    throw new Error("Could not retrieve courses.");
  }
}

export async function getAllCourses() {
  try {
    const { db } = await dbConnect();
    const collection = db.collection('paidcourses');

    const courses = await collection
      .find({})
      .sort({ rating: -1, total_students: -1 })
      .toArray();

    return courses;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    throw new Error("Could not retrieve courses.");
  }
}

export async function getCourseById(courseId) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection('paidcourses');

    const course = await collection.findOne({ course_id: courseId });
    return course;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw new Error("Could not retrieve course.");
  }
}
