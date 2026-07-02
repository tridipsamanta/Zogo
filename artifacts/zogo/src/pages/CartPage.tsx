import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  useGetCart, 
  useUpdateCartItem, 
  useRemoveFromCart, 
  useClearCart,
  useValidateCoupon,
  CartItem
} from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  
  const { data: cart, isLoading } = useGetCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();
  const validateCouponMutation = useValidateCoupon();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemMutation.mutate({
      productId,
      data: { quantity: newQuantity }
    });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate({ productId });
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    validateCouponMutation.mutate({
      data: { code: couponCode, orderTotal: cart?.total || 0 }
    }, {
      onSuccess: () => {
        toast({
          title: "Coupon Applied",
          description: "Discount has been applied to your cart.",
        });
      },
      onError: () => {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code is invalid or expired.",
          variant: "destructive",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-12 flex justify-center">
          <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 animate-pulse">
            <div className="md:col-span-2 space-y-4">
              <div className="h-10 bg-muted rounded-xl w-48 mb-6"></div>
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted rounded-2xl w-full"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded-3xl w-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-8 lg:py-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="font-bengali text-muted-foreground mb-8">আপনার কার্ট</p>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <div className="w-48 h-48 mb-8 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"></div>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
                alt="Empty Cart" 
                className="w-full h-full object-contain relative z-10 opacity-60 dark:invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' /%3E%3C/svg%3E";
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products">
              <Button size="lg" className="rounded-xl px-8 h-14 text-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-muted/30 flex justify-between items-center">
                  <span className="font-semibold text-foreground">Items ({cart.itemCount})</span>
                  <button 
                    onClick={() => clearCartMutation.mutate()}
                    className="text-sm text-destructive hover:underline font-medium"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="divide-y divide-border">
                  <AnimatePresence>
                    {cart.items.map((item: CartItem) => (
                      <motion.div 
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-muted p-2 flex-shrink-0 border border-border">
                          <img 
                            src={item.product.images[0] || 'https://via.placeholder.com/150'} 
                            alt={item.product.name} 
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">{item.product.brand}</span>
                            <Link href={`/products/${item.productId}`}>
                              <h3 className="font-bold text-foreground text-lg leading-tight hover:text-primary transition-colors cursor-pointer">{item.product.name}</h3>
                            </Link>
                            {item.product.nameBn && (
                              <p className="font-bengali text-sm text-muted-foreground">{item.product.nameBn}</p>
                            )}
                            <p className="text-sm text-muted-foreground pt-1">{item.product.weight} {item.product.unit}</p>
                            
                            <div className="flex items-center gap-3 pt-2">
                              <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                              {item.product.discount > 0 && (
                                <span className="text-sm text-muted-foreground line-through">{formatPrice(item.product.mrp)}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                            <div className="flex items-center border-2 border-border rounded-xl h-10 w-[120px] bg-background">
                              <button 
                                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                              >
                                <Minus size={16} />
                              </button>
                              <div className="flex-1 text-center font-bold text-sm">{item.quantity}</div>
                              <button 
                                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => handleRemoveItem(item.productId)}
                              className="text-muted-foreground hover:text-destructive text-sm flex items-center gap-1 transition-colors bg-muted sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-lg sm:rounded-none"
                            >
                              <Trash2 size={16} /> <span className="sm:hidden">Remove</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-200">Safe & Secure Delivery</p>
                  <p className="text-sm text-blue-700/80 dark:text-blue-300 mt-1">100% replacement guarantee if items are not fresh. Quality checked before packing.</p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" /> Order Summary
                </h3>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pl-9 bg-muted/50 border-border h-10"
                      />
                    </div>
                    <Button 
                      variant="secondary" 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || validateCouponMutation.isPending}
                    >
                      Apply
                    </Button>
                  </div>
                  {cart.coupon && (
                    <div className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                      <ShieldCheck size={14} /> Coupon "{cart.coupon}" applied
                    </div>
                  )}
                </div>

                <Separator className="mb-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cart.itemCount} items)</span>
                    <span className="font-medium text-foreground">{formatPrice(cart.subtotal)}</span>
                  </div>
                  
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Product Discount</span>
                      <span>-{formatPrice(cart.discount)}</span>
                    </div>
                  )}
                  
                  {cart.couponDiscount && cart.couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-{formatPrice(cart.couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%)</span>
                    <span className="font-medium text-foreground">{formatPrice(cart.gst)}</span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Charge</span>
                    {cart.deliveryCharge === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium text-foreground">{formatPrice(cart.deliveryCharge)}</span>
                    )}
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-foreground">Total Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-foreground">{formatPrice(cart.total)}</span>
                    {(cart.discount > 0 || cart.couponDiscount! > 0) && (
                      <p className="text-xs text-green-600 font-medium mt-1">You save {formatPrice(cart.discount + (cart.couponDiscount || 0))}</p>
                    )}
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <div className="mt-4 text-center">
                  <Link href="/products" className="text-sm text-primary font-medium hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
