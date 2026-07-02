import React from 'react';
import { useRoute, Link } from 'wouter';
import { useGetOrder } from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrderConfirmationPage() {
  const [match, params] = useRoute('/order-confirmation/:id');
  const orderId = params?.id || '';

  const { data: order, isLoading } = useGetOrder(orderId, {
    query: { enabled: !!orderId }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse w-16 h-16 bg-primary/20 rounded-full"></div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/"><Button>Back to Home</Button></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black text-foreground text-center mb-2"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-bengali text-muted-foreground text-lg mb-8"
        >
          আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-sm mb-8"
        >
          <div className="text-center mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Order Number</p>
            <p className="text-2xl font-bold text-primary">#{order.orderNumber}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium capitalize">{order.paymentMethod.replace('cod', 'Cash on Delivery')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-bold text-lg">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border bg-blue-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
            <p className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-2">
              <Package size={16}/> Estimated Delivery
            </p>
            <p className="text-2xl font-bold text-blue-700">{order.estimatedDelivery || 'Today in 20-30 mins'}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <Link href={`/orders/${order.id}`} className="flex-1">
            <Button size="lg" className="w-full h-14 rounded-xl text-lg">
              Track Order
            </Button>
          </Link>
          <Link href="/products" className="flex-1">
            <Button size="lg" variant="outline" className="w-full h-14 rounded-xl text-lg">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
