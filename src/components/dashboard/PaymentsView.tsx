import React, { useState } from 'react';
import { Search, Download, Filter, Eye, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const PaymentsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const payments = [
    {
      id: 'PAY-001',
      customer: 'Sarah Johnson',
      email: 'sarah@email.com',
      item: 'Professional Makeup Course',
      type: 'Course',
      amount: '$1,299',
      status: 'Completed',
      date: '2024-01-15',
      method: 'Credit Card'
    },
    {
      id: 'PAY-002',
      customer: 'Maria Garcia',
      email: 'maria@email.com',
      item: 'Bridal Makeup Session',
      type: 'Service',
      amount: '$150',
      status: 'Completed',
      date: '2024-01-14',
      method: 'PayPal'
    },
    {
      id: 'PAY-003',
      customer: 'Lisa Chen',
      email: 'lisa@email.com',
      item: 'Makeup Kit Pro',
      type: 'Product',
      amount: '$299',
      status: 'Pending',
      date: '2024-01-13',
      method: 'Bank Transfer'
    },
    {
      id: 'PAY-004',
      customer: 'Emma Wilson',
      email: 'emma@email.com',
      item: 'Nail Art Course',
      type: 'Course',
      amount: '$899',
      status: 'Completed',
      date: '2024-01-12',
      method: 'Credit Card'
    },
    {
      id: 'PAY-005',
      customer: 'Anna Davis',
      email: 'anna@email.com',
      item: 'Gel Manicure Session',
      type: 'Service',
      amount: '$65',
      status: 'Failed',
      date: '2024-01-11',
      method: 'Credit Card'
    }
  ];

  const stats = [
    { title: 'Total Revenue', value: '$24,650', change: '+12%', icon: DollarSign },
    { title: 'This Month', value: '$8,420', change: '+8%', icon: TrendingUp },
    { title: 'Transactions', value: '156', change: '+23%', icon: Calendar }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus;
    const matchesType = filterType === 'all' || payment.type.toLowerCase() === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-8 max-md:p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Payments Overview</h1>
          <p className="text-muted-foreground">Monitor transactions and revenue analytics</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-[var(--radius)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} from last month</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Types</option>
          <option value="course">Courses</option>
          <option value="service">Services</option>
          <option value="product">Products</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="bg-card border border-border rounded-[var(--radius)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/5 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Transaction ID</th>
                <th className="text-left p-4 font-medium text-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-foreground">Item</th>
                <th className="text-left p-4 font-medium text-foreground">Type</th>
                <th className="text-left p-4 font-medium text-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-accent/5">
                  <td className="p-4">
                    <span className="font-mono text-sm text-primary">{payment.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{payment.customer}</div>
                      <div className="text-sm text-muted-foreground">{payment.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">{payment.item}</div>
                    <div className="text-sm text-muted-foreground">{payment.method}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs">
                      {payment.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-foreground">{payment.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{payment.date}</td>
                  <td className="p-4">
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-[var(--radius)] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-[var(--radius)] p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Credit Card</span>
              <span className="font-medium text-foreground">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">PayPal</span>
              <span className="font-medium text-foreground">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bank Transfer</span>
              <span className="font-medium text-foreground">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-[var(--radius)] p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Revenue by Type</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Courses</span>
              <span className="font-medium text-foreground">$15,420 (62%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Services</span>
              <span className="font-medium text-foreground">$6,850 (28%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Products</span>
              <span className="font-medium text-foreground">$2,380 (10%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;