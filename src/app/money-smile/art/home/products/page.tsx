"use client"


import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProductsManagement from '@/components/dashboard/ProductsManagement';

const AdminProducts = () => {
  return (
    <AdminLayout currentPage="products">
      <ProductsManagement />
    </AdminLayout>
  );
};

export default AdminProducts;