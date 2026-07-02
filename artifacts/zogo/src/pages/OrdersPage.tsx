import React from 'react';
import { Link } from 'wouter';
import { useGetOrders } from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, ChevronRight, MapPin } from 'lucide-react';

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrders();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'out for delivery': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[1000px] py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="font-bengali text-muted-foreground mb-8">আমার অর্ডার সমূহ</p>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-lg">Order #{order.orderNumber}</span>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-2xl font-black text-foreground">{formatPrice(order.total)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  {/* Image thumbnails preview */}
                  <div className="flex -space-x-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{order.items.length} items</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {order.items.map(i => i.name).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-primary"/> 
                    Delivered to: <span className="font-medium text-foreground">{order.address?.city}</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none rounded-xl" onClick={() => {}}>Reorder</Button>
                    <Link href={`/orders/${order.id}`} className="flex-1 sm:flex-none">
                      <Button className="w-full rounded-xl">View Details <ChevronRight size={16} className="ml-1" /></Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
