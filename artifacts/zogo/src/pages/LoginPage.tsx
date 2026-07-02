import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLogin } from '@workspace/api-client-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import zogoLogo from '@assets/image_1783011281570.png';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      data: { email, password }
    }, {
      onSuccess: (data) => {
        login(data.token, data.user);
        toast({ title: "Welcome back!" });
        setLocation('/');
      },
      onError: () => {
        toast({ title: "Login failed", description: "Invalid email or password", variant: "destructive" });
      }
    });
  };

  const handleSimulatedGoogleLogin = () => {
    toast({ title: "Google login simulation", description: "This would open Google OAuth in a real app." });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side: Branding/Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/20 via-emerald-900/10 to-background flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <Link href="/">
            <img src={zogoLogo} alt="ZOGO" className="h-12 cursor-pointer" />
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-foreground mb-4 leading-tight"
          >
            Fresh Groceries,<br/>Faster than Ever.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bengali text-xl text-muted-foreground border-l-4 border-primary pl-4"
          >
            মেদিনীপুরের সেরা গ্রোসারি ডেলিভারি অ্যাপে আপনাকে স্বাগতম।
          </motion.p>
        </div>
        
        <div className="relative z-10">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Trusted by 30k+ Families</p>
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/">
                <img src={zogoLogo} alt="ZOGO" className="h-12" />
              </Link>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2 font-bengali">অ্যাকাউন্টে লগ ইন করুন</p>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-xl bg-card border-border hover:bg-muted/50 font-medium"
              onClick={handleSimulatedGoogleLogin}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">or login with email</span>
              <div className="flex-grow border-t border-border"></div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-12 bg-muted/50 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-12 bg-muted/50 rounded-xl"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg shadow-lg shadow-primary/20"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : 'Log In'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
