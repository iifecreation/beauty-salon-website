import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Package, Settings, DollarSign, TrendingUp, Loader } from 'lucide-react';
import api from '@/lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Bookings', value: 0, icon: Package, change: '+0%' },
    { title: 'Total Courses', value: 0, icon: BookOpen, change: '+0%' },
    { title: 'Total Services', value: 0, icon: Settings, change: '+0%' },
    { title: 'Total Students', value: 0, icon: Users, change: '+0%' },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/stats");
      const statsObj = res.data && res.data.data ? res.data.data : res.data;
      console.log(statsObj);
      
      if (statsObj && typeof statsObj === 'object') {
        setStats([
          {
            title: 'Total Bookings',
            value: statsObj.totalBookings ?? 0,
            icon: Package,
            change: statsObj.bookingChange ?? '+0%'
          },
          {
            title: 'Total Courses',
            value: statsObj.totalCourses ?? 0,
            icon: BookOpen,
            change: statsObj.courseChange ?? '+0%'
          },
          {
            title: 'Total Services',
            value: statsObj.totalServices ?? 0,
            icon: Settings,
            change: statsObj.serviceChange ?? '+0%'
          },
          {
            title: 'Total Students',
            value: statsObj.totalStudents ?? 0,
            icon: Users,
            change: statsObj.studentChange ?? '+0%'
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const recentOrders = [
    { id: '001', customer: 'Sarah Johnson', course: 'Makeup Artistry', amount: '$1,200', status: 'Completed' },
    { id: '002', customer: 'Maria Garcia', service: 'Nail Art Session', amount: '$85', status: 'Pending' },
    { id: '003', customer: 'Lisa Chen', product: 'Makeup Kit Pro', amount: '$299', status: 'Shipped' },
    { id: '004', customer: 'Emma Wilson', course: 'Lash Extensions', amount: '$600', status: 'In Progress' }
  ];

  return (
    <div className="p-8 max-md:p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at Laluna Academy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-40">
            <Loader className="animate-spin w-10 h-10 text-primary" />
          </div>
        ) : (
          stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-[var(--radius)] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-[var(--radius)] p-6">
          <h2 className="text-xl font-medium text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-[var(--radius)]">
                <div>
                  <p className="font-medium text-foreground">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.course || order.service || order.product}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-[var(--radius)] p-6">
          <h2 className="text-xl font-medium text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-primary text-primary-foreground p-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-left">
              Add New Course
            </button>
            <button className="w-full bg-secondary text-secondary-foreground p-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-left">
              Add New Product
            </button>
            <button className="w-full bg-accent text-accent-foreground p-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-left">
              Add New Service
            </button>
            <button className="w-full border border-border p-3 rounded-[var(--radius)] hover:bg-accent/10 transition-colors text-left">
              View All Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;