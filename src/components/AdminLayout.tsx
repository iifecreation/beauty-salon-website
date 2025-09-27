import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  Settings, 
  CreditCard, 
  Menu, 
  X,
  LogOut,
  User,
  MessagesSquare,
  GraduationCap,
  CalendarCheck2
} from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: 'Dashboard', href: '/money-smile/art/home', icon: LayoutDashboard, current: currentPage === 'dashboard' },
    { name: 'Courses', href: '/money-smile/art/home/courses', icon: BookOpen, current: currentPage === 'courses' },
    { name: 'Services', href: '/money-smile/art/home/services', icon: Settings, current: currentPage === 'services' },
    { name: 'Students', href: '/money-smile/art/home/students', icon: GraduationCap, current: currentPage === 'students' },
    { name: 'Booking', href: '/money-smile/art/home/booking', icon: CalendarCheck2, current: currentPage === 'booking' },
    { name: 'Contact', href: '/money-smile/art/home/contact', icon: MessagesSquare, current: currentPage === 'contact' }
  ];

  const handleLogout = async () => {
    try {
      await api.post("/admin/auth/logout"); // deletes refreshToken cookie server-side

      // Clear tokens and user info
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      // Redirect to login
      router.push("/money-smile/art/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">L</span>
            </div>
            <span className="text-lg font-medium text-foreground">Beauty Best Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-6">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-[var(--radius)] transition-colors ${
                    item.current
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@gmail.com</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Top bar */}
        <div className="bg-background border-b border-border h-16 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground mr-4"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium text-foreground capitalize">
              {currentPage === 'dashboard' ? 'Dashboard' : `${currentPage} Management`}
            </h1>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;