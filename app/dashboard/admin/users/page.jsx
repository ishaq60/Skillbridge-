'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { Trash2, Edit, Eye } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        // Replace with actual API call
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
          { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'instructor', status: 'active', joinDate: '2024-02-20' },
          { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'instructor', status: 'active', joinDate: '2024-03-10' },
          { id: 4, name: 'Emily Rodriguez', email: 'emily@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-05' },
          { id: 5, name: 'David Kim', email: 'david@example.com', role: 'instructor', status: 'active', joinDate: '2024-02-12' },
        ]);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">1</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            2
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
