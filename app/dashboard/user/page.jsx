'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import StatCard from '../../../components/dashboard/StatCard';
import ProgressBar from '../../../components/dashboard/ProgressBar';

export default function UserDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    hoursLearned: 0,
    certificates: 0,
  });

  useEffect(() => {
    // Fetch user's enrolled courses and statistics
    const fetchUserData = async () => {
      try {
        // Replace with actual API call
        setStats({
          coursesEnrolled: 5,
          coursesCompleted: 2,
          hoursLearned: 42,
          certificates: 2,
        });

        setEnrolledCourses([
          {
            id: 1,
            title: 'React & Next.js Complete Guide',
            instructor: 'Sarah Johnson',
            progress: 65,
            thumbnail: '/react-nextjs-javascript.jpg',
          },
          {
            id: 2,
            title: 'UI/UX Design Masterclass',
            instructor: 'David Kim',
            progress: 40,
            thumbnail: '/ui-ux-design-interface.png',
          },
          {
            id: 3,
            title: 'Data Science with Python',
            instructor: 'Michael Chen',
            progress: 85,
            thumbnail: '/data-science-machine-learning.jpg',
          },
          {
            id: 4,
            title: 'iOS App Development with Swift',
            instructor: 'Emily Rodriguez',
            progress: 30,
            thumbnail: '/ios-swift-mobile-app.jpg',
          },
          {
            id: 5,
            title: 'Digital Marketing Essentials',
            instructor: 'Lisa Anderson',
            progress: 50,
            thumbnail: '/digital-marketing-business.jpg',
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardLayout userRole="user" userName="John Student">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Courses Enrolled"
            value={stats.coursesEnrolled}
            icon="📚"
            trend="+2"
            color="bg-blue-500"
          />
          <StatCard
            title="Completed"
            value={stats.coursesCompleted}
            icon="✅"
            trend="+1"
            color="bg-green-500"
          />
          <StatCard
            title="Hours Learned"
            value={stats.hoursLearned}
            icon="⏱️"
            trend="+8h"
            color="bg-purple-500"
          />
          <StatCard
            title="Certificates"
            value={stats.certificates}
            icon="🏆"
            trend="+1"
            color="bg-orange-500"
          />
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Your Learning Path</h3>
          <div className="space-y-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-md font-semibold text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-800 font-semibold">{course.progress}%</span>
                      </div>
                      <ProgressBar progress={course.progress} />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition whitespace-nowrap">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recommended Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Advanced React Patterns', instructor: 'Sarah Johnson' },
              { title: 'Machine Learning Basics', instructor: 'Michael Chen' },
              { title: 'Web Design Bootcamp', instructor: 'John Doe' },
            ].map((course, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:shadow-lg transition">
                <h4 className="font-semibold text-gray-800 mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
