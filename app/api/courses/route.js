import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title')?.trim().toLowerCase();
    const category = searchParams.get('category')?.trim().toLowerCase();
    const instructor = searchParams.get('instructor')?.trim().toLowerCase();

    // Path to the courses.json file
    const filePath = path.join(process.cwd(), 'public', 'data', 'courses.json');

    // Read and parse the courses.json file
    const data = await fs.readFile(filePath, 'utf-8');
    const courses = JSON.parse(data).courses;

    // Filter courses based on query parameters
    const filteredCourses = courses.filter((course) => {
      const matchesTitle = title ? course.title.toLowerCase().includes(title) : true;
      const matchesCategory = category ? course.category.toLowerCase().includes(category) : true;
      const matchesInstructor = instructor
        ? course.instructor.name.toLowerCase().includes(instructor)
        : true;

      return matchesTitle && matchesCategory && matchesInstructor;
    });

    // Return the filtered courses
    if (filteredCourses.length > 0) {
      return NextResponse.json({ success: true, courses: filteredCourses });
    } else {
      return NextResponse.json({
        success: false,
        message: "No courses found matching your criteria. Please try different keywords."
      });
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch courses.' }, { status: 500 });
  }
}