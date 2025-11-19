'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout({ children, userRole, userName }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = {
    admin: [
      { label: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
      { label: 'Users', href: '/dashboard/admin/users', icon: '👥' },
      { label: 'Courses', href: '/dashboard/admin/courses', icon: '📚' },
      { label: 'Analytics', href: '/dashboard/admin/analytics', icon: '📈' },
      { label: 'Settings', href: '/dashboard/admin/settings', icon: '⚙️' },
    ],
    instructor: [
      { label: 'Dashboard', href: '/dashboard/instructor', icon: '📊' },
      { label: 'My Courses', href: '/dashboard/instructor/courses', icon: '📚' },
      { label: 'Students', href: '/dashboard/instructor/students', icon: '👨‍🎓' },
      { label: 'Earnings', href: '/dashboard/instructor/earnings', icon: '💰' },
      { label: 'Profile', href: '/dashboard/instructor/profile', icon: '👤' },
    ],
    user: [
      { label: 'Dashboard', href: '/dashboard/user', icon: '📊' },
      { label: 'My Learning', href: '/dashboard/user/learning', icon: '📚' },
      { label: 'Wishlist', href: '/dashboard/user/wishlist', icon: '❤️' },
      { label: 'Certificates', href: '/dashboard/user/certificates', icon: '🏆' },
      { label: 'Settings', href: '/dashboard/user/settings', icon: '⚙️' },
    ],
  };

  const currentMenuItems = menuItems[userRole] || menuItems.user;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-teal-600 to-teal-800 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } min-h-screen shadow-lg flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">SkillBridge</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-teal-700 p-2 rounded transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 space-y-2 px-4 flex-1">
          {currentMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition text-white"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Profile Section */}
        <div className="bg-teal-900 p-4 border-t border-teal-700">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-teal-900">
              {userName?.charAt(0).toUpperCase() || 'U'}
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold truncate">{userName || 'User'}</p>
                <p className="text-xs text-teal-200 capitalize">{userRole}</p>
              </div>
            )}
          </div>
          <button className="w-full mt-3 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition text-sm">
            <LogOut size={16} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to {userRole.toUpperCase()} Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <Settings size={24} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 p-8 overflow-auto">
          {children}
        </section>
      </main>
    </div>
  );
}
