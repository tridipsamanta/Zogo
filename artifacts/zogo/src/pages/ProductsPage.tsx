import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useGetProducts, useGetCategories } from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ProductsPage() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  // State for filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  
  // Mobile filter drawer state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Queries
  const { data: categoriesData } = useGetCategories();
  const { data: productsData, isLoading } = useGetProducts({
    category,
    search,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
    sort,
    limit: 20
  });

  const handleApplyFilters = () => {
    // In a real app, we'd update the URL search params here
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setCategory('');
    setSearch('');
    setPriceRange([0, 2000]);
    setSort('');
  };

  const hasActiveFilters = category || search || priceRange[0] > 0 || priceRange[1] < 2000;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-8">
        
        {/* Header & Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Products</h1>
            <p className="font-bengali text-muted-foreground mt-1">সব পণ্য</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Input 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-muted/50 border-border"
              />
            </div>
            
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[140px] hidden md:flex bg-muted/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="md:hidden flex-shrink-0"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className={cn(
            "w-full md:w-64 flex-shrink-0 space-y-6",
            isMobileFiltersOpen ? "block" : "hidden md:block"
          )}>
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-destructive font-medium hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <Collapsible defaultOpen className="mb-6 border-b border-border pb-6">
                <CollapsibleTrigger className="flex justify-between items-center w-full font-medium mb-3">
                  Categories <ChevronDown size={16} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pt-2">
                  <div 
                    className={cn(
                      "flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors",
                      category === '' ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    )}
                    onClick={() => setCategory('')}
                  >
                    <span>All Products</span>
                  </div>
                  {categoriesData?.map(cat => (
                    <div 
                      key={cat.id}
                      className={cn(
                        "flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors",
                        category === cat.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                      )}
                      onClick={() => setCategory(cat.slug)}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Price Filter */}
              <Collapsible defaultOpen className="mb-6">
                <CollapsibleTrigger className="flex justify-between items-center w-full font-medium mb-4">
                  Price Range <ChevronDown size={16} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-2 pt-4 pb-2">
                    <Slider
                      defaultValue={[0, 2000]}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="bg-muted px-3 py-1.5 rounded-lg text-sm flex-1 text-center font-medium">
                        ₹{priceRange[0]}
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="bg-muted px-3 py-1.5 rounded-lg text-sm flex-1 text-center font-medium">
                        ₹{priceRange[1]}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {isMobileFiltersOpen && (
                <Button className="w-full mt-4" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category && (
                  <Badge variant="secondary" className="px-3 py-1 rounded-full gap-1">
                    Category: {categoriesData?.find(c => c.slug === category)?.name || category}
                    <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setCategory('')} />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <Badge variant="secondary" className="px-3 py-1 rounded-full gap-1">
                    Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                    <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setPriceRange([0, 2000])} />
                  </Badge>
                )}
                {search && (
                  <Badge variant="secondary" className="px-3 py-1 rounded-full gap-1">
                    Search: "{search}"
                    <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setSearch('')} />
                  </Badge>
                )}
              </div>
            )}

            {/* Grid */}
            <ProductGrid 
              products={productsData?.products} 
              isLoading={isLoading} 
              skeletonCount={12}
            />

            {/* Pagination placeholder */}
            {!isLoading && productsData?.totalPages && productsData.totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="outline" className="bg-primary text-primary-foreground">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
