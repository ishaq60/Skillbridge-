'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import StatCard from '../../../components/dashboard/StatCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', users: 400, courses: 240, revenue: 2400 },
  { month: 'Feb', users: 500, courses: 300, revenue: 2210 },
  { month: 'Mar', users: 620, courses: 290, revenue: 2290 },
  { month: 'Apr', users: 780, courses: 390, revenue: 2000 },
  { month: 'May', users: 890, courses: 480, revenue: 2181 },
  { month: 'Jun', users: 1050, courses: 520, revenue: 2500 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeInstructors: 0,
  });

  useEffect(() => {
    // Fetch admin statistics from API
    const fetchStats = async () => {
      try {
        // Replace with actual API call
        setStats({
          totalUsers: 1250,
          totalCourses: 42,
          totalRevenue: 125000,
          activeInstructors: 28,
        });
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
            trend="+12%"
            color="bg-blue-500"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            trend="+5%"
            color="bg-green-500"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            trend="+18%"
            color="bg-purple-500"
          />
          <StatCard
            title="Active Instructors"
            value={stats.activeInstructors}
            icon="👨‍🏫"
            trend="+8%"
            color="bg-orange-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">User activity #{item}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">New User</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
