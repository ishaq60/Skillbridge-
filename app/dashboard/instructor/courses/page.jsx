'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { Trash2, Edit, Eye, Plus, BarChart3 } from 'lucide-react';

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    // Fetch instructor's courses from API
    const fetchCourses = async () => {
      try {
        // Replace with actual API call
        setCourses([
          {
            id: 1,
            title: 'React & Next.js Complete Guide',
            category: 'Web Development',
            students: 156,
            rating: 4.9,
            revenue: 4680,
            status: 'published',
            lessons: 24,
          },
          {
            id: 2,
            title: 'Advanced Web Development',
            category: 'Web Development',
            students: 89,
            rating: 4.7,
            revenue: 2670,
            status: 'published',
            lessons: 18,
          },
          {
            id: 3,
            title: 'Web Design Masterclass',
            category: 'Design',
            students: 125,
            rating: 4.8,
            revenue: 3750,
            status: 'published',
            lessons: 20,
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.category && newCourse.price) {
      setCourses([...courses, { ...newCourse, id: courses.length + 1, students: 0, rating: 0, revenue: 0, status: 'draft', lessons: 0 }]);
      setNewCourse({ title: '', category: '', price: '', description: '' });
      setShowCreateModal(false);
    }
  };

  return (
    <DashboardLayout userRole="instructor" userName="Sarah Johnson">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
          >
            <Plus size={20} />
            Create Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-32"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.category}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-blue-600">{course.students}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-yellow-600">⭐{course.rating}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">${course.revenue}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      course.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition text-sm">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm">
                    <BarChart3 size={16} />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="Enter course title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Development">Mobile Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Enter course description"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
