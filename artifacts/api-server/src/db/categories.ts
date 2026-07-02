export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  icon: string;
  image: string;
  color: string;
  gradient: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "cat-1", name: "Vegetables", nameBn: "সবজি", slug: "vegetables", icon: "🥬", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop", color: "#16A34A", gradient: "from-green-400 to-emerald-600", productCount: 28 },
  { id: "cat-2", name: "Fruits", nameBn: "ফল", slug: "fruits", icon: "🍎", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop", color: "#EF4444", gradient: "from-red-400 to-orange-500", productCount: 22 },
  { id: "cat-3", name: "Dairy & Milk", nameBn: "দুধ ও দুগ্ধজাত", slug: "dairy", icon: "🥛", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop", color: "#3B82F6", gradient: "from-blue-300 to-blue-500", productCount: 18 },
  { id: "cat-4", name: "Eggs", nameBn: "ডিম", slug: "eggs", icon: "🥚", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop", color: "#F59E0B", gradient: "from-yellow-300 to-amber-500", productCount: 6 },
  { id: "cat-5", name: "Fish", nameBn: "মাছ", slug: "fish", icon: "🐟", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&h=200&fit=crop", color: "#0EA5E9", gradient: "from-cyan-400 to-blue-600", productCount: 20 },
  { id: "cat-6", name: "Chicken", nameBn: "মুরগি", slug: "chicken", icon: "🍗", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop", color: "#F97316", gradient: "from-orange-300 to-red-500", productCount: 12 },
  { id: "cat-7", name: "Meat", nameBn: "মাংস", slug: "meat", icon: "🥩", image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=300&h=200&fit=crop", color: "#DC2626", gradient: "from-red-500 to-rose-700", productCount: 10 },
  { id: "cat-8", name: "Rice", nameBn: "চাল", slug: "rice", icon: "🌾", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=200&fit=crop", color: "#CA8A04", gradient: "from-yellow-400 to-amber-600", productCount: 15 },
  { id: "cat-9", name: "Dal & Pulses", nameBn: "ডাল", slug: "dal", icon: "🫘", image: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=300&h=200&fit=crop", color: "#92400E", gradient: "from-amber-500 to-orange-700", productCount: 16 },
  { id: "cat-10", name: "Oil", nameBn: "তেল", slug: "oil", icon: "🫙", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop", color: "#EAB308", gradient: "from-yellow-300 to-yellow-600", productCount: 14 },
  { id: "cat-11", name: "Spices", nameBn: "মশলা", slug: "spices", icon: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop", color: "#B91C1C", gradient: "from-red-400 to-rose-600", productCount: 22 },
  { id: "cat-12", name: "Biscuits", nameBn: "বিস্কুট", slug: "biscuits", icon: "🍪", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop", color: "#D97706", gradient: "from-amber-300 to-orange-500", productCount: 18 },
  { id: "cat-13", name: "Cold Drinks", nameBn: "ঠান্ডা পানীয়", slug: "cold-drinks", icon: "🥤", image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=300&h=200&fit=crop", color: "#7C3AED", gradient: "from-violet-400 to-purple-600", productCount: 20 },
  { id: "cat-14", name: "Snacks", nameBn: "স্ন্যাকস", slug: "snacks", icon: "🍟", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop", color: "#EA580C", gradient: "from-orange-400 to-red-500", productCount: 24 },
  { id: "cat-15", name: "Baby Care", nameBn: "শিশু সেবা", slug: "baby-care", icon: "👶", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop", color: "#EC4899", gradient: "from-pink-300 to-rose-500", productCount: 16 },
  { id: "cat-16", name: "Pet Food", nameBn: "পোষা প্রাণীর খাবার", slug: "pet-food", icon: "🐾", image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=200&fit=crop", color: "#78716C", gradient: "from-stone-400 to-stone-600", productCount: 8 },
  { id: "cat-17", name: "Frozen Foods", nameBn: "ফ্রোজেন ফুড", slug: "frozen-foods", icon: "🧊", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&h=200&fit=crop", color: "#0891B2", gradient: "from-cyan-300 to-sky-600", productCount: 10 },
  { id: "cat-18", name: "Personal Care", nameBn: "ব্যক্তিগত যত্ন", slug: "personal-care", icon: "🧴", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop", color: "#8B5CF6", gradient: "from-violet-300 to-purple-600", productCount: 22 },
  { id: "cat-19", name: "Cleaning", nameBn: "পরিষ্কার", slug: "cleaning", icon: "🧹", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&h=200&fit=crop", color: "#0D9488", gradient: "from-teal-400 to-cyan-600", productCount: 18 },
  { id: "cat-20", name: "Medicine (OTC)", nameBn: "ওষুধ (ওটিসি)", slug: "medicine", icon: "💊", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop", color: "#6366F1", gradient: "from-indigo-400 to-blue-600", productCount: 12 },
  { id: "cat-21", name: "Bakery & Atta", nameBn: "বেকারি ও আটা", slug: "bakery", icon: "🍞", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop", color: "#A16207", gradient: "from-yellow-500 to-amber-700", productCount: 14 },
  { id: "cat-22", name: "Sweets", nameBn: "মিষ্টি", slug: "sweets", icon: "🍬", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop", color: "#DB2777", gradient: "from-pink-400 to-rose-600", productCount: 12 },
  { id: "cat-23", name: "Tea & Coffee", nameBn: "চা ও কফি", slug: "tea-coffee", icon: "☕", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", color: "#92400E", gradient: "from-amber-600 to-brown-700", productCount: 16 },
  { id: "cat-24", name: "Stationery", nameBn: "স্টেশনারি", slug: "stationery", icon: "✏️", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop", color: "#4F46E5", gradient: "from-indigo-400 to-purple-600", productCount: 8 },
  { id: "cat-25", name: "Atta & Flour", nameBn: "আটা ও ময়দা", slug: "atta-flour", icon: "🫙", image: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=300&h=200&fit=crop", color: "#CA8A04", gradient: "from-yellow-300 to-amber-500", productCount: 10 },
  { id: "cat-26", name: "Salt & Sugar", nameBn: "লবণ ও চিনি", slug: "salt-sugar", icon: "🧂", image: "https://images.unsplash.com/photo-1558817904-af53dfda0f41?w=300&h=200&fit=crop", color: "#475569", gradient: "from-slate-300 to-slate-600", productCount: 8 },
];
