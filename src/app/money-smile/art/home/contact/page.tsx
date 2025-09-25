"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ContactManagement from '@/components/dashboard/ContactManagement';

const AdminServices = () => {
  return (
    <AdminLayout currentPage="services">
      <ContactManagement />
    </AdminLayout>
  );
};

export default AdminServices;