'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import ProgressBar from '../../../../components/dashboard/ProgressBar';
import { Play, Download, Share2 } from 'lucide-react';

export default function UserLearningPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Fetch user's enrolled courses
    const fetchCourses = async () => {
      try {
        // Replace with actual API call
        setEnrolledCourses([
          {
            id: 1,
            title: 'React & Next.js Complete Guide',
            instructor: 'Sarah Johnson',
            progress: 65,
            thumbnail: '/react-nextjs-javascript.jpg',
            status: 'in-progress',
            lastAccessed: '2 days ago',
            lessonsCompleted: 16,
            totalLessons: 24,
          },
          {
            id: 2,
            title: 'UI/UX Design Masterclass',
            instructor: 'David Kim',
            progress: 40,
            thumbnail: '/ui-ux-design-interface.png',
            status: 'in-progress',
            lastAccessed: '1 week ago',
            lessonsCompleted: 8,
            totalLessons: 20,
          },
          {
            id: 3,
            title: 'Data Science with Python',
            instructor: 'Michael Chen',
            progress: 85,
            thumbnail: '/data-science-machine-learning.jpg',
            status: 'almost-done',
            lastAccessed: '3 days ago',
            lessonsCompleted: 17,
            totalLessons: 20,
          },
          {
            id: 4,
            title: 'Modern Web Design Bootcamp',
            instructor: 'John Doe',
            progress: 100,
            thumbnail: '/web-development-coding.png',
            status: 'completed',
            lastAccessed: '1 month ago',
            lessonsCompleted: 15,
            totalLessons: 15,
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch enrolled courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = enrolledCourses.filter((course) => {
    if (filterStatus === 'all') return true;
    return course.status === filterStatus;
  });

  return (
    <DashboardLayout userRole="user" userName="John Student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Learning</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b">
          {['all', 'in-progress', 'almost-done', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-3 font-medium transition border-b-2 capitalize ${
                filterStatus === status
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {status === 'in-progress' ? 'In Progress' : status === 'almost-done' ? 'Almost Done' : status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${enrolledCourses.filter((c) => c.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                    <div className="bg-white rounded-full p-4">
                      <Play size={28} className="text-blue-600 ml-1" />
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Lessons Completed</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {course.lessonsCompleted}/{course.totalLessons}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Accessed</p>
                        <p className="text-lg font-semibold text-gray-800">{course.lastAccessed}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-800 font-semibold">{course.progress}%</span>
                      </div>
                      <ProgressBar progress={course.progress} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
                      <Play size={18} />
                      Continue Learning
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition">
                      <Download size={18} />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="px-6 py-4 flex items-center justify-center">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                      course.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : course.status === 'almost-done'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {course.status === 'in-progress'
                      ? 'In Progress'
                      : course.status === 'almost-done'
                        ? 'Almost Done'
                        : 'Completed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found in this category</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
