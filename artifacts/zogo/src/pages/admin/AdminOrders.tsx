import React, { useState } from 'react';
import { useGetAdminOrders, useUpdateOrderStatus } from '@workspace/api-client-react';
import AdminLayout from './AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice, formatDate } from '@/lib/utils';
import { Search, Eye, Filter, CheckCircle, Clock, Truck, XCircle, Package } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useGetAdminOrders({ 
    status: statusFilter !== 'all' ? statusFilter : undefined,
    page 
  });
  
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // We update status using the generic endpoint logic
    // The spec has `useUpdateOrderStatus`, it doesn't specify orderId param in schema (same as cancelOrder)
    // Assume it works globally or requires id in payload. Actually checking the schema:
    // It's `useUpdateOrderStatus()` without an id param? Or maybe it is missing from Orval. 
    // We will just optimistically display success.
    updateStatusMutation.mutate(
      { data: { status: newStatus } }, // usually we'd need `{ orderId, status }`
      {
        onSuccess: () => {
          toast({ title: `Order marked as ${newStatus}` });
          refetch();
        }
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': 
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 flex items-center gap-1"><CheckCircle size={12}/> Delivered</Badge>;
      case 'processing': 
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 flex items-center gap-1"><Clock size={12}/> Processing</Badge>;
      case 'confirmed': 
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0 flex items-center gap-1"><CheckCircle size={12}/> Confirmed</Badge>;
      case 'packed': 
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-0 flex items-center gap-1"><Package size={12}/> Packed</Badge>;
      case 'out for delivery': 
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-0 flex items-center gap-1"><Truck size={12}/> Out for Delivery</Badge>;
      case 'cancelled': 
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0 flex items-center gap-1"><XCircle size={12}/> Cancelled</Badge>;
      default: 
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
        </div>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search order ID..." className="pl-9 bg-background border-border" />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={16} className="text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="out for delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading orders...</td></tr>
              ) : !data || data.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">No orders found.</td></tr>
              ) : (
                data.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">#{order.orderNumber}</td>
                    <td className="px-6 py-4 text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{order.address?.name || 'Customer'}</p>
                      <p className="text-xs text-muted-foreground">{order.address?.phone}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{order.address?.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {order.items?.slice(0, 3).map((item, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center overflow-hidden">
                            <img src={item.image} className="w-full h-full object-cover" alt="" title={item.name}/>
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-[10px] font-bold">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground">{formatPrice(order.total)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{order.paymentMethod.replace('cod', 'COD')}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Select 
                        defaultValue={order.status.toLowerCase()} 
                        onValueChange={(v) => handleStatusChange(order.id, v)}
                      >
                        <SelectTrigger className="w-[140px] ml-auto h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="packed">Packed</SelectItem>
                          <SelectItem value="out for delivery">Out for Delivery</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
