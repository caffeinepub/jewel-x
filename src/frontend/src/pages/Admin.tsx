import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Edit2,
  Package,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  type MockProduct,
  formatPrice,
} from "../data/mockData";

const MOCK_ORDERS_ADMIN = [
  {
    id: "JX-001",
    customer: "Priya Sharma",
    date: "Mar 10",
    items: 2,
    total: 21000,
    status: "Delivered",
  },
  {
    id: "JX-002",
    customer: "Ananya Krishnan",
    date: "Mar 14",
    items: 1,
    total: 18500,
    status: "Shipped",
  },
  {
    id: "JX-003",
    customer: "Meera Patel",
    date: "Mar 17",
    items: 3,
    total: 47500,
    status: "Processing",
  },
  {
    id: "JX-004",
    customer: "Deepika Nair",
    date: "Mar 18",
    items: 1,
    total: 32000,
    status: "Processing",
  },
];

const MOCK_USERS = [
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    orders: 3,
    spent: 45000,
    joined: "Jan 2026",
  },
  {
    name: "Ananya Krishnan",
    email: "ananya@example.com",
    orders: 2,
    spent: 26000,
    joined: "Feb 2026",
  },
  {
    name: "Meera Patel",
    email: "meera@example.com",
    orders: 5,
    spent: 89000,
    joined: "Dec 2025",
  },
  {
    name: "Deepika Nair",
    email: "deepika@example.com",
    orders: 1,
    spent: 32000,
    joined: "Mar 2026",
  },
];

const MOCK_COUPONS = [
  {
    code: "JEWEL10",
    discount: "10%",
    type: "Percentage",
    used: 24,
    expiry: "Apr 30, 2026",
    active: true,
  },
  {
    code: "FIRST500",
    discount: "₹500",
    type: "Flat",
    used: 12,
    expiry: "Mar 31, 2026",
    active: true,
  },
  {
    code: "SUMMER20",
    discount: "20%",
    type: "Percentage",
    used: 0,
    expiry: "Jun 30, 2026",
    active: false,
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Admin() {
  const [products, setProducts] = useState<MockProduct[]>(MOCK_PRODUCTS);
  const [editProduct, setEditProduct] = useState<MockProduct | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState("");

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const statsCards = [
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: "₹4,85,200",
      sub: "+18% this month",
    },
    {
      icon: ShoppingCart,
      label: "Total Orders",
      value: "247",
      sub: "12 pending",
    },
    {
      icon: Package,
      label: "Products",
      value: `${products.length}`,
      sub: `${MOCK_CATEGORIES.length} categories`,
    },
    { icon: Users, label: "Customers", value: "189", sub: "23 new this month" },
  ];

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
          <Badge className="bg-gold/10 text-gold border-gold/30 text-xs tracking-widest">
            ADMIN
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="bg-card rounded-lg p-5 shadow-card"
              data-ocid="admin.stats.card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
              </div>
              <p className="font-serif text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              <p className="text-[10px] text-gold mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6 h-10">
            <TabsTrigger
              value="products"
              className="text-xs tracking-widest gap-1.5"
              data-ocid="admin.products.tab"
            >
              <Package className="w-3.5 h-3.5" />
              PRODUCTS
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="text-xs tracking-widest gap-1.5"
              data-ocid="admin.orders.tab"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              ORDERS
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="text-xs tracking-widest gap-1.5"
              data-ocid="admin.users.tab"
            >
              <Users className="w-3.5 h-3.5" />
              USERS
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="text-xs tracking-widest gap-1.5"
              data-ocid="admin.coupons.tab"
            >
              <Tag className="w-3.5 h-3.5" />
              COUPONS
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-xs tracking-widest gap-1.5"
              data-ocid="admin.analytics.tab"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              ANALYTICS
            </TabsTrigger>
          </TabsList>

          {/* Products tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold">
                Products ({products.length})
              </h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gold hover:bg-gold/90 text-white text-[10px] tracking-widest gap-1.5"
                    data-ocid="admin.products.add_button"
                    onClick={() => setEditProduct(null)}
                  >
                    <Plus className="w-3.5 h-3.5" /> ADD PRODUCT
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-md"
                  data-ocid="admin.product.dialog"
                >
                  <DialogHeader>
                    <DialogTitle className="font-serif">
                      {editProduct ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    initial={editProduct}
                    onSave={(data) => {
                      if (editProduct) {
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id === editProduct.id ? { ...p, ...data } : p,
                          ),
                        );
                        toast.success("Product updated");
                      } else {
                        setProducts((prev) => [
                          ...prev,
                          {
                            ...data,
                            id: String(Date.now()),
                            rating: 4.5,
                            reviewCount: 0,
                            isBestSeller: false,
                            isFeatured: false,
                            stock: 10,
                          } as MockProduct,
                        ]);
                        toast.success("Product added");
                      }
                      setDialogOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card rounded-lg shadow-card overflow-hidden">
              <Table data-ocid="admin.products.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p, i) => (
                    <TableRow
                      key={p.id}
                      data-ocid={`admin.products.row.${i + 1}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrls[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm capitalize">
                        {p.category}
                      </TableCell>
                      <TableCell className="text-sm text-gold font-medium">
                        {formatPrice(p.price)}
                      </TableCell>
                      <TableCell className="text-sm">{p.stock}</TableCell>
                      <TableCell>
                        {p.isBestSeller && (
                          <Badge className="bg-gold/10 text-gold border-gold/30 text-[9px]">
                            Best Seller
                          </Badge>
                        )}
                        {p.isFeatured && (
                          <Badge className="bg-blue-100 text-blue-700 border-0 text-[9px] ml-1">
                            Featured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                                onClick={() => setEditProduct(p)}
                                data-ocid={`admin.products.edit_button.${i + 1}`}
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle className="font-serif">
                                  Edit Product
                                </DialogTitle>
                              </DialogHeader>
                              <ProductForm
                                initial={p}
                                onSave={(data) => {
                                  setProducts((prev) =>
                                    prev.map((x) =>
                                      x.id === p.id ? { ...x, ...data } : x,
                                    ),
                                  );
                                  toast.success("Product updated");
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
                            data-ocid={`admin.products.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Orders tab */}
          <TabsContent value="orders">
            <h2 className="font-serif text-xl font-semibold mb-4">Orders</h2>
            <div className="bg-card rounded-lg shadow-card overflow-hidden">
              <Table data-ocid="admin.orders.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_ORDERS_ADMIN.map((o, i) => (
                    <TableRow
                      key={o.id}
                      data-ocid={`admin.orders.row.${i + 1}`}
                    >
                      <TableCell className="text-sm font-mono">
                        {o.id}
                      </TableCell>
                      <TableCell className="text-sm">{o.customer}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {o.date}
                      </TableCell>
                      <TableCell className="text-sm">{o.items}</TableCell>
                      <TableCell className="text-sm font-semibold text-gold">
                        {formatPrice(o.total)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusColor[o.status] ?? ""} border-0 text-[10px]`}
                        >
                          {o.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Users tab */}
          <TabsContent value="users">
            <h2 className="font-serif text-xl font-semibold mb-4">Customers</h2>
            <div className="bg-card rounded-lg shadow-card overflow-hidden">
              <Table data-ocid="admin.users.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Member Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((u, i) => (
                    <TableRow
                      key={u.email}
                      data-ocid={`admin.users.row.${i + 1}`}
                    >
                      <TableCell className="text-sm font-medium">
                        {u.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {u.email}
                      </TableCell>
                      <TableCell className="text-sm">{u.orders}</TableCell>
                      <TableCell className="text-sm font-semibold text-gold">
                        {formatPrice(u.spent)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {u.joined}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Coupons tab */}
          <TabsContent value="coupons">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold">Coupons</h2>
            </div>
            <div className="flex gap-3 mb-5">
              <Input
                placeholder="New coupon code"
                value={newCoupon}
                onChange={(e) => setNewCoupon(e.target.value)}
                className="max-w-xs text-xs"
                data-ocid="admin.coupons.input"
              />
              <Button
                onClick={() => {
                  if (newCoupon) {
                    toast.success(`Coupon ${newCoupon} created`);
                    setNewCoupon("");
                  }
                }}
                size="sm"
                className="bg-gold hover:bg-gold/90 text-white text-[10px] tracking-widest gap-1.5"
                data-ocid="admin.coupons.add_button"
              >
                <Plus className="w-3.5 h-3.5" /> CREATE
              </Button>
            </div>
            <div className="bg-card rounded-lg shadow-card overflow-hidden">
              <Table data-ocid="admin.coupons.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_COUPONS.map((c, i) => (
                    <TableRow
                      key={c.code}
                      data-ocid={`admin.coupons.row.${i + 1}`}
                    >
                      <TableCell className="font-mono text-sm font-semibold">
                        {c.code}
                      </TableCell>
                      <TableCell className="text-sm text-gold font-medium">
                        {c.discount}
                      </TableCell>
                      <TableCell className="text-sm">{c.type}</TableCell>
                      <TableCell className="text-sm">{c.used} times</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.expiry}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            c.active
                              ? "bg-green-100 text-green-700 border-0"
                              : "bg-gray-100 text-gray-500 border-0"
                          }
                        >
                          {c.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Analytics tab */}
          <TabsContent value="analytics">
            <h2 className="font-serif text-xl font-semibold mb-6">
              Sales Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category breakdown */}
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h3 className="font-serif text-lg font-semibold mb-5">
                  Sales by Category
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Necklaces", pct: 38, value: "₹1,84,376" },
                    { label: "Rings", pct: 29, value: "₹1,40,708" },
                    { label: "Bracelets", pct: 21, value: "₹1,01,892" },
                    { label: "Earrings", pct: 12, value: "₹58,224" },
                  ].map(({ label, pct, value }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{label}</span>
                        <span className="text-gold font-medium">
                          {value} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Monthly revenue */}
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h3 className="font-serif text-lg font-semibold mb-5">
                  Monthly Revenue
                </h3>
                <div className="flex items-end gap-2 h-36">
                  {[
                    { month: "Oct", val: 65 },
                    { month: "Nov", val: 78 },
                    { month: "Dec", val: 95 },
                    { month: "Jan", val: 72 },
                    { month: "Feb", val: 85 },
                    { month: "Mar", val: 100 },
                  ].map(({ month, val }) => (
                    <div
                      key={month}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full bg-gold/80 rounded-t-sm"
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[9px] text-muted-foreground">
                        {month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function ProductForm({
  initial,
  onSave,
}: {
  initial: MockProduct | null;
  onSave: (data: Partial<MockProduct>) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [category, setCategory] = useState(initial?.category ?? "bracelets");
  const [description, setDescription] = useState(initial?.description ?? "");

  return (
    <div className="space-y-4 pt-2">
      <div>
        <Label className="text-xs tracking-widest">PRODUCT NAME</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
          data-ocid="admin.product.name.input"
        />
      </div>
      <div>
        <Label className="text-xs tracking-widest">PRICE (₹)</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1"
          data-ocid="admin.product.price.input"
        />
      </div>
      <div>
        <Label className="text-xs tracking-widest">CATEGORY</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
          data-ocid="admin.product.category.select"
        >
          {MOCK_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs tracking-widest">DESCRIPTION</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
          data-ocid="admin.product.description.textarea"
        />
      </div>
      <Button
        onClick={() =>
          onSave({
            name,
            price: Number(price),
            category,
            description,
            imageUrls: initial?.imageUrls ?? [
              "/assets/generated/product-bracelet-1.dim_600x600.jpg",
            ],
            materials: initial?.materials ?? ["18kt Gold"],
          })
        }
        className="w-full bg-gold hover:bg-gold/90 text-white text-[10px] tracking-widest h-10"
        data-ocid="admin.product.save_button"
      >
        SAVE PRODUCT
      </Button>
    </div>
  );
}
