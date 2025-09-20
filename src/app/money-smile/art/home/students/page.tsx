"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ServicesManagement from '@/components/dashboard/ServicesManagement';
import StudenteManagements from '@/components/dashboard/StudenteManagements';

const AdminServices = () => {
  return (
    <AdminLayout currentPage="services">
      <StudenteManagements />
    </AdminLayout>
  );
};

export default AdminServices;