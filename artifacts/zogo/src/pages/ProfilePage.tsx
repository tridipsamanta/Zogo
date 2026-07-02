import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  useGetProfile, 
  useUpdateProfile, 
  useGetAddresses, 
  useAddAddress, 
  useUpdateAddress, 
  useDeleteAddress,
  useGetWishlist,
  useRemoveFromWishlist
} from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User, MapPin, Heart, Bell, Settings, LogOut, Edit2, Trash2, Plus, Link } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultTab = searchParams.get('tab') || 'profile';
  
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: addresses, isLoading: addressesLoading, refetch: refetchAddresses } = useGetAddresses();
  const { data: wishlist, isLoading: wishlistLoading, refetch: refetchWishlist } = useGetWishlist();

  const updateProfileMutation = useUpdateProfile();
  const addAddressMutation = useAddAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ data: profileForm }, {
      onSuccess: (updatedUser) => {
        updateUser(updatedUser);
        toast({ title: "Profile updated successfully" });
      }
    });
  };

  // Address Form
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    name: '',
    phone: '',
    line1: '',
    city: 'Midnapore',
    district: 'Paschim Medinipur',
    state: 'West Bengal',
    pincode: '721101',
    isDefault: false
  });

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: 'Home', name: '', phone: '', line1: '', 
      city: 'Midnapore', district: 'Paschim Medinipur', state: 'West Bengal', 
      pincode: '721101', isDefault: false
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddress = (address: any) => {
    setEditingAddressId(address.id);
    setAddressForm({
      label: address.label, name: address.name, phone: address.phone, line1: address.line1,
      city: address.city, district: address.district, state: address.state,
      pincode: address.pincode, isDefault: address.isDefault
    });
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddressMutation.mutate({ addressId: editingAddressId, data: addressForm }, {
        onSuccess: () => {
          setIsAddressModalOpen(false);
          refetchAddresses();
          toast({ title: "Address updated" });
        }
      });
    } else {
      addAddressMutation.mutate({ data: addressForm }, {
        onSuccess: () => {
          setIsAddressModalOpen(false);
          refetchAddresses();
          toast({ title: "Address added" });
        }
      });
    }
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddressMutation.mutate({ addressId: id }, {
      onSuccess: () => {
        refetchAddresses();
        toast({ title: "Address deleted" });
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistMutation.mutate({ productId }, {
      onSuccess: () => {
        refetchWishlist();
        toast({ title: "Removed from wishlist" });
      }
    });
  };

  if (!user) {
    return null; // Should be handled by router protection
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[1200px] py-8 lg:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-3xl p-6 flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-primary">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-foreground line-clamp-1">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            
            {/* The tabs trigger styling is handled inside Tabs below, but we can structure it vertically */}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue={defaultTab} className="w-full">
              <div className="bg-card border border-border rounded-2xl p-2 mb-8 overflow-x-auto hide-scrollbar">
                <TabsList className="bg-transparent h-auto p-0 flex space-x-2">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                    <MapPin className="w-4 h-4 mr-2" /> Addresses
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                    <Heart className="w-4 h-4 mr-2" /> Wishlist
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0">
                <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                  <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input 
                        value={profileForm.name} 
                        onChange={e => setProfileForm({...profileForm, name: e.target.value})} 
                        className="h-12 bg-muted/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        value={profileForm.phone} 
                        onChange={e => setProfileForm({...profileForm, phone: e.target.value})} 
                        className="h-12 bg-muted/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input 
                        value={user.email} 
                        disabled 
                        className="h-12 bg-muted/50 rounded-xl opacity-70"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                    </div>
                    <Button type="submit" disabled={updateProfileMutation.isPending} className="h-12 px-8 rounded-xl">
                      Save Changes
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="mt-0">
                <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Saved Addresses</h3>
                    <Button onClick={openAddAddress} size="sm" className="rounded-xl">
                      <Plus className="w-4 h-4 mr-2" /> Add New
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {addressesLoading ? (
                      [1, 2].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl"></div>)
                    ) : addresses?.length === 0 ? (
                      <div className="col-span-full py-10 text-center text-muted-foreground">
                        No saved addresses found. Add one for faster checkout.
                      </div>
                    ) : (
                      addresses?.map(addr => (
                        <div key={addr.id} className="border border-border rounded-2xl p-5 relative group">
                          {addr.isDefault && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl">
                              DEFAULT
                            </span>
                          )}
                          <span className="text-xs font-bold uppercase tracking-wider bg-muted px-2 py-1 rounded mb-2 inline-block">{addr.label}</span>
                          <p className="font-bold text-foreground">{addr.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{addr.line1}, {addr.city}</p>
                          <p className="text-sm text-muted-foreground">{addr.district}, {addr.pincode}</p>
                          <p className="text-sm font-medium mt-2">{addr.phone}</p>
                          
                          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg" onClick={() => openEditAddress(addr)}>
                              <Edit2 size={14} />
                            </Button>
                            <Button size="icon" variant="destructive" className="h-8 w-8 rounded-lg" onClick={() => handleDeleteAddress(addr.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-0">
                <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6">My Wishlist</h3>
                  
                  {wishlistLoading ? (
                    <ProductGrid isLoading={true} skeletonCount={4} />
                  ) : wishlist?.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                      <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <h3 className="text-lg font-bold mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-4">Save your favorite items here.</p>
                      <Link href="/products">
                        <Button>Browse Products</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {wishlist?.map((product: any) => (
                        <div key={product.id} className="relative group">
                          {/* Wrapper to handle wishlist remove specifically */}
                          <div className="absolute top-2 right-2 z-20">
                            <Button 
                              size="icon" 
                              variant="destructive" 
                              className="h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveFromWishlist(product.id); }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                          {/* Normally we'd use ProductCard but without the built-in heart toggle */}
                          <div className="pointer-events-none">
                            {/* Simple display, ideally we'd pass a prop to ProductCard to hide its own heart */}
                          </div>
                        </div>
                      ))}
                      {/* Just rendering ProductGrid for now, it will have the heart which users can click to toggle */}
                      <ProductGrid products={wishlist} />
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-0">
                <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Bell className="text-muted-foreground" />
                        <div>
                          <p className="font-semibold">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive order updates and offers</p>
                        </div>
                      </div>
                      <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </div>
                    </div>

                    <div 
                      className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-2xl cursor-pointer hover:bg-destructive/10 transition-colors"
                      onClick={() => { logout(); setLocation('/'); }}
                    >
                      <div className="flex items-center gap-3 text-destructive">
                        <LogOut />
                        <p className="font-semibold">Log Out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />

      {/* Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle>{editingAddressId ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddressSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input required value={addressForm.name} onChange={e => setAddressForm({...addressForm, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input required value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Flat, House no., Building, Company</Label>
              <Input required value={addressForm.line1} onChange={e => setAddressForm({...addressForm, line1: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City / Town</Label>
                <Input required value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input required value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} />
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={addAddressMutation.isPending || updateAddressMutation.isPending}>Save Address</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
