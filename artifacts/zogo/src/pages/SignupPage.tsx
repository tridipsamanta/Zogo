import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useSignup } from '@workspace/api-client-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import zogoLogo from '@assets/image_1783011281570.png';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const signupMutation = useSignup();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }

    signupMutation.mutate({
      data: { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        password: formData.password 
      }
    }, {
      onSuccess: (data) => {
        // Automatically login the user with returned token
        login(data.token, data.user);
        toast({ title: "Account created successfully!" });
        setLocation('/');
      },
      onError: (err) => {
        toast({ title: "Signup failed", description: "Please check your details and try again.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Right side: Branding/Illustration (Flipped from login) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-bl from-amber-500/20 via-orange-900/10 to-background flex-col justify-between p-12 relative overflow-hidden order-2">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex justify-end">
          <Link href="/">
            <img src={zogoLogo} alt="ZOGO" className="h-12 cursor-pointer" />
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md ml-auto text-right">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-foreground mb-4 leading-tight"
          >
            Join Midnapore's<br/>Finest Market.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bengali text-xl text-muted-foreground border-r-4 border-amber-500 pr-4"
          >
            আপনার প্রতিদিনের প্রয়োজনে, সবচেয়ে বিশ্বস্ত সঙ্গী।
          </motion.p>
        </div>
        
        <div className="relative z-10 text-right">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Earn Rewards on First Order</p>
        </div>
      </div>

      {/* Left side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 order-1 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/">
                <img src={zogoLogo} alt="ZOGO" className="h-12" />
              </Link>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground mt-2 font-bengali">নতুন অ্যাকাউন্ট তৈরি করুন</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                required 
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="h-12 bg-muted/50 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  required 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="h-12 bg-muted/50 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  required 
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="h-12 bg-muted/50 rounded-xl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                type="password" 
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="h-12 bg-muted/50 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input 
                type="password" 
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                className="h-12 bg-muted/50 rounded-xl"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg mt-6 shadow-lg shadow-primary/20"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
