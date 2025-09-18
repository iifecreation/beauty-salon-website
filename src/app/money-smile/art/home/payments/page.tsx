"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PaymentsView from '@/components/dashboard/PaymentsView';

const AdminPayments = () => {
  return (
    <AdminLayout currentPage="payments">
      <PaymentsView />
    </AdminLayout>
  );
};

export default AdminPayments;