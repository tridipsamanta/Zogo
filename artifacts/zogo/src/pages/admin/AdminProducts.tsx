import React, { useState } from 'react';
import { useGetAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useGetCategories, Product } from '@workspace/api-client-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { Plus, Search, Edit2, Trash2, MoreHorizontal, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useGetAdminProducts({ search, page, limit: 10 });
  const { data: categories } = useGetCategories();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const defaultFormState = {
    name: '',
    nameBn: '',
    brand: '',
    category: '',
    categoryId: '',
    mrp: 0,
    price: 0,
    stock: 0,
    weight: '',
    unit: 'kg',
    description: '',
    images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop'],
    isFeatured: false,
    isFlashSale: false,
    isLocal: false
  };

  const [formData, setFormData] = useState(defaultFormState);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(defaultFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...defaultFormState,
      ...product,
      mrp: product.mrp,
      price: product.price,
      stock: product.stock,
      images: product.images?.length ? product.images : defaultFormState.images
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-derive category string from categoryId if needed
    const catStr = categories?.find(c => c.id === formData.categoryId)?.name || formData.category || 'General';

    const payload = {
      ...formData,
      category: catStr,
      mrp: Number(formData.mrp),
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    if (editingProduct) {
      updateProductMutation.mutate({ productId: editingProduct.id, data: payload }, {
        onSuccess: () => {
          toast({ title: "Product updated successfully" });
          setIsModalOpen(false);
          refetch();
        }
      });
    } else {
      createProductMutation.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Product created successfully" });
          setIsModalOpen(false);
          refetch();
        }
      });
    }
  };

  const handleDelete = () => {
    if (!productToDelete) return;
    deleteProductMutation.mutate({ productId: productToDelete }, {
      onSuccess: () => {
        toast({ title: "Product deleted successfully" });
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
        refetch();
      }
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your store catalog</p>
        </div>
        <Button onClick={openAddModal} className="rounded-xl h-12 px-6">
          <Plus className="mr-2 w-5 h-5" /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">Filter</Button>
            <Button variant="outline" className="w-full sm:w-auto">Export</Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading products...</td>
                </tr>
              ) : data?.products?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No products found.</td>
                </tr>
              ) : (
                data?.products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-border bg-background p-1 flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground mb-0.5 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand} • {product.weight} {product.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="font-normal">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground">{formatPrice(product.price)}</p>
                      {product.mrp > product.price && <p className="text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock <= 5 ? 'text-destructive' : 'text-green-600'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {product.isFeatured && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0 text-[10px]">Featured</Badge>}
                        {product.isFlashSale && <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 text-[10px]">Flash</Badge>}
                        {product.isLocal && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-0 text-[10px]">Local</Badge>}
                        {!product.isFeatured && !product.isFlashSale && !product.isLocal && <span className="text-muted-foreground">-</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="cursor-pointer" onClick={() => openEditModal(product)}>
                            <Edit2 size={14} className="mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => { setProductToDelete(product.id); setIsDeleteDialogOpen(true); }}>
                            <Trash2 size={14} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        {data?.totalPages && data.totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing page {data.page} of {data.totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= data.totalPages}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Name (English)</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Product Name (Bengali)</Label>
                <Input value={formData.nameBn} onChange={e => setFormData({...formData, nameBn: e.target.value})} className="font-bengali" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.categoryId} onValueChange={(v) => setFormData({...formData, categoryId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    {!categories?.length && <SelectItem value="general">General</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-border py-4 my-4">
              <div className="space-y-2">
                <Label>MRP (₹)</Label>
                <Input type="number" required min={0} value={formData.mrp} onChange={e => setFormData({...formData, mrp: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>Selling Price (₹)</Label>
                <Input type="number" required min={0} value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity</Label>
                <Input type="number" required min={0} value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight/Amount</Label>
                <Input required value={formData.weight} placeholder="e.g. 500, 1" onChange={e => setFormData({...formData, weight: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={formData.unit} onValueChange={(v) => setFormData({...formData, unit: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="pc">pc</SelectItem>
                    <SelectItem value="bunch">bunch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input 
                value={formData.images[0] || ''} 
                onChange={e => setFormData({...formData, images: [e.target.value]})} 
                placeholder="https://..."
              />
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" checked={formData.isFeatured} onCheckedChange={(checked) => setFormData({...formData, isFeatured: !!checked})} />
                <label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Featured Product
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="flash" checked={formData.isFlashSale} onCheckedChange={(checked) => setFormData({...formData, isFlashSale: !!checked})} />
                <label htmlFor="flash" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Flash Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="local" checked={formData.isLocal} onCheckedChange={(checked) => setFormData({...formData, isLocal: !!checked})} />
                <label htmlFor="local" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Local Special
                </label>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createProductMutation.isPending || updateProductMutation.isPending}>
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
