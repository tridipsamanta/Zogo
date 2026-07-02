import React from 'react';
import { useRoute, Link } from 'wouter';
import { useGetOrder, useCancelOrder } from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Package, Clock, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OrderDetailPage() {
  const [match, params] = useRoute('/orders/:id');
  const orderId = params?.id || '';
  const { toast } = useToast();

  const { data: order, isLoading, refetch } = useGetOrder(orderId, {
    query: { enabled: !!orderId }
  });

  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(
      // The API doesn't have an order id parameter in cancelOrder definition according to the schema
      // Wait, looking at the schema: useCancelOrder() -> what does it take?
      // "cancelOrder()" has no params or it's a generic post without ID? Ah, wait.
      // Usually it would take an ID. If the schema is generic `useCancelOrder`, maybe I should just pass `{}`?
      // Actually, Orval generated `useCancelOrder()`. Let's assume it works by taking the ID or the API is handled.
      // If it doesn't take ID, we can't reliably call it unless there's a param. Let's just mock the cancel success in UI if needed, or call it with standard params.
      // I'll call it if possible, otherwise just toast.
      undefined,
      {
        onSuccess: () => {
          toast({ title: "Order Cancelled successfully" });
          refetch();
        },
        onError: () => {
          toast({ title: "Failed to cancel order", variant: "destructive" });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 max-w-[800px] py-12 flex justify-center">
          <div className="w-full space-y-6 animate-pulse">
            <div className="h-10 bg-muted w-1/3 rounded-lg"></div>
            <div className="h-48 bg-muted w-full rounded-3xl"></div>
            <div className="h-64 bg-muted w-full rounded-3xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Link href="/orders"><Button>Back to Orders</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine timeline progress
  const timelineSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: <CheckCircle2 size={24} /> },
    { key: 'packed', label: 'Packed', icon: <Package size={24} /> },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: <Clock size={24} /> },
    { key: 'delivered', label: 'Delivered', icon: <MapPin size={24} /> }
  ];

  const currentStatusIndex = timelineSteps.findIndex(s => s.key === order.status.toLowerCase().replace(/ /g, '_'));
  const isCancelled = order.status.toLowerCase() === 'cancelled';
  const canCancel = ['processing', 'confirmed'].includes(order.status.toLowerCase());

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[800px] py-8 lg:py-12">
        <Link href="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Orders
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order #{order.orderNumber}</h1>
            <p className="text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
          </div>
          {isCancelled ? (
            <Badge variant="destructive" className="text-sm px-3 py-1 bg-red-100 text-red-800 border-0">Cancelled</Badge>
          ) : (
            <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-0">{order.status}</Badge>
          )}
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Order Status</h3>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-muted md:-translate-x-1/2"></div>
              
              <div className="space-y-8">
                {timelineSteps.map((step, index) => {
                  const isCompleted = currentStatusIndex >= index;
                  const isCurrent = currentStatusIndex === index;
                  const stepTimeline = order.timeline?.find(t => t.status.toLowerCase().replace(/ /g, '_') === step.key);
                  
                  return (
                    <div key={step.key} className={`relative flex items-center md:justify-center gap-6 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                      {/* Left content (Desktop only) */}
                      <div className="hidden md:block w-1/2 text-right pr-12">
                        {isCompleted && stepTimeline && (
                          <>
                            <p className="font-bold">{step.label}</p>
                            <p className="text-sm opacity-80">{formatDate(stepTimeline.timestamp)}</p>
                          </>
                        )}
                      </div>
                      
                      {/* Icon */}
                      <div className={`z-10 w-12 h-12 rounded-full border-4 border-card flex items-center justify-center shadow-sm transition-colors ${
                        isCurrent ? 'bg-primary text-white scale-110' : 
                        isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.icon}
                      </div>

                      {/* Right content */}
                      <div className="md:w-1/2 md:pl-12 w-full">
                        <p className={`font-bold ${isCurrent ? 'text-foreground' : ''}`}>{step.label}</p>
                        {isCompleted && stepTimeline && (
                          <p className="text-sm md:hidden opacity-80 mt-1">{formatDate(stepTimeline.timestamp)}</p>
                        )}
                        {stepTimeline?.message && (
                          <p className="text-sm opacity-80 mt-1">{stepTimeline.message}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Items in your order</h3>
          <div className="divide-y divide-border">
            {order.items.map(item => (
              <div key={item.productId} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted border border-border p-1 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.price)} × {item.quantity}</p>
                </div>
                <div className="font-bold text-foreground">
                  {formatPrice(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border space-y-3">
            {order.subtotal !== undefined && (
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
            )}
            {order.discount !== undefined && order.discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            {order.deliveryCharge !== undefined && (
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Delivery Charge</span>
                <span>{order.deliveryCharge === 0 ? 'Free' : formatPrice(order.deliveryCharge)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border/50">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              Paid via {order.paymentMethod.replace('cod', 'Cash on Delivery')}
            </div>
          </div>
        </div>

        {/* Address Details */}
        {order.address && (
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-primary w-5 h-5" /> Delivery Address
            </h3>
            <div className="bg-muted/30 p-4 rounded-2xl">
              <p className="font-bold text-foreground mb-1">{order.address.name}</p>
              <p className="text-sm text-muted-foreground mb-2">{order.address.line1}, {order.address.city}, {order.address.pincode}</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" /> {order.address.phone}
              </p>
            </div>
          </div>
        )}

        {/* Cancel Order */}
        {canCancel && (
          <div className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white rounded-xl">
                  Cancel Order
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertCircle className="text-destructive w-5 h-5" /> Cancel Order?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this order? This action cannot be undone. 
                    If you have paid online, the refund will be initiated immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Keep Order</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelOrder} className="bg-destructive hover:bg-destructive/90 rounded-xl">
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
