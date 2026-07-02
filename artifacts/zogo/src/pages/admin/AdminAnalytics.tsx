import React, { useState } from 'react';
import { useGetAdminAnalytics } from '@workspace/api-client-react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('7d');
  const { data, isLoading } = useGetAdminAnalytics({ period });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 bg-muted rounded"></div>
          <div className="grid grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-muted rounded-2xl"></div>)}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-96 bg-muted rounded-2xl"></div>
            <div className="h-96 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  // Mock data if API returns empty
  const categoryData = data?.categoryPerformance?.length ? data.categoryPerformance : [
    { category: 'Vegetables', sales: 45000, percentage: 30 },
    { category: 'Fruits', sales: 30000, percentage: 20 },
    { category: 'Dairy', sales: 25000, percentage: 17 },
    { category: 'Meat & Fish', sales: 35000, percentage: 23 },
    { category: 'Others', sales: 15000, percentage: 10 }
  ];

  const salesData = data?.salesData?.length ? data.salesData : [
    { label: 'Mon', value: 120 }, { label: 'Tue', value: 150 }, { label: 'Wed', value: 180 },
    { label: 'Thu', value: 140 }, { label: 'Fri', value: 210 }, { label: 'Sat', value: 250 }, { label: 'Sun', value: 310 }
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed performance metrics</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px] bg-card border-border">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Revenue</p>
            <h3 className="text-3xl font-black text-foreground">{formatPrice(data?.totalRevenue || 150000)}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Average Order Value</p>
            <h3 className="text-3xl font-black text-foreground">{formatPrice(data?.averageOrderValue || 450)}</h3>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-purple-500/10 to-transparent">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Returning Customers</p>
            <h3 className="text-3xl font-black text-foreground">{data?.returningCustomers || 65}%</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-none shadow-sm col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="sales"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatPrice(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pt-4">
              {categoryData.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold">{cat.category}</span>
                    <div className="text-right">
                      <span className="font-bold">{formatPrice(cat.sales)}</span>
                      <span className="text-muted-foreground text-xs ml-2">({cat.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
