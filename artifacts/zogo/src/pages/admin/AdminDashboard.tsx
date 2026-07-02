import React from 'react';
import { useGetAdminDashboard } from '@workspace/api-client-react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, ShoppingBag, Users, Package, TrendingUp } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { data, isLoading } = useGetAdminDashboard();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted rounded-2xl"></div>)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-96 bg-muted rounded-2xl"></div>
            <div className="h-96 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Placeholder data if charts data is empty or missing
  const salesChartData = data?.salesChart?.length ? data.salesChart : [
    { label: 'Mon', value: 120 }, { label: 'Tue', value: 150 }, { label: 'Wed', value: 180 },
    { label: 'Thu', value: 140 }, { label: 'Fri', value: 210 }, { label: 'Sat', value: 250 }, { label: 'Sun', value: 310 }
  ];

  const revenueChartData = data?.revenueChart?.length ? data.revenueChart : [
    { label: 'Mon', value: 45000 }, { label: 'Tue', value: 52000 }, { label: 'Wed', value: 48000 },
    { label: 'Thu', value: 61000 }, { label: 'Fri', value: 59000 }, { label: 'Sat', value: 85000 }, { label: 'Sun', value: 92000 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Sales</CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <IndianRupee size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(data?.todaySales || 0)}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
                <TrendingUp size={12} className="mr-1" /> +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Orders</CardTitle>
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.todayOrders || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
                <TrendingUp size={12} className="mr-1" /> +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Users size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalCustomers || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
                <TrendingUp size={12} className="mr-1" /> +142 this week
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Package size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalProducts || 0}</div>
              <p className="text-xs text-destructive mt-1 flex items-center">
                {data?.lowStockProducts || 0} products low on stock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Orders Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "#fff"}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 12, fill: '#6b7280'}} 
                      tickFormatter={(val) => `₹${val/1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatPrice(value), 'Revenue']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      cursor={{fill: '#f3f4f6'}}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-y border-border">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Order ID</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold rounded-tr-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data?.recentOrders?.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">#{order.orderNumber}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(order.createdAt)}</td>
                      <td className="px-4 py-3 font-medium">{order.address?.name || 'Customer'}</td>
                      <td className="px-4 py-3 font-bold">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={
                          order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800 border-0' :
                          order.status.toLowerCase() === 'processing' ? 'bg-amber-100 text-amber-800 border-0' :
                          'bg-blue-100 text-blue-800 border-0'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a href={`/admin/orders`} className="text-primary hover:underline font-medium">View</a>
                      </td>
                    </tr>
                  ))}
                  {(!data?.recentOrders || data.recentOrders.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No recent orders</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
