"use client"

import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import Dashboard from '@/components/dashboard/Dashboard';

const AdminDashboard = () => {
  return (
    <AdminLayout currentPage="dashboard">
      <Dashboard />
    </AdminLayout>
  );
};

export default AdminDashboard;