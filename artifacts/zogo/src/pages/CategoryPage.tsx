import React from 'react';
import { useRoute } from 'wouter';
import { useGetProducts, useGetCategories } from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function CategoryPage() {
  const [match, params] = useRoute('/category/:slug');
  const slug = params?.slug || '';

  const { data: categoriesData } = useGetCategories();
  const category = categoriesData?.find(c => c.slug === slug);

  const { data: productsData, isLoading } = useGetProducts({ 
    category: slug,
    limit: 20
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Category Hero Banner */}
      <div className={`w-full py-12 md:py-16 ${category?.color || 'bg-primary/10'}`}>
        <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center text-center">
          <div className="text-6xl md:text-8xl mb-4 drop-shadow-md">{category?.icon || '🛍️'}</div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            {category?.name || slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          {category?.nameBn && (
            <h2 className="text-2xl font-bengali text-foreground/80 mb-6">{category.nameBn}</h2>
          )}
          
          <div className="flex items-center text-sm font-medium text-foreground/70 bg-background/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-1" />
            <span>Categories</span>
            <ChevronRight size={14} className="mx-1" />
            <span className="text-foreground">{category?.name || slug}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-muted-foreground">
            Showing <span className="font-bold text-foreground">{productsData?.products?.length || 0}</span> products
          </p>
          {/* We could add sort dropdown here */}
        </div>

        <ProductGrid 
          products={productsData?.products} 
          isLoading={isLoading} 
          skeletonCount={10} 
        />
      </main>

      <Footer />
    </div>
  );
}
