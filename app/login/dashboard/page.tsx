import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

const DashboardPage = () => {
   const { user, logout } = useAuth();
  const router = useRouter();
  return (
 <ProtectedRoute>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          logout();
          router.replace("/login");
        }}
      >
        Çıkış Yap
      </button>
    </ProtectedRoute>
  )
}

export default DashboardPage