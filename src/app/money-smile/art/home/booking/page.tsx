"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import BookingManagements from '@/components/dashboard/BookingManagements';

const AdminServices = () => {
  return (
    <AdminLayout currentPage="booking">
      <BookingManagements />
    </AdminLayout>
  );
};

export default AdminServices;