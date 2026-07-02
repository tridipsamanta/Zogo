import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  useGetCart, 
  useGetAddresses,
  useAddAddress,
  useCreateOrder
} from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { MapPin, CreditCard, Clock, Truck, Plus, ChevronRight, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [deliverySlot, setDeliverySlot] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  
  // New address form
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    name: '',
    phone: '',
    line1: '',
    city: 'Midnapore',
    district: 'Paschim Medinipur',
    state: 'West Bengal',
    pincode: '721101'
  });

  const { data: cart, isLoading: cartLoading } = useGetCart();
  const { data: addresses, isLoading: addressesLoading } = useGetAddresses();
  
  const addAddressMutation = useAddAddress();
  const createOrderMutation = useCreateOrder();

  // Set default address if available
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  // Redirect to cart if empty
  useEffect(() => {
    if (cart && (!cart.items || cart.items.length === 0)) {
      setLocation('/cart');
    }
  }, [cart, setLocation]);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddressMutation.mutate({ data: newAddress }, {
      onSuccess: (addedAddress) => {
        setIsAddressModalOpen(false);
        setSelectedAddressId(addedAddress.id);
        toast({ title: "Address added successfully" });
      }
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast({ title: "Select Delivery Address", variant: "destructive" });
      return;
    }

    createOrderMutation.mutate({
      data: {
        addressId: selectedAddressId,
        paymentMethod,
        deliverySlot,
      }
    }, {
      onSuccess: (order) => {
        setLocation(`/order-confirmation/${order.id}`);
      },
      onError: () => {
        toast({ title: "Failed to place order", variant: "destructive" });
      }
    });
  };

  if (cartLoading || addressesLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center animate-pulse"><div className="w-16 h-16 bg-primary/20 rounded-full"></div></div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return null; // Handled by useEffect redirect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Checkout Progress Bar */}
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4 max-w-[1000px]">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            
            {[
              { num: 1, label: 'Delivery' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' }
            ].map(s => (
              <div key={s.num} className="flex flex-col items-center gap-2 bg-card px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step > s.num ? 'bg-primary text-white' : step === s.num ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span className={`text-xs font-semibold ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 max-w-[1200px] py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Main Checkout Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* STEP 1: Delivery */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="text-primary" /> Delivery Address
                </h2>

                {addresses && addresses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {addresses.map(addr => (
                      <div 
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                          selectedAddressId === addr.id 
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider bg-background px-2 py-1 rounded shadow-sm border border-border">{addr.label}</span>
                          {selectedAddressId === addr.id && <CheckCircle2 size={20} className="text-primary" />}
                        </div>
                        <p className="font-bold text-foreground">{addr.name}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{addr.line1}, {addr.city}, {addr.pincode}</p>
                        <p className="text-sm font-medium mt-2">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/30 border border-dashed border-border rounded-2xl p-8 text-center mb-6">
                    <p className="text-muted-foreground mb-4">You don't have any saved addresses.</p>
                  </div>
                )}

                <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto border-dashed border-2 bg-transparent hover:bg-muted/50 h-14 rounded-xl">
                      <Plus className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Add Delivery Address</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddAddress} className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input required value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input required value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Flat, House no., Building, Company, Apartment</Label>
                        <Input required value={newAddress.line1} onChange={e => setNewAddress({...newAddress, line1: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City / Town</Label>
                          <Input required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Pincode</Label>
                          <Input required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
                        </div>
                      </div>
                      <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={addAddressMutation.isPending}>Save Address</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
                  <Clock className="text-primary" /> Delivery Slot
                </h3>
                
                <RadioGroup value={deliverySlot} onValueChange={setDeliverySlot} className="grid sm:grid-cols-2 gap-4">
                  <div className={`rounded-xl border-2 p-4 cursor-pointer transition-colors ${deliverySlot === 'express' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="express" id="express" className="sr-only" />
                    <Label htmlFor="express" className="cursor-pointer flex flex-col gap-1 w-full h-full">
                      <div className="flex justify-between items-center">
                        <span className="font-bold flex items-center gap-2"><Truck size={16} className="text-green-500"/> Express Delivery</span>
                        <span className="text-green-600 font-bold">₹40</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Delivery in 20-30 minutes</span>
                    </Label>
                  </div>
                  <div className={`rounded-xl border-2 p-4 cursor-pointer transition-colors ${deliverySlot === 'scheduled' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="scheduled" id="scheduled" className="sr-only" />
                    <Label htmlFor="scheduled" className="cursor-pointer flex flex-col gap-1 w-full h-full">
                      <div className="flex justify-between items-center">
                        <span className="font-bold flex items-center gap-2"><Clock size={16} className="text-blue-500"/> Scheduled</span>
                        <span className="text-green-600 font-bold">Free</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Today, 6:00 PM - 8:00 PM</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-8 flex justify-end">
                  <Button size="lg" onClick={() => {
                    if (!selectedAddressId) toast({ title: "Please select an address", variant: "destructive" });
                    else setStep(2);
                  }} className="px-10 h-14 rounded-xl text-lg w-full sm:w-auto">
                    Proceed to Payment <ChevronRight className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="text-primary" /> Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {[
                    { id: 'upi', title: 'UPI (Google Pay, PhonePe, Paytm)', desc: 'Pay directly from your bank account', icon: '📱' },
                    { id: 'card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: '💳' },
                    { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Pay when your order arrives', icon: '💵' },
                  ].map(method => (
                    <div key={method.id} className={`rounded-2xl border-2 p-5 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border'}`}>
                      <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                      <Label htmlFor={method.id} className="cursor-pointer flex items-center gap-4 w-full">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-foreground">{method.title}</p>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-muted-foreground'}`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                      </Label>
                      
                      {/* Sub-forms based on selection */}
                      {paymentMethod === method.id && method.id === 'upi' && (
                        <div className="mt-4 pt-4 border-t border-border/50 animate-in slide-in-from-top-2">
                          <Label className="mb-2 block">Enter UPI ID</Label>
                          <div className="flex gap-2">
                            <Input placeholder="example@upi" className="bg-background" />
                            <Button variant="secondary">Verify</Button>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === method.id && method.id === 'card' && (
                        <div className="mt-4 pt-4 border-t border-border/50 animate-in slide-in-from-top-2 space-y-4">
                          <div>
                            <Label className="mb-2 block">Card Number</Label>
                            <Input placeholder="0000 0000 0000 0000" className="bg-background" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="mb-2 block">Expiry (MM/YY)</Label>
                              <Input placeholder="MM/YY" className="bg-background" />
                            </div>
                            <div>
                              <Label className="mb-2 block">CVV</Label>
                              <Input placeholder="123" type="password" maxLength={3} className="bg-background" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-8 flex justify-between gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)} className="h-14 rounded-xl px-6">
                    Back
                  </Button>
                  <Button size="lg" onClick={() => setStep(3)} className="px-10 h-14 rounded-xl text-lg flex-1 sm:flex-none">
                    Review Order <ChevronRight className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                
                <div className="bg-muted/30 rounded-3xl p-6 border border-border mb-6">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-border/50">
                    <div>
                      <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-1">Deliver To</h4>
                      <p className="font-bold">{addresses?.find(a => a.id === selectedAddressId)?.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{addresses?.find(a => a.id === selectedAddressId)?.line1}</p>
                    </div>
                    <Button variant="link" size="sm" onClick={() => setStep(1)}>Change</Button>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-border/50">
                    <div>
                      <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-1">Payment Method</h4>
                      <p className="font-bold capitalize">{paymentMethod.replace('cod', 'Cash on Delivery')}</p>
                    </div>
                    <Button variant="link" size="sm" onClick={() => setStep(2)}>Change</Button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-3">Items ({cart.itemCount})</h4>
                    <div className="space-y-3">
                      {cart.items.map(item => (
                        <div key={item.productId} className="flex items-center gap-3">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg bg-background border border-border p-1 object-contain" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">{item.quantity} × {formatPrice(item.price)}</p>
                          </div>
                          <div className="font-bold text-sm">{formatPrice(item.totalPrice)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} className="h-14 rounded-xl px-6">
                    Back
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={handlePlaceOrder} 
                    disabled={createOrderMutation.isPending}
                    className="px-10 h-14 rounded-xl text-lg flex-1 sm:flex-none shadow-lg shadow-primary/20"
                  >
                    Place Order - {formatPrice(cart.total + (deliverySlot === 'express' ? 40 : 0))}
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span className="font-medium text-foreground">{formatPrice(cart.subtotal)}</span>
                </div>
                
                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span className="font-medium text-foreground">{formatPrice(cart.gst)}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charge</span>
                  {deliverySlot === 'express' ? (
                    <span className="font-medium text-foreground">₹40</span>
                  ) : (
                    <span className="text-green-600 font-medium">Free</span>
                  )}
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-black text-foreground">
                  {formatPrice(cart.total + (deliverySlot === 'express' ? 40 : 0))}
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
