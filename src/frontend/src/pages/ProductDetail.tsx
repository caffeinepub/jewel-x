import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  RefreshCw,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import { useApp } from "../context/AppContext";
import { MOCK_PRODUCTS, MOCK_REVIEWS, formatPrice } from "../data/mockData";

export default function ProductDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const wished = isInWishlist(product.id);
  const related = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);
  const reviews = MOCK_REVIEWS.slice(0, 3);

  const images =
    product.imageUrls.length > 1
      ? product.imageUrls
      : [
          ...product.imageUrls,
          ...product.imageUrls,
          ...product.imageUrls,
        ].slice(0, 3);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div
              className="relative aspect-square bg-card rounded-lg overflow-hidden shadow-card"
              data-ocid="product.gallery.panel"
            >
              <img
                src={images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setImgIdx((v) => Math.max(0, v - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    disabled={imgIdx === 0}
                    data-ocid="product.gallery.prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setImgIdx((v) => Math.min(images.length - 1, v + 1))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                    disabled={imgIdx === images.length - 1}
                    data-ocid="product.gallery.next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    imgIdx === i
                      ? "border-gold"
                      : "border-transparent hover:border-border"
                  }`}
                  data-ocid={`product.thumbnail.${i + 1}`}
                >
                  <img
                    src={src}
                    alt={""}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gold mb-2">
              {product.category.toUpperCase()}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} size="md" showValue />
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-sans text-3xl font-bold text-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            {/* Materials */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.materials.map((m) => (
                <span
                  key={m}
                  className="text-[10px] tracking-widest border border-gold/40 text-gold px-3 py-1 rounded-full"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest text-muted-foreground">
                QUANTITY
              </span>
              <div className="flex items-center border border-border rounded-sm">
                <button
                  type="button"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-sm"
                  data-ocid="product.qty.decrease"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((v) => Math.min(product.stock, v + 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-sm"
                  data-ocid="product.qty.increase"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-foreground text-primary-foreground hover:bg-foreground/90 text-[11px] tracking-[0.15em] h-12 rounded-sm gap-2"
                data-ocid="product.add_to_cart.button"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO CART
              </Button>
              <Button
                onClick={() => {
                  addToCart(product, qty);
                  toast.success("Proceeding to buy!");
                }}
                className="flex-1 bg-gold hover:bg-gold/90 text-white text-[11px] tracking-[0.15em] h-12 rounded-sm"
                data-ocid="product.buy_now.button"
              >
                BUY NOW
              </Button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 border rounded-sm flex items-center justify-center transition-colors ${
                  wished
                    ? "border-gold bg-gold/10"
                    : "border-border hover:border-gold"
                }`}
                aria-label="Toggle wishlist"
                data-ocid="product.wishlist.toggle"
              >
                <Heart
                  className={`w-5 h-5 ${wished ? "fill-gold text-gold" : ""}`}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-border">
              {[
                { icon: Shield, label: "BIS Hallmarked" },
                { icon: RefreshCw, label: "30-Day Returns" },
                { icon: Truck, label: "Free Shipping" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <Icon className="w-4 h-4 text-gold" />
                  <span className="text-[10px] tracking-wide text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Details tabs */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="bg-muted/50 h-9">
                <TabsTrigger
                  value="description"
                  className="text-xs tracking-widest"
                  data-ocid="product.description.tab"
                >
                  DESCRIPTION
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="text-xs tracking-widest"
                  data-ocid="product.reviews.tab"
                >
                  REVIEWS
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className="text-xs tracking-widest"
                  data-ocid="product.care.tab"
                >
                  CARE GUIDE
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {product.materials.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-gold" /> {m}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4 space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border-b border-border pb-4 last:border-0"
                    data-ocid="product.review.item"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={r.rating} size="sm" />
                      <span className="text-xs font-semibold">{r.author}</span>
                      <span className="text-xs text-muted-foreground">
                        — {r.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{r.text}"
                    </p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="care" className="pt-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Store in the soft pouch or box provided to prevent scratches",
                    "Avoid contact with perfumes, lotions, and chemical cleaners",
                    "Clean gently with a soft cloth after wearing",
                    "Remove before swimming, bathing, or strenuous activity",
                    "Bring to our store annually for professional cleaning",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />{" "}
                      {tip}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
