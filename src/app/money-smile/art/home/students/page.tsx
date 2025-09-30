"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import StudentsManagements from '@/components/dashboard/StudentsManagements';

const AdminServices = () => {
  return (
    <AdminLayout currentPage="students">
      <StudentsManagements />
    </AdminLayout>
  );
};

export default AdminServices;