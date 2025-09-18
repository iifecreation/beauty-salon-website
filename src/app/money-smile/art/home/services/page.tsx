"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ServicesManagement from '@/components/dashboard/ServicesManagement';

const AdminServices = () => {
  return (
    <AdminLayout currentPage="services">
      <ServicesManagement />
    </AdminLayout>
  );
};

export default AdminServices;