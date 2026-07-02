import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Heart, Search, MapPin, Menu, User, Sun, Moon, LogOut, Settings, Package, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import zogoLogo from '@assets/image_1783011281570.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [location] = useLocation();
  const { user, isLoggedIn, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [cartBouncing, setCartBouncing] = useState(false);

  // In a real implementation we might want to watch cartCount to trigger the bounce
  useEffect(() => {
    if (cartCount > 0) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [cartCount]);

  // Real-time search with 400ms debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    clearTimeout(searchDebounceRef.current);
    if (val.trim().length > 1) {
      searchDebounceRef.current = setTimeout(() => {
        setLocation(`/products?search=${encodeURIComponent(val.trim())}`);
      }, 400);
    } else if (val.trim() === '' && location.startsWith('/products')) {
      setLocation('/products');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      clearTimeout(searchDebounceRef.current);
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      (e.target as HTMLInputElement).blur();
    }
  };

  // Sync search box with URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search') || '';
    setSearchQuery(urlSearch);
  }, [location]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500 border-b",
        isScrolled 
          ? "backdrop-blur-xl bg-white/75 dark:bg-slate-900/75 border-slate-200/40 dark:border-slate-800/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)]" 
          : "bg-transparent border-transparent py-2"
      )}
    >
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="flex items-center justify-between h-20 md:h-24 gap-6">
          
          {/* Left: Logo & Location */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0 cursor-pointer block">
              <img src={zogoLogo} alt="ZOGO" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:scale-105 transition-all duration-300" />
            </Link>
            
            <div className="hidden md:flex items-center gap-3 text-sm bg-white/80 dark:bg-slate-800/85 hover:bg-white dark:hover:bg-slate-850 py-2.5 px-4 rounded-full cursor-pointer transition-all duration-300 border border-slate-200/60 dark:border-slate-700/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] group">
              <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-600 group-hover:bg-emerald-500/20 transition-all duration-300">
                <MapPin size={16} className="text-emerald-500 stroke-[2.5]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Delivery to</span>
                <span className="font-semibold text-slate-850 dark:text-slate-200 truncate max-w-[130px]">Midnapore</span>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-2xl relative transition-all duration-300">
            <div className={cn(
              "relative w-full transition-all duration-300",
              isSearchFocused ? "scale-[1.01] z-50 text-emerald-650" : ""
            )}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
                <Search size={18} className="stroke-[2.5]" />
              </div>
              <Input 
                type="search" 
                placeholder="Search for vegetables, fruits, dairy, meats..." 
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className={cn(
                  "w-full pl-11 pr-14 h-13 rounded-full bg-white/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-850 text-slate-800 dark:text-slate-200 text-base transition-all duration-300",
                  isSearchFocused 
                    ? "border-emerald-500/80 ring-4 ring-emerald-500/10 bg-white dark:bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
                    : "shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-slate-350 dark:hover:border-slate-700"
                )}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <div className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 px-2.5 py-1 rounded-lg text-slate-500 shadow-sm leading-none">⌘K</div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hidden sm:flex text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sun className="h-5.5 w-5.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5.5 w-5.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Link href="/profile?tab=wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hidden sm:flex relative text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Heart size={22} />
              </Button>
            </Link>

            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full relative text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-300",
                  cartBouncing ? "animate-[bounce_0.5s_ease-in-out]" : ""
                )}
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 p-0 border border-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300">
                    <span className="font-bold text-emerald-600 dark:text-emerald-500">{user?.name?.charAt(0) || 'U'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-emerald-50/10">
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-emerald-600" />
                        <span className="font-semibold text-emerald-600 dark:text-emerald-500">Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/orders">
                      <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/profile?tab=settings">
                      <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); setLocation('/'); }} className="text-destructive focus:text-destructive focus:bg-red-50 dark:focus:bg-red-950/20 cursor-pointer rounded-lg">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setLocation('/login')} 
                className="hidden sm:flex rounded-full px-7 h-11 font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-lg hover:shadow-emerald-600/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Login
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden rounded-full font-bold">
              <Menu size={24} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4 px-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-500">
              <Search size={16} className="stroke-[2.5]" />
            </div>
            <Input 
              type="search" 
              placeholder="Search groceries..." 
              className="w-full pl-10 h-11 rounded-full bg-white/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 text-sm shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
