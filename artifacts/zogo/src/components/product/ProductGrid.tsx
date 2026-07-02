import React from 'react';
import { Product } from '@workspace/api-client-react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
  emptyMessageBn?: string;
}

export default function ProductGrid({ 
  products, 
  isLoading, 
  skeletonCount = 8,
  emptyMessage = "No products found",
  emptyMessageBn = "কোন পণ্য পাওয়া যায়নি"
}: ProductGridProps) {
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-muted/20 rounded-3xl border border-dashed border-border">
        <div className="w-24 h-24 mb-6 text-muted-foreground opacity-50 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{emptyMessage}</h3>
        <p className="font-bengali text-muted-foreground">{emptyMessageBn}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
