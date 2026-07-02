// Static data: banners, offers, coupons

export interface Banner {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  image: string;
  ctaText: string;
  ctaTextBn: string;
  ctaLink: string;
  badge: string;
  gradient: string;
  textColor: string;
}

export interface Offer {
  id: string;
  icon: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  gradient: string;
  badge: string;
  expiresAt: string | null;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "flat" | "percentage";
  minOrder: number;
  maxDiscount: number;
  description: string;
  isActive: boolean;
}

export const banners: Banner[] = [
  {
    id: "b1", title: "Fresh Groceries Delivered in Minutes", titleBn: "তাজা মুদিখানা মাত্র ২০ মিনিটে",
    subtitle: "Serving thousands of families across Midnapore with premium quality groceries",
    subtitleBn: "মেদিনীপুরের হাজার পরিবারের বিশ্বস্ত মুদিখানা",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop",
    ctaText: "Shop Now", ctaTextBn: "এখনই কিনুন", ctaLink: "/products", badge: "New Arrivals",
    gradient: "from-green-600/90 to-emerald-800/90", textColor: "white",
  },
  {
    id: "b2", title: "Today's Fresh Vegetables", titleBn: "আজকের তাজা সবজি",
    subtitle: "Locally sourced, farm-fresh vegetables delivered at your doorstep",
    subtitleBn: "স্থানীয় খামার থেকে সরাসরি আপনার দরজায়",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&h=500&fit=crop",
    ctaText: "Explore Now", ctaTextBn: "দেখুন", ctaLink: "/category/vegetables", badge: "Daily Fresh",
    gradient: "from-green-500/80 to-lime-700/80", textColor: "white",
  },
  {
    id: "b3", title: "Weekend Mega Sale", titleBn: "সপ্তাহান্তের মেগা সেল",
    subtitle: "Save up to 50% on selected products this weekend only",
    subtitleBn: "নির্বাচিত পণ্যে ৫০% পর্যন্ত ছাড়",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
    ctaText: "Grab Deals", ctaTextBn: "অফার নিন", ctaLink: "/products?sort=discount", badge: "50% OFF",
    gradient: "from-orange-500/85 to-red-700/85", textColor: "white",
  },
  {
    id: "b4", title: "Midnapore Special Collection", titleBn: "মেদিনীপুরের বিশেষ সংগ্রহ",
    subtitle: "Gobindobhog Rice, Fresh Hilsa, Local Sweets — celebrating local produce",
    subtitleBn: "গোবিন্দভোগ চাল, ইলিশ মাছ, দেশীয় মিষ্টি — স্থানীয় পণ্যের উৎসব",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&h=500&fit=crop",
    ctaText: "Local Products", ctaTextBn: "স্থানীয় পণ্য", ctaLink: "/products?local=true", badge: "Local Pride",
    gradient: "from-amber-600/85 to-yellow-800/85", textColor: "white",
  },
  {
    id: "b5", title: "Fresh Fish Festival", titleBn: "মাছের বিশেষ উৎসব",
    subtitle: "Fresh Hilsa, Rohu, Katla — catch of the day from Midnapore Fish Market",
    subtitleBn: "তাজা ইলিশ, রুই, কাতলা — মেদিনীপুর মাছবাজারের সেরা মাছ",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1200&h=500&fit=crop",
    ctaText: "Buy Fresh Fish", ctaTextBn: "মাছ কিনুন", ctaLink: "/category/fish", badge: "Daily Catch",
    gradient: "from-blue-600/85 to-cyan-800/85", textColor: "white",
  },
  {
    id: "b6", title: "First Order Free Delivery", titleBn: "প্রথম অর্ডারে ফ্রি ডেলিভারি",
    subtitle: "New to ZOGO? Get ₹100 OFF and free delivery on your first order",
    subtitleBn: "ZOGO-তে নতুন? প্রথম অর্ডারে ₹১০০ ছাড় এবং ফ্রি ডেলিভারি",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
    ctaText: "Order Now", ctaTextBn: "এখনই অর্ডার", ctaLink: "/signup", badge: "FIRST100",
    gradient: "from-violet-600/85 to-purple-800/85", textColor: "white",
  },
  {
    id: "b7", title: "Premium Fruits Delivered", titleBn: "প্রিমিয়াম ফল সরাসরি বাড়িতে",
    subtitle: "Kashmir apples, Alphonso mangoes and seasonal fruits at best prices",
    subtitleBn: "কাশ্মীরি আপেল, আলফানসো আম এবং মৌসুমী ফল সেরা দামে",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=500&fit=crop",
    ctaText: "Buy Fruits", ctaTextBn: "ফল কিনুন", ctaLink: "/category/fruits", badge: "Premium",
    gradient: "from-red-500/80 to-pink-700/80", textColor: "white",
  },
  {
    id: "b8", title: "Monsoon Special Offers", titleBn: "বর্ষার বিশেষ অফার",
    subtitle: "Monsoon is here! Extra discounts on vegetables, fish and essentials",
    subtitleBn: "বর্ষা এসেছে! সবজি, মাছ এবং প্রয়োজনীয় পণ্যে অতিরিক্ত ছাড়",
    image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200&h=500&fit=crop",
    ctaText: "Monsoon Deals", ctaTextBn: "বর্ষার অফার", ctaLink: "/products", badge: "Monsoon Sale",
    gradient: "from-teal-600/85 to-cyan-800/85", textColor: "white",
  },
];

export const offers: Offer[] = [
  { id: "off-1", icon: "🔥", title: "Flat 50% OFF", titleBn: "সরাসরি ৫০% ছাড়", description: "On selected products", descriptionBn: "নির্বাচিত পণ্যে", gradient: "from-red-500 to-orange-600", badge: "HOT", expiresAt: null },
  { id: "off-2", icon: "🚚", title: "Free Delivery Above ₹499", titleBn: "₹৪৯৯-এর বেশি কেনায় ফ্রি ডেলিভারি", description: "No minimum charge", descriptionBn: "কোনো ডেলিভারি চার্জ নেই", gradient: "from-green-500 to-emerald-600", badge: "FREE", expiresAt: null },
  { id: "off-3", icon: "🎉", title: "First Order ₹100 OFF", titleBn: "প্রথম অর্ডারে ₹১০০ ছাড়", description: "Use code FIRST100", descriptionBn: "কোড ব্যবহার করুন FIRST100", gradient: "from-violet-500 to-purple-600", badge: "NEW", expiresAt: null },
  { id: "off-4", icon: "⚡", title: "20 Minute Delivery", titleBn: "মাত্র ২০ মিনিটে ডেলিভারি", description: "Lightning fast service", descriptionBn: "দ্রুততম সেবা", gradient: "from-amber-500 to-yellow-600", badge: "FAST", expiresAt: null },
  { id: "off-5", icon: "🥬", title: "Fresh Vegetables Daily", titleBn: "প্রতিদিন তাজা সবজি", description: "Harvested fresh every morning", descriptionBn: "প্রতিদিন সকালে তোলা", gradient: "from-green-400 to-lime-600", badge: "FRESH", expiresAt: null },
  { id: "off-6", icon: "🐟", title: "Fresh Fish Arrived", titleBn: "আজকের টাটকা মাছ এসেছে", description: "From Midnapore Fish Market", descriptionBn: "মেদিনীপুর মাছবাজার থেকে", gradient: "from-blue-500 to-cyan-600", badge: "TODAY", expiresAt: null },
  { id: "off-7", icon: "🍗", title: "Premium Chicken Today", titleBn: "আজকের সেরা মুরগি", description: "Fresh dressed chicken available", descriptionBn: "তাজা মুরগি পাওয়া যাচ্ছে", gradient: "from-orange-400 to-red-500", badge: "FRESH", expiresAt: null },
  { id: "off-8", icon: "🥛", title: "Fresh Milk Every Morning", titleBn: "প্রতি সকালে তাজা দুধ", description: "Amul & Mother Dairy fresh", descriptionBn: "অমুল ও মাদার ডেইরি তাজা", gradient: "from-blue-300 to-blue-500", badge: "DAILY", expiresAt: null },
  { id: "off-9", icon: "🛒", title: "Weekend Mega Sale", titleBn: "সপ্তাহান্তের মেগা সেল", description: "Extra 20% off on weekends", descriptionBn: "সপ্তাহান্তে অতিরিক্ত ২০% ছাড়", gradient: "from-purple-500 to-pink-600", badge: "WEEKEND", expiresAt: null },
  { id: "off-10", icon: "🌾", title: "Midnapore Special Rice", titleBn: "মেদিনীপুরের সেরা গোবিন্দভোগ চাল", description: "Authentic Gobindobhog rice", descriptionBn: "আসল গোবিন্দভোগ চাল", gradient: "from-amber-400 to-yellow-600", badge: "LOCAL", expiresAt: null },
  { id: "off-11", icon: "🎁", title: "Buy 2 Get 1 Free", titleBn: "দুটি কিনলে একটি ফ্রি পাবেন", description: "On selected items", descriptionBn: "নির্বাচিত পণ্যে", gradient: "from-pink-500 to-rose-600", badge: "B2G1", expiresAt: null },
  { id: "off-12", icon: "💳", title: "Extra 10% OFF on UPI", titleBn: "UPI পেমেন্টে অতিরিক্ত ১০% ছাড়", description: "Pay with any UPI app", descriptionBn: "যেকোনো UPI অ্যাপে পেমেন্ট করুন", gradient: "from-indigo-500 to-blue-600", badge: "UPI", expiresAt: null },
  { id: "off-13", icon: "🎊", title: "Durga Puja Special", titleBn: "দুর্গাপূজার বিশেষ অফার", description: "Festival discounts are live", descriptionBn: "পূজার বিশেষ ছাড় চলছে", gradient: "from-amber-600 to-orange-700", badge: "PUJA", expiresAt: null },
  { id: "off-14", icon: "🎉", title: "Poila Boishakh Offers", titleBn: "পয়লা বৈশাখ স্পেশাল", description: "Celebrate the Bengali New Year", descriptionBn: "বাংলা নববর্ষের উৎসব", gradient: "from-red-400 to-orange-500", badge: "NABABARSHA", expiresAt: null },
  { id: "off-15", icon: "💚", title: "Trusted by 30,000+ Families", titleBn: "৩০,০০০+ পরিবারের বিশ্বাস", description: "Midnapore's #1 grocery app", descriptionBn: "মেদিনীপুরের এক নম্বর গ্রোসারি অ্যাপ", gradient: "from-green-600 to-teal-700", badge: "TRUSTED", expiresAt: null },
  { id: "off-16", icon: "🍎", title: "Fresh Fruits Every Day", titleBn: "প্রতিদিন তাজা ফল", description: "Seasonal and imported fruits", descriptionBn: "দেশি এবং বিদেশি ফল", gradient: "from-red-400 to-pink-600", badge: "FRESH", expiresAt: null },
  { id: "off-17", icon: "☕", title: "Morning Chai Essentials", titleBn: "সকালের চায়ের সব কিছু", description: "Tea, milk, biscuits at best price", descriptionBn: "চা, দুধ, বিস্কুট সেরা দামে", gradient: "from-amber-700 to-brown-800", badge: "MORNING", expiresAt: null },
  { id: "off-18", icon: "🌿", title: "Organic Products Available", titleBn: "অর্গানিক পণ্য পাওয়া যাচ্ছে", description: "Pure and natural products", descriptionBn: "বিশুদ্ধ ও প্রাকৃতিক পণ্য", gradient: "from-green-500 to-lime-600", badge: "ORGANIC", expiresAt: null },
  { id: "off-19", icon: "🏠", title: "Home Delivery Available", titleBn: "হোম ডেলিভারি পাওয়া যাচ্ছে", description: "To all Midnapore locations", descriptionBn: "সমগ্র মেদিনীপুরে", gradient: "from-blue-400 to-indigo-600", badge: "DELIVERY", expiresAt: null },
  { id: "off-20", icon: "💰", title: "Best Prices Guaranteed", titleBn: "সেরা দাম নিশ্চিত", description: "We match any lower price", descriptionBn: "আমরা যেকোনো কম দামের সাথে মিলিয়ে দিই", gradient: "from-yellow-500 to-amber-700", badge: "BEST PRICE", expiresAt: null },
];

export const coupons: Coupon[] = [
  { id: "c1", code: "FIRST100", discount: 100, type: "flat", minOrder: 299, maxDiscount: 100, description: "₹100 off on your first order", isActive: true },
  { id: "c2", code: "ZOGO20", discount: 20, type: "percentage", minOrder: 499, maxDiscount: 150, description: "20% off on orders above ₹499", isActive: true },
  { id: "c3", code: "PUJA50", discount: 50, type: "flat", minOrder: 399, maxDiscount: 50, description: "₹50 off on Puja special orders", isActive: true },
  { id: "c4", code: "FRESHVEG", discount: 15, type: "percentage", minOrder: 199, maxDiscount: 75, description: "15% off on vegetables & fruits", isActive: true },
  { id: "c5", code: "UPI10", discount: 10, type: "percentage", minOrder: 299, maxDiscount: 100, description: "Extra 10% off on UPI payment", isActive: true },
  { id: "c6", code: "WEEKEND30", discount: 30, type: "flat", minOrder: 499, maxDiscount: 30, description: "₹30 off on weekend orders", isActive: true },
];
