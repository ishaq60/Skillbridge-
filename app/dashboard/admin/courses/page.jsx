'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        // Replace with actual API call
        setCourses([
          {
            id: 1,
            title: 'React & Next.js Complete Guide',
            category: 'Web Development',
            instructor: 'Sarah Johnson',
            students: 156,
            status: 'published',
            price: 59.99,
          },
          {
            id: 2,
            title: 'UI/UX Design Masterclass',
            category: 'Design',
            instructor: 'David Kim',
            students: 89,
            status: 'published',
            price: 44.99,
          },
          {
            id: 3,
            title: 'Data Science with Python',
            category: 'Data Science',
            instructor: 'Michael Chen',
            students: 120,
            status: 'published',
            price: 69.99,
          },
          {
            id: 4,
            title: 'JavaScript Fundamentals',
            category: 'Web Development',
            instructor: 'Sarah Johnson',
            students: 45,
            status: 'draft',
            price: 49.99,
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
            <Plus size={20} />
            Add Course
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <input
            type="text"
            placeholder="Search by title, category, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Instructor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Students</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 font-medium">{course.title}</td>
                    <td className="px-6 py-4 text-gray-600">{course.category}</td>
                    <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-gray-800">{course.students}</td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">${course.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded transition">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded transition">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
