import React, { useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { 
  useGetProduct, 
  useGetRelatedProducts, 
  useAddToCart,
  useAddToWishlist 
} from '@workspace/api-client-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn, formatPrice } from '@/lib/utils';
import { 
  Minus, Plus, ShoppingCart, Heart, Star, Truck, ShieldCheck, 
  Clock, Share2, IndianRupee, MapPin 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const [match, params] = useRoute('/products/:id');
  const productId = params?.id || '';
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: { enabled: !!productId }
  });

  const { data: relatedProducts } = useGetRelatedProducts(productId, {
    query: { enabled: !!productId }
  });

  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setLocation('/login');
      return;
    }

    addToCartMutation.mutate({
      data: { productId, quantity }
    }, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: `${quantity}x ${product?.name} added to your cart.`,
        });
      }
    });
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      setLocation('/login');
      return;
    }

    addToWishlistMutation.mutate({
      data: { productId }
    }, {
      onSuccess: () => {
        toast({
          title: "Saved to wishlist",
          description: `${product?.name} saved for later.`,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-8">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-muted rounded-3xl"></div>
            <div className="space-y-6 pt-4">
              <div className="h-10 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-12 bg-muted rounded w-1/4 mt-8"></div>
              <div className="h-32 bg-muted rounded w-full mt-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => setLocation('/products')}>Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [
    `https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=800&fit=crop`
  ];

  const isDiscounted = product.discount > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-[1440px] py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.categoryId}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-white rounded-3xl border border-border overflow-hidden flex items-center justify-center p-8 group">
              {isDiscounted && (
                <Badge variant="destructive" className="absolute top-4 left-4 z-10 text-sm px-3 py-1 shadow-md">
                  {product.discount}% OFF
                </Badge>
              )}
              {product.isLocal && (
                <Badge variant="outline" className="absolute top-4 right-4 z-10 bg-amber-50 text-amber-600 border-amber-200">
                  Local Special
                </Badge>
              )}
              
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 origin-center"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-white",
                      activeImage === idx ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
              {product.name}
            </h1>
            
            {product.nameBn && (
              <h2 className="text-xl font-bengali text-muted-foreground mb-4">
                {product.nameBn}
              </h2>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="font-bold text-amber-700">{product.rating}</span>
                <span className="text-amber-600/70 text-sm ml-1">({product.reviewCount})</span>
              </div>
              <span className="text-muted-foreground text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" /> Delivery in {product.deliveryTime || "20 mins"}
              </span>
            </div>

            <div className="border-y border-border py-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <div className="text-4xl font-black text-foreground flex items-center tracking-tight">
                  <IndianRupee className="w-8 h-8 mr-1" />{product.price}
                </div>
                {isDiscounted && (
                  <div className="text-xl text-muted-foreground line-through flex items-center mb-1">
                    <IndianRupee className="w-4 h-4 mr-0.5" />{product.mrp}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Inclusive of all taxes. Unit: {product.weight} {product.unit}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border-2 border-border rounded-xl h-14 bg-background">
                <button 
                  className="w-14 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <div className="w-12 text-center font-bold text-lg">{quantity}</div>
                <button 
                  className="w-14 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={20} />
                </button>
              </div>

              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> 
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>

              <Button 
                size="icon" 
                variant="outline" 
                className="h-14 w-14 rounded-xl border-2 flex-shrink-0"
                onClick={handleWishlist}
              >
                <Heart className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary"><Truck size={18} /></div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground leading-none mb-1">Superfast</p>
                  <p className="text-muted-foreground text-xs leading-none">20 min delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary"><ShieldCheck size={18} /></div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground leading-none mb-1">Freshness</p>
                  <p className="text-muted-foreground text-xs leading-none">100% Guaranteed</p>
                </div>
              </div>
            </div>
            
            {/* Delivery Location Check */}
            <div className="mt-6 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl">
              <MapPin className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Delivery to Midnapore</p>
                <p className="text-xs text-blue-700/80 dark:text-blue-300 mt-1">Item is available for express delivery to your location.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Details */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full max-w-4xl">
            <TabsList className="w-full justify-start h-auto bg-transparent border-b border-border rounded-none p-0">
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-base">Product Details</TabsTrigger>
              <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-base">Description</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3 text-base">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                <div className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground font-medium">Brand</span>
                  <span className="w-2/3 text-foreground font-semibold">{product.brand}</span>
                </div>
                <div className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground font-medium">Category</span>
                  <span className="w-2/3 text-foreground font-semibold">{product.category}</span>
                </div>
                <div className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground font-medium">Weight/Unit</span>
                  <span className="w-2/3 text-foreground font-semibold">{product.weight} {product.unit}</span>
                </div>
                <div className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground font-medium">Shelf Life</span>
                  <span className="w-2/3 text-foreground font-semibold">Refer to packaging</span>
                </div>
                <div className="flex border-b border-border pb-2">
                  <span className="w-1/3 text-muted-foreground font-medium">Sourced From</span>
                  <span className="w-2/3 text-foreground font-semibold">Local Midnapore Farms / Dist</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p>{product.description || "Fresh and premium quality product delivered to your doorstep in minutes. ZOGO guarantees the best quality and lowest prices for all your daily needs."}</p>
                <p className="font-bengali mt-4">উন্নত মানের তাজা পণ্য মাত্র কয়েক মিনিটে আপনার ঠিকানায়। ZOGO আপনার প্রতিদিনের প্রয়োজনে দিচ্ছে সেরা গুণমান এবং সবচেয়ে কম দামের নিশ্চয়তা।</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="text-center py-10 bg-muted/30 rounded-2xl">
                <p className="text-muted-foreground">Reviews will be visible here. Be the first to review this product after purchase!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
            <ProductGrid products={relatedProducts} skeletonCount={5} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
