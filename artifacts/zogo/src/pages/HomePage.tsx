import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, CreditCard, Clock, Star, Phone, CheckCircle2, ChevronDown, IndianRupee, MapPin, Users, LayoutGrid, Heart, Leaf, Hand, Lock } from 'lucide-react';
import { 
  useGetBanners, 
  useGetCategories, 
  useGetProducts 
} from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// --- Hero Banner Slider ---
const HeroBannerSlider = () => {
  const { data: banners, isLoading } = useGetBanners();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback banners if none from API
  const sliderBanners = banners?.length ? banners : [
    { id: '1', title: 'Fresh Vegetables Daily', titleBn: 'আজকের তাজা সবজি', subtitle: 'Straight from local farms to your kitchen', subtitleBn: 'স্থানীয় খামার থেকে সরাসরি আপনার রান্নাঘরে', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&h=600&fit=crop', ctaText: 'Shop Vegetables', ctaTextBn: 'সবজি কিনুন', ctaLink: '/category/vegetables', badge: 'Farm Fresh', gradient: 'from-green-900/80 to-transparent' },
    { id: '2', title: 'Weekend Mega Sale', titleBn: 'সপ্তাহান্তের মেগা সেল', subtitle: 'Up to 50% off on household essentials', subtitleBn: 'গৃহস্থালির প্রয়োজনীয় জিনিসে ৫০% পর্যন্ত ছাড়', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=600&fit=crop', ctaText: 'View Offers', ctaTextBn: 'অফার দেখুন', ctaLink: '/products?featured=true', badge: 'Limited Time', gradient: 'from-amber-900/80 to-transparent' },
    { id: '3', title: 'Midnapore Special', titleBn: 'মেদিনীপুরের বিশেষ সংগ্রহ', subtitle: 'Premium Gobindobhog rice & pure mustard oil', subtitleBn: 'প্রিমিয়াম গোবিন্দভোগ চাল ও খাঁটি সরিষার তেল', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&h=600&fit=crop', ctaText: 'Shop Local', ctaTextBn: 'স্থানীয় পণ্য কিনুন', ctaLink: '/products?local=true', badge: 'Local Pride', gradient: 'from-orange-900/80 to-transparent' },
    { id: '4', title: 'Fresh Fish Festival', titleBn: 'মাছের বিশেষ অফার', subtitle: 'River fresh Rohu, Katla & Hilsa', subtitleBn: 'নদীর তাজা রুই, কাতলা ও ইলিশ', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1200&h=600&fit=crop', ctaText: 'Shop Fish', ctaTextBn: 'মাছ কিনুন', ctaLink: '/category/fish', badge: 'Fresh Catch', gradient: 'from-cyan-900/80 to-transparent' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderBanners.length]);

  if (isLoading) {
    return <div className="w-full h-[400px] md:h-[500px] bg-muted animate-pulse rounded-3xl"></div>;
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <div className={cn("absolute inset-0 z-10 bg-gradient-to-r", sliderBanners[currentSlide].gradient)} />
          <img 
            src={sliderBanners[currentSlide].image} 
            alt={sliderBanners[currentSlide].title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-3xl">
            {sliderBanners[currentSlide].badge && (
              <Badge variant="secondary" className="w-max mb-4 bg-white text-black hover:bg-white/90">
                {sliderBanners[currentSlide].badge}
              </Badge>
            )}
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight"
            >
              {sliderBanners[currentSlide].title}
            </motion.h2>
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-3xl font-bengali text-white/90 mb-4"
            >
              {sliderBanners[currentSlide].titleBn}
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-xl"
            >
              {sliderBanners[currentSlide].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href={sliderBanners[currentSlide].ctaLink}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 px-8 text-lg font-semibold border-0">
                  {sliderBanners[currentSlide].ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? sliderBanners.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderBanners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {sliderBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              currentSlide === idx ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// --- Quick Categories ---
const QuickCategories = () => {
  const { data: categories, isLoading } = useGetCategories();

  // Fallback
  const cats = categories?.length ? categories : [
    { id: '1', name: 'Vegetables', nameBn: 'সবজি', icon: '🥦', slug: 'vegetables', color: 'bg-green-100 dark:bg-green-900/30' },
    { id: '2', name: 'Fruits', nameBn: 'ফলমূল', icon: '🍎', slug: 'fruits', color: 'bg-red-100 dark:bg-red-900/30' },
    { id: '3', name: 'Dairy', nameBn: 'দুগ্ধজাত', icon: '🥛', slug: 'dairy', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: '4', name: 'Meat', nameBn: 'মাংস', icon: '🍗', slug: 'meat', color: 'bg-rose-100 dark:bg-rose-900/30' },
    { id: '5', name: 'Fish', nameBn: 'মাছ', icon: '🐟', slug: 'fish', color: 'bg-cyan-100 dark:bg-cyan-900/30' },
    { id: '6', name: 'Rice', nameBn: 'চাল', icon: '🌾', slug: 'rice', color: 'bg-amber-100 dark:bg-amber-900/30' },
    { id: '7', name: 'Snacks', nameBn: 'স্ন্যাকস', icon: '🍪', slug: 'snacks', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { id: '8', name: 'Drinks', nameBn: 'পানীয়', icon: '🥤', slug: 'drinks', color: 'bg-purple-100 dark:bg-purple-900/30' },
    { id: '9', name: 'Spices', nameBn: 'মসলা', icon: '🌶️', slug: 'spices', color: 'bg-orange-100 dark:bg-orange-900/30' },
    { id: '10', name: 'Sweets', nameBn: 'মিষ্টি', icon: ' रस', slug: 'sweets', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { id: '11', name: 'Oils', nameBn: 'তেল', icon: '🛢️', slug: 'oils', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { id: '12', name: 'Cleaning', nameBn: 'পরিষ্কারক', icon: '🧼', slug: 'cleaning', color: 'bg-teal-100 dark:bg-teal-900/30' },
  ];

  if (isLoading) {
    return <div className="grid grid-cols-4 md:grid-cols-6 gap-4 animate-pulse">
      {Array.from({length: 12}).map((_, i) => <div key={i} className="h-28 bg-muted rounded-2xl"></div>)}
    </div>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {cats.map((cat, idx) => (
        <Link key={cat.id || idx} href={`/category/${cat.slug}`}>
          <motion.div 
            whileHover={{ y: -5, scale: 1.05 }}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-primary/20 hover:shadow-md",
              cat.color || "bg-muted/50"
            )}
            style={{ perspective: "1000px" }}
          >
            <span className="text-4xl mb-2 drop-shadow-sm">{cat.icon}</span>
            <span className="font-medium text-sm text-foreground text-center line-clamp-1">{cat.name}</span>
            <span className="font-bengali text-xs text-muted-foreground mt-0.5 text-center">{cat.nameBn}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

// --- Badge Component (Custom usage) ---
const Badge = ({ children, className, variant = 'default' }: any) => {
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", className)}>
      {children}
    </span>
  );
};

// --- Flash Sale Section ---
const FlashSale = () => {
  const { data, isLoading } = useGetProducts({ flashSale: true, limit: 5 });
  const [timeLeft, setTimeLeft] = useState({ h: 4, m: 35, s: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isLoading && (!data?.products || data.products.length === 0)) {
    return null; // Hide if no flash sale products
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 relative overflow-hidden text-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-red-500">⚡</span> Flash Sale
            </h2>
            <Badge className="bg-red-500 text-white border-0">Limited Stock</Badge>
          </div>
          <p className="font-bengali text-slate-300">ফ্ল্যাশ সেল - দ্রুত শেষ হচ্ছে!</p>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
          <span className="text-sm font-medium mr-2 text-slate-300">Ends in:</span>
          <div className="flex gap-2">
            <div className="bg-white text-black w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">{String(timeLeft.h).padStart(2, '0')}</div>
            <span className="text-xl font-bold self-center">:</span>
            <div className="bg-white text-black w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">{String(timeLeft.m).padStart(2, '0')}</div>
            <span className="text-xl font-bold self-center">:</span>
            <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg animate-pulse">{String(timeLeft.s).padStart(2, '0')}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 dark-theme-override">
        <ProductGrid products={data?.products} isLoading={isLoading} skeletonCount={5} />
      </div>
    </div>
  );
};

// --- Featured Brands ---
const FeaturedBrands = () => {
  const brands = ["Amul", "Mother Dairy", "Britannia", "Parle", "Fortune", "Aashirvaad", "Tata", "Real", "Bisk Farm", "Pepsi", "Coca Cola", "Dabur"];
  return (
    <div className="py-12 border-y border-border/50 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1440px] mb-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Trusted by Top Brands</p>
      </div>
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="animate-marquee flex whitespace-nowrap items-center gap-8 py-2">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="px-6 py-3 bg-card rounded-xl shadow-sm border border-border/50 font-bold text-lg text-foreground/80 hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Section Header ---
const SectionHeader = ({ title, titleBn, ctaText, ctaLink }: { title: string, titleBn: string, ctaText?: string, ctaLink?: string }) => (
  <div className="flex justify-between items-end mb-8">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{title}</h2>
      <p className="font-bengali text-muted-foreground">{titleBn}</p>
    </div>
    {ctaText && ctaLink && (
      <Link href={ctaLink}>
        <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold group hidden sm:flex">
          {ctaText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    )}
  </div>
);

// --- MAIN HOMEPAGE ---
export default function HomePage() {
  const { data: featuredData, isLoading: featuredLoading } = useGetProducts({ featured: true, limit: 10 });
  const { data: localData, isLoading: localLoading } = useGetProducts({ local: true, limit: 5 });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        
        {/* 1. Hero Section Split Layout */}
        <section className="grid lg:grid-cols-2 gap-8 items-start pt-4 pb-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              20 Min Delivery to Midnapore
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
              Fresh Groceries, <br/>
              Delivered in Minutes.
            </h1>
            
            <p className="text-xl md:text-2xl font-bengali text-muted-foreground border-l-4 border-primary pl-4 py-1">
              মাত্র ২০ মিনিটে আপনার দরজায় তাজা মুদিখানা
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/products?featured=true">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-muted transition-all">
                  Explore Offers
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { icon: <Users className="w-5 h-5" />, value: '30k+', label: 'Happy Families' },
                { icon: <LayoutGrid className="w-5 h-5" />, value: '500+', label: 'Fresh Products' },
                { icon: <Clock className="w-5 h-5" />, value: '20m', label: 'Avg. Delivery' },
                { icon: <Heart className="w-5 h-5" />, value: '4.9', label: 'App Rating', showStar: true },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4">
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <p className="text-2xl font-black text-foreground flex items-center gap-1">
                    {stat.value}
                    {stat.showStar && <Star className="w-4 h-4 fill-primary text-primary" />}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-lg font-bold text-foreground mb-4">Zogo Quality Promise</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {[
                  { icon: <Leaf className="w-5 h-5" />, label: 'Locally Sourced' },
                  { icon: <Hand className="w-5 h-5" />, label: 'Handpicked Freshness' },
                  { icon: <Lock className="w-5 h-5" />, label: 'Secure Payments' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-foreground text-sm max-w-[110px] leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4 w-full">
            <div className="relative h-[380px] lg:h-[440px] w-full">
              {/* Soft gradient background blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute top-1/4 right-1/4 w-[50%] h-[50%] bg-amber-400/20 blur-[80px] rounded-full pointer-events-none" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative z-10 w-[85%] h-[85%] rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-white"
                >
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=800&fit=crop" className="w-full h-full object-cover" alt="Fresh produce shelf" />
                </motion.div>

                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute top-4 left-2 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-border"
                >
                  <div className="bg-amber-100 p-2 rounded-lg text-2xl">🥭</div>
                  <div>
                    <p className="font-bold text-sm">Fresh Mango</p>
                    <p className="text-xs text-muted-foreground">₹120 / kg</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-4 right-2 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-border"
                >
                  <div className="bg-blue-100 p-2 rounded-lg text-2xl">🥛</div>
                  <div>
                    <p className="font-bold text-sm">Amul Taaza</p>
                    <p className="text-xs text-muted-foreground text-green-600 font-semibold">Delivered in 15m</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Category preview strip */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Exotic Fruits', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop' },
                { label: 'Organic Veggies', img: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&h=300&fit=crop' },
                { label: 'Dairy & Eggs', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop' },
                { label: 'Gourmet Pantry', img: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=300&h=300&fit=crop' },
              ].map((cat, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden aspect-square mb-2 bg-muted">
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <p className="text-xs font-semibold text-foreground text-center">{cat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Banner Slider */}
        <section>
          <HeroBannerSlider />
        </section>

        {/* 3. Quick Categories */}
        <section>
          <SectionHeader title="Shop by Category" titleBn="ক্যাটাগরি অনুযায়ী কেনাকাটা" ctaText="View All" ctaLink="/categories" />
          <QuickCategories />
        </section>

        {/* 4. Flash Sale */}
        <section>
          <FlashSale />
        </section>

        {/* 5. Today's Deals */}
        <section>
          <SectionHeader title="Today's Deals" titleBn="আজকের অফার" ctaText="See All Deals" ctaLink="/products?featured=true" />
          <ProductGrid products={featuredData?.products} isLoading={featuredLoading} skeletonCount={5} />
        </section>

        {/* 6. Midnapore Special */}
        <section className="bg-amber-50 dark:bg-amber-950/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-y border-amber-200/50 dark:border-amber-900/50">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-400 text-xs font-bold mb-3">
                  <MapPin size={14} /> LOCAL PRIDE
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-950 dark:text-amber-50 mb-1">Midnapore Special</h2>
                <p className="font-bengali text-amber-800/80 dark:text-amber-400/80">মেদিনীপুরের বিশেষ সংগ্রহ</p>
              </div>
              <Link href="/products?local=true">
                <Button variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100 hidden sm:flex">
                  View Local Store <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <ProductGrid products={localData?.products} isLoading={localLoading} skeletonCount={5} />
          </div>
        </section>

        {/* 7. Shop by Occasion */}
        <section>
          <SectionHeader title="Shop by Occasion" titleBn="অনুষ্ঠান অনুযায়ী কেনাকাটা" />
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
            {[
              { title: 'Durga Puja Specials', titleBn: 'দুর্গাপূজার বিশেষ', color: 'from-orange-500 to-red-600', icon: '🌺' },
              { title: 'Weekend BBQ', titleBn: 'উইকেন্ড বারবিকিউ', color: 'from-stone-700 to-stone-900', icon: '🔥' },
              { title: 'Poila Boishakh', titleBn: 'পয়লা বৈশাখ', color: 'from-amber-400 to-orange-500', icon: '🥘' },
              { title: 'Birthday Party', titleBn: 'জন্মদিনের আয়োজন', color: 'from-pink-500 to-rose-600', icon: '🎂' },
            ].map((occ, i) => (
              <div key={i} className={`flex-shrink-0 w-72 h-40 rounded-3xl bg-gradient-to-br ${occ.color} p-6 relative overflow-hidden group cursor-pointer snap-start`}>
                <div className="absolute -right-4 -bottom-4 text-7xl opacity-50 group-hover:scale-110 transition-transform">{occ.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-1 relative z-10">{occ.title}</h3>
                <p className="font-bengali text-white/90 relative z-10">{occ.titleBn}</p>
                <div className="absolute bottom-6 left-6 text-white text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={14}/>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Why Choose Us (Value Props) */}
        <section className="py-12">
          <SectionHeader title="Why Choose ZOGO" titleBn="কেন ZOGO বেছে নেবেন?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="w-8 h-8 text-primary"/>, title: '20 Min Delivery', titleBn: '২০ মিনিটে ডেলিভারি', desc: 'Get your order delivered to your doorstep in 20 minutes.' },
              { icon: <ShieldCheck className="w-8 h-8 text-primary"/>, title: '100% Fresh', titleBn: '১০০% তাজা পণ্য', desc: 'We guarantee the freshness of all our fruits and vegetables.' },
              { icon: <IndianRupee className="w-8 h-8 text-primary"/>, title: 'Lowest Prices', titleBn: 'সবচেয়ে কম দাম', desc: 'Enjoy wholesale prices on your daily groceries.' },
              { icon: <CreditCard className="w-8 h-8 text-primary"/>, title: 'Secure Payments', titleBn: 'নিরাপদ পেমেন্ট', desc: 'Pay via UPI, Cards, Wallets or Cash on Delivery.' },
              { icon: <Truck className="w-8 h-8 text-primary"/>, title: 'Free Delivery', titleBn: 'ফ্রি ডেলিভারি', desc: 'Free delivery on all orders above ₹499.' },
              { icon: <CheckCircle2 className="w-8 h-8 text-primary"/>, title: 'Easy Returns', titleBn: 'সহজ রিটার্ন', desc: 'No questions asked return policy at your doorstep.' },
            ].map((feat, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-3xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{feat.title}</h3>
                <p className="font-bengali text-sm text-primary mb-3">{feat.titleBn}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <FeaturedBrands />
      <Footer />
    </div>
  );
}