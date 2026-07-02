import React from 'react';
import { useGetOffers } from '@workspace/api-client-react';

export default function AnnouncementBar() {
  const { data: offers } = useGetOffers();

  // 30 custom premium offers
  const displayOffers = [
    { title: 'Free Delivery Above ₹499', titleBn: '₹৪৯৯-এর বেশি কেনাকাটায় ফ্রি ডেলিভারি', icon: '🚚' },
    { title: 'Flat 30% OFF', titleBn: 'আজকের বিশেষ ছাড়', icon: '🔥' },
    { title: 'Buy 2 Get 1 Free', titleBn: '২ কিনলে ১টি ফ্রি', icon: '🎁' },
    { title: '20 Minute Delivery', titleBn: '২০ মিনিটে ডেলিভারি', icon: '⚡' },
    { title: 'First Order ₹100 OFF', titleBn: 'প্রথম অর্ডারে ₹১০০ ছাড়', icon: '🎉' },
    { title: 'Local Specials', titleBn: 'মেদিনীপুরের সেরা চাল', icon: '🌾' },
    { title: 'Fresh Fish Deal', titleBn: 'নদীর তাজা ইলিশ ও রুই', icon: '🐟' },
    { title: 'Organic Vegs', titleBn: 'সরাসরি খামার থেকে সবজি', icon: '🥬' },
    { title: 'Sweet Bonanza', titleBn: 'বাঙালি মিষ্টির মেগা কালেকশন', icon: '🧁' },
    { title: 'Safe Grocery Guarantee', titleBn: '১০০% হাইজেনিক ডেলিভারি', icon: '🛡️' },
    { title: 'Kashmiri Apples Spec', titleBn: 'তাজা কাশ্মীরি আপেল', icon: '🍎' },
    { title: 'Dairy & Milks Pack', titleBn: 'খাঁটি গরুর দুধ ও পনির', icon: '🥛' },
    { title: 'Broiler chicken Deal', titleBn: 'তাজা কাটা দেশি মুরগি', icon: '🍗' },
    { title: 'Pure Mustard Oil', titleBn: '১০০% খাঁটি ঘানির তেল', icon: '🧉' },
    { title: 'Spicy Chili Deal', titleBn: 'মেদিনীপুরের ঝাল লঙ্কা', icon: '🌶️' },
    { title: 'Egg Carton Sale', titleBn: 'ফার্ম ফ্রেশ ডিমের বক্স', icon: '🥚' },
    { title: 'Clean Home Sale', titleBn: 'ডিসইনফেক্ট্যান্ট লিকুইড অফার', icon: '🧼' },
    { title: 'Tea Leaves Offer', titleBn: 'আসাম গোল্ড প্রিমিয়াম চা', icon: '☕' },
    { title: 'Mega Biscuits Pack', titleBn: 'মেগা ড্রাই ফ্রুট কুকিজ', icon: '🍪' },
    { title: 'Clean & Shine Deal', titleBn: 'ডিটক্সিফাইং ফেসওয়াশ অফার', icon: '🧴' },
    { title: 'Goat Meat Deal', titleBn: 'কচি পাঁঠার তাজা মাংস', icon: '🥩' },
    { title: 'Carrot Delight', titleBn: 'লোকাল লাল তাজা গাজর', icon: '🥕' },
    { title: 'Paneer Premium', titleBn: 'অমুল ফ্রেশ ক্রিম পনির', icon: '🧀' },
    { title: 'Red Potato Deal', titleBn: 'দেশি নতুন লাল আলু', icon: '🥔' },
    { title: 'Mixed Fruit Juice', titleBn: 'ফলের ফ্রেশ মিক্সড জুস', icon: '🍹' },
    { title: 'Eco Friendly Bags', titleBn: 'ইকো ফ্রেন্ডলি পাটের ব্যাগ', icon: '🧺' },
    { title: 'Rupchanda Fish Deal', titleBn: 'তাজা রূপচাঁদা মাছের অফার', icon: '🐟' },
    { title: 'Card Discount 10%', titleBn: 'কার্ড পেমেন্টে ১০% ডিসকাউন্ট', icon: '💳' },
    { title: 'Coconut Water Deal', titleBn: 'কচি ডাবের জল অফার', icon: '🥥' },
    { title: 'Spices Wholesale', titleBn: 'গোটা গরম মসলা প্যাক', icon: '🌶️' }
  ];

  // Repeat list to create continuous scrolling effect
  const marqueeOffers = [...displayOffers, ...displayOffers];

  return (
    <div className="bg-[#FAF6EF] dark:bg-slate-900 overflow-hidden py-3 border-b border-slate-200/50 dark:border-slate-800/50 select-none relative z-50">
      <div className="inline-flex animate-marquee hover:[animation-play-state:paused] items-center gap-6 px-4 w-max whitespace-nowrap">
        {marqueeOffers.map((offer, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center p-[1px] bg-gradient-to-r from-emerald-500/20 via-amber-400/20 to-emerald-500/20 rounded-full hover:from-emerald-500/40 hover:via-amber-400/40 hover:to-emerald-500/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100/50 dark:border-slate-700/50">
              <span className="text-sm">{offer.icon}</span>
              <span>{offer.title}</span>
              <span className="text-slate-350 dark:text-slate-650">•</span>
              <span className="font-bengali font-normal text-slate-500 dark:text-slate-400">{offer.titleBn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
