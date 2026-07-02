import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  BarChart3,
  Tags
} from 'lucide-react';
import zogoLogo from '@assets/image_1783011281570.png';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { user, logout, isAdmin } = useAuth();

  // Protect route
  if (!user || !isAdmin) {
    setLocation('/');
    return null;
  }

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { label: 'Products', icon: <Package size={20} />, path: '/admin/products' },

    { label: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { label: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 z-20">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <Link href="/">
            <img src={zogoLogo} alt="ZOGO" className="h-8 cursor-pointer" />
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 overflow-y-auto space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Management</p>
          
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== '/admin' && location.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          
          <button 
            onClick={() => { logout(); setLocation('/login'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold">
            {navItems.find(i => location === i.path || (i.path !== '/admin' && location.startsWith(i.path)))?.label || 'Admin Panel'}
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-primary font-semibold hover:underline">View Store</Link>
          </div>
        </header>
        
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
