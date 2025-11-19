'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import StatCard from '../../../components/dashboard/StatCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 1200, students: 45 },
  { month: 'Feb', earnings: 1500, students: 52 },
  { month: 'Mar', earnings: 1800, students: 60 },
  { month: 'Apr', earnings: 2100, students: 72 },
  { month: 'May', earnings: 2500, students: 85 },
  { month: 'Jun', earnings: 2800, students: 95 },
];

export default function InstructorDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalEarnings: 0,
    rating: 0,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch instructor's courses and statistics
    const fetchInstructorData = async () => {
      try {
        // Replace with actual API call
        setStats({
          totalStudents: 285,
          activeCourses: 4,
          totalEarnings: 12500,
          rating: 4.8,
        });

        setCourses([
          {
            id: 1,
            title: 'React & Next.js Complete Guide',
            students: 156,
            rating: 4.9,
            revenue: 4680,
            status: 'Active',
          },
          {
            id: 2,
            title: 'Advanced Web Development',
            students: 89,
            rating: 4.7,
            revenue: 2670,
            status: 'Active',
          },
          {
            id: 3,
            title: 'JavaScript Fundamentals',
            students: 40,
            rating: 4.6,
            revenue: 800,
            status: 'Draft',
          },
          {
            id: 4,
            title: 'Web Design Masterclass',
            students: 125,
            rating: 4.8,
            revenue: 3750,
            status: 'Active',
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch instructor data:', error);
      }
    };

    fetchInstructorData();
  }, []);

  return (
    <DashboardLayout userRole="instructor" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon="👨‍🎓"
            trend="+12"
            color="bg-blue-500"
          />
          <StatCard
            title="Active Courses"
            value={stats.activeCourses}
            icon="📚"
            trend="+1"
            color="bg-green-500"
          />
          <StatCard
            title="Total Earnings"
            value={`$${stats.totalEarnings.toLocaleString()}`}
            icon="💰"
            trend="+$1200"
            color="bg-purple-500"
          />
          <StatCard
            title="Average Rating"
            value={stats.rating}
            icon="⭐"
            trend="+0.2"
            color="bg-orange-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earnings Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#14b8a6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Students Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Student Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">My Courses</h3>
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
              + Create New Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Course Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{course.title}</td>
                    <td className="py-3 px-4 text-gray-800">{course.students}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center">
                        ⭐ {course.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-semibold">${course.revenue}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          course.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Student Reviews</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Student Name #{item}</p>
                    <p className="text-sm text-gray-600">React & Next.js Complete Guide</p>
                  </div>
                  <span className="text-lg">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-sm text-gray-700">
                  "Excellent course! The instructor explains concepts clearly and provides practical examples."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
