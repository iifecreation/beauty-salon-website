"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import CoursesManagement from '@/components/dashboard/CoursesManagement';

const AdminCourses = () => {
  return (
    <AdminLayout currentPage="courses">
      <CoursesManagement />
    </AdminLayout>
  );
};

export default AdminCourses;