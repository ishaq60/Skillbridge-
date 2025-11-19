'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Fetch current user data from API
        const response = await fetch('/api/users/current', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          const role = userData.role || 'user'; // default to user
          setUserRole(role);

          // Redirect to appropriate dashboard based on role
          if (role === 'admin') {
            router.push('/dashboard/admin');
          } else if (role === 'instructor') {
            router.push('/dashboard/instructor');
          } else {
            router.push('/dashboard/user');
          }
        } else {
          // If not authenticated, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to check user role:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}
