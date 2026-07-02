import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Plus, Minus, Star, Clock, IndianRupee, Check } from 'lucide-react';
import {
  Product,
  useAddToCart,
  useUpdateCartItem,
  useAddToWishlist,
  useRemoveFromWishlist,
  useGetWishlist,
  getGetCartQueryKey,
  getGetWishlistQueryKey,
} from '@workspace/api-client-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { cart } = useCart();

  // Find current quantity of this product in cart
  const cartItem = cart?.items?.find((i: any) => i.productId === product.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const addToCartMutation = useAddToCart();
  const updateCartItemMutation = useUpdateCartItem();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Check wishlist state
  const { data: wishlist } = useGetWishlist({ query: { queryKey: getGetWishlistQueryKey(), enabled: isLoggedIn } });
  const isWishlisted = wishlist?.some((p: any) => p.id === product.id) ?? false;

  // Invalidate cart query after mutation
  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast({ title: 'Login required', description: 'Please login to add items to cart.', variant: 'destructive' });
      setLocation('/login');
      return;
    }

    addToCartMutation.mutate(
      { data: { productId: product.id, quantity: 1 } },
      {
        onSuccess: () => {
          invalidateCart();
          toast({ title: '✓ Added to cart', description: `${product.name} added.` });
        },
        onError: (err: any) => {
          toast({ title: 'Error', description: err?.data?.error || 'Could not add item.', variant: 'destructive' });
        },
      }
    );
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartItemMutation.mutate(
      { productId: product.id, data: { quantity: quantityInCart + 1 } },
      { onSuccess: invalidateCart }
    );
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartItemMutation.mutate(
      { productId: product.id, data: { quantity: quantityInCart - 1 } },
      { onSuccess: invalidateCart }
    );
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setLocation('/login');
      return;
    }

    if (isWishlisted) {
      removeFromWishlistMutation.mutate(
        { productId: product.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey() });
            toast({ title: '♡ Removed from wishlist' });
          },
        }
      );
    } else {
      addToWishlistMutation.mutate(
        { data: { productId: product.id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey() });
            toast({ title: '♥ Saved to wishlist', description: `${product.name} saved.` });
          },
        }
      );
    }
  };

  const isDiscounted = product.discount > 0;
  const deliveryTime = product.deliveryTime || '20 mins';
  const outOfStock = product.stock === 0;

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {isDiscounted && (
            <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 font-bold shadow-sm">
              {product.discount}% OFF
            </Badge>
          )}
          {product.isFlashSale && (
            <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-sm">
              Flash Sale
            </Badge>
          )}
          {product.isLocal && (
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-amber-600 border-amber-200 font-semibold shadow-sm">
              Local Special
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          onClick={handleWishlist}
          whileTap={{ scale: 0.85 }}
          className={cn(
            'absolute top-3 right-3 z-10 p-2 backdrop-blur-sm rounded-full transition-all duration-300 shadow-sm',
            isWishlisted
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/80 dark:bg-black/50 text-muted-foreground hover:text-red-500 hover:bg-white dark:hover:bg-black'
          )}
        >
          <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
        </motion.button>

        {/* Image Container */}
        <div className="relative pt-[100%] w-full bg-muted/20 overflow-hidden">
          <img
            src={product.images[0] || `https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop`}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {outOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-sm px-3 py-1 rounded-full bg-black/60">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Meta Info */}
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-medium text-primary/80 bg-primary/10 px-2 py-0.5 rounded-sm">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{deliveryTime}</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-0.5 flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.nameBn && (
              <p className="font-bengali text-xs text-muted-foreground line-clamp-1">
                {product.nameBn}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {product.weight} {product.unit}
            </p>
          </div>

          {/* Price & Cart Action Row */}
          <div className="flex items-end justify-between mt-auto pt-2">
            <div className="space-y-0.5">
              {isDiscounted && (
                <div className="text-xs text-muted-foreground line-through flex items-center">
                  <IndianRupee size={10} />
                  {product.mrp}
                </div>
              )}
              <div className="font-bold text-lg text-foreground flex items-center leading-none">
                <IndianRupee size={14} className="mr-0.5" />
                {product.price}
              </div>
            </div>

            {/* Cart Controls */}
            {!outOfStock && (
              quantityInCart > 0 ? (
                // Quantity incrementer
                <div
                  className="flex items-center bg-primary rounded-xl overflow-hidden h-9"
                  onClick={e => e.preventDefault()}
                >
                  <button
                    className="w-9 h-full flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                    onClick={handleDecrement}
                    disabled={updateCartItemMutation.isPending}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-white text-sm">{quantityInCart}</span>
                  <button
                    className="w-9 h-full flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                    onClick={handleIncrement}
                    disabled={updateCartItemMutation.isPending || quantityInCart >= product.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ) : (
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-xl shadow-sm hover:scale-110 transition-transform"
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                >
                  {addToCartMutation.isPending ? (
                    <Check size={16} className="animate-pulse" />
                  ) : (
                    <Plus size={18} />
                  )}
                </Button>
              )
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
