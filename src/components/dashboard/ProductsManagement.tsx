import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Image from 'next/image';

const ProductsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  type Product = {
    id: number | string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: string;
    image: string;
  };

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Professional Makeup Kit',
      category: 'Makeup',
      price: '$299',
      stock: 15,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop'
    },
    {
      id: 2, 
      name: 'Nail Art Brush Set',
      category: 'Nail Care',
      price: '$89',
      stock: 25,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Eyelash Extension Kit',
      category: 'Lashes',
      price: '$149',
      stock: 8,
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=100&h=100&fit=crop'
    }
  ]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: number | string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-md:p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Products Management</h1>
          <p className="text-muted-foreground">Manage your beauty products inventory</p>
        </div>
        <button 
          onClick={() => {setShowForm(true); setEditingProduct(null);}}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-[var(--radius)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/5 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Product</th>
                <th className="text-left p-4 font-medium text-foreground">Category</th>
                <th className="text-left p-4 font-medium text-foreground">Price</th>
                <th className="text-left p-4 font-medium text-foreground">Stock</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-accent/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-[var(--radius)] object-cover"
                        width={100}
                        height={100}
                      />
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.category}</td>
                  <td className="p-4 font-medium text-foreground">{product.price}</td>
                  <td className="p-4 text-muted-foreground">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-[var(--radius)] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-[var(--radius)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-[var(--radius)] p-6 w-full max-w-md">
            <h2 className="text-xl font-medium text-foreground mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  defaultValue={editingProduct?.name}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  defaultValue={editingProduct?.category}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select category</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                <input
                  type="text"
                  defaultValue={editingProduct?.price}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
                <input
                  type="number"
                  defaultValue={editingProduct?.stock}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Product description"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-border py-3 px-4 rounded-[var(--radius)] hover:bg-accent/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity"
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;