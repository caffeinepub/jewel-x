import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SectionTitle from "../components/SectionTitle";
import { useApp } from "../context/AppContext";

const BRACELET_PRODUCTS = [
  {
    id: "b1",
    name: "Dhan Yog Bracelet (Lab Certified)",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/new_dhanyog_copy.webp?v=1771411837",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 2340,
    description:
      "Pyrite & Tiger Eye beads for wealth & success. Lab certified authentic stones.",
  },
  {
    id: "b2",
    name: "Raw Pyrite Bracelet with FREE Raw Selenite Plate",
    price: 799,
    originalPrice: 3099,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_670fca98-e011-4412-8c9c-f56fa5d8e960.webp?v=1769072419",
    badge: "Free Gift",
    rating: 4.9,
    reviews: 1876,
    description:
      "Raw natural pyrite bracelet with complimentary raw selenite cleansing plate.",
  },
  {
    id: "b3",
    name: "Dhan Vriddhi with FREE Raw Selenite Plate",
    price: 799,
    originalPrice: 3200,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/Gemini_Generated_Image_6wovpr6wovpr6wov_copy.webp?v=1769765469",
    badge: "New",
    rating: 4.7,
    reviews: 980,
    description:
      "Multi-crystal wealth bracelet for abundance and financial growth.",
  },
  {
    id: "b4",
    name: "Dhan Lakshmi Bracelet",
    price: 799,
    originalPrice: 1400,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/image_22_dc7f8b9d-79fb-43e5-8a85-2a66576ca8a4.png?v=1768310652",
    badge: "Popular",
    rating: 4.8,
    reviews: 1543,
    description:
      "6 powerful crystals for wealth and Lakshmi blessings. Energised on Purnima.",
  },
  {
    id: "b5",
    name: "Dhan Yog Bracelet with Zodiac Charm",
    price: 799,
    originalPrice: 1700,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/Dhan_Yog_bracelet_Aries_copy.webp?v=1770638734",
    badge: "Trending",
    rating: 4.7,
    reviews: 765,
    description:
      "Personalised Dhan Yog bracelet with your zodiac sign charm for extra power.",
  },
  {
    id: "b6",
    name: "Richie Rich Bracelet with Pyrite & Black Obsidian",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_1_0c108841-1994-4afd-b368-d05e0e66cd86.webp?v=1764133410",
    badge: null,
    rating: 4.6,
    reviews: 1120,
    description:
      "Pyrite & Black Obsidian for wealth attraction and negative energy protection.",
  },
  {
    id: "b7",
    name: "7 Mukhi Rudraksha Bracelet",
    price: 799,
    originalPrice: 2499,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_a2224045-1ac7-4829-a58c-9b162c7a830f.webp?v=1770277501",
    badge: "Siddh",
    rating: 4.9,
    reviews: 2100,
    description:
      "Authentic 7 Mukhi Rudraksha bracelet blessed by Mahalakshmi for wealth.",
  },
  {
    id: "b8",
    name: "Navgrah Shanti Bracelet with Raw Selenite Plate",
    price: 699,
    originalPrice: 3000,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/Navgrah_copy_1_1_copy.webp?v=1765271865",
    badge: "Powerful",
    rating: 4.8,
    reviews: 890,
    description:
      "9 crystals for all 9 planets, balances cosmic energies and removes doshas.",
  },
  {
    id: "b9",
    name: "Adjustable Dhan Yog Bracelet",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/d_pdp_new.webp?v=1754309910",
    badge: "Adjustable",
    rating: 4.7,
    reviews: 1340,
    description:
      "Adjustable Dhan Yog bracelet fits all wrist sizes. Pyrite & Tiger Eye.",
  },
  {
    id: "b10",
    name: "Money Magnet Bracelet",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/price_drop.webp?v=1745301541",
    badge: "Top Pick",
    rating: 4.8,
    reviews: 1987,
    description:
      "Specially designed to attract money and financial opportunities into your life.",
  },
  {
    id: "b11",
    name: "Metal Raw Pyrite Bracelet - Silver",
    price: 999,
    originalPrice: 1700,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_5fed58a5-af79-4047-ae37-ee482998afa5.webp?v=1769710963",
    badge: "Premium",
    rating: 4.6,
    reviews: 432,
    description:
      "Sterling silver metal casing with authentic raw pyrite stone. Premium quality.",
  },
  {
    id: "b12",
    name: "Raw Pyrite Bracelet (Women - 6mm Beads)",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_95eaa6ab-9431-48fd-b812-4ba15da074ae.webp?v=1764565464",
    badge: "For Women",
    rating: 4.7,
    reviews: 876,
    description:
      "Delicate 6mm raw pyrite beads specially sized for women's wrists.",
  },
  {
    id: "b13",
    name: "Super Raw Pyrite Bracelet",
    price: 599,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/New_with_smooky_copy_1.webp?v=1769710963",
    badge: null,
    rating: 4.6,
    reviews: 654,
    description:
      "Extra large raw pyrite beads for maximum wealth energy and attraction.",
  },
  {
    id: "b14",
    name: "Wealth OM Pyrite Bracelet",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_13.webp?v=1765268040",
    badge: "OM Energised",
    rating: 4.8,
    reviews: 1100,
    description:
      "Pyrite bracelet with OM symbol charm, double energised for wealth manifestation.",
  },
  {
    id: "b15",
    name: "Money Maker Bracelet",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/with_tag.webp?v=1749116073",
    badge: null,
    rating: 4.7,
    reviews: 780,
    description:
      "Pyrite & Citrine combination for business growth and financial abundance.",
  },
  {
    id: "b16",
    name: "Black Agate Bracelet",
    price: 499,
    originalPrice: 1100,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_935bfb0b-ba55-4839-98f8-9bd6fc3eb8e2.webp?v=1762431220",
    badge: "Protection",
    rating: 4.6,
    reviews: 990,
    description:
      "Black Agate for powerful protection against negative energy and evil eye.",
  },
  {
    id: "b17",
    name: "Amethyst Bracelet",
    price: 799,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_31_f73f8833-50ba-458d-b924-e968eafa543b.webp?v=1757930704",
    badge: null,
    rating: 4.7,
    reviews: 543,
    description:
      "Premium Amethyst bracelet for calmness, clarity and spiritual protection.",
  },
  {
    id: "b18",
    name: "Love Attraction Bracelet (Original Rose Quartz)",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/orq.webp?v=1751954259",
    badge: "Love",
    rating: 4.8,
    reviews: 1230,
    description:
      "Original Rose Quartz to attract love, strengthen relationships and open heart chakra.",
  },
  {
    id: "b19",
    name: "Howlite Bracelet",
    price: 599,
    originalPrice: 1100,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_2.webp?v=1762431229",
    badge: null,
    rating: 4.5,
    reviews: 320,
    description:
      "Calming white Howlite bracelet for stress relief and peaceful sleep.",
  },
  {
    id: "b20",
    name: "Carnelian Bracelet",
    price: 499,
    originalPrice: 1100,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_4_1_487efa7c-5d6b-44ad-a0de-0e37b79fb9dc.webp?v=1762433855",
    badge: "Confidence",
    rating: 4.6,
    reviews: 450,
    description:
      "Carnelian for confidence, creativity, courage and motivation in daily life.",
  },
  {
    id: "b21",
    name: "Turquoise Bracelet",
    price: 699,
    originalPrice: 1100,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_be1f8bbf-de28-4021-a5.webp?v=1762431220",
    badge: null,
    rating: 4.5,
    reviews: 280,
    description:
      "Authentic turquoise for protection, communication and positive energy flow.",
  },
  {
    id: "b22",
    name: "Karz Mukti Bracelet (Silver Hematite)",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/2nd_image.jpg?v=174178293",
    badge: "Debt Free",
    rating: 4.8,
    reviews: 1450,
    description:
      "Silver Hematite & Pyrite combo specifically designed to overcome debt and financial burdens.",
  },
  {
    id: "b23",
    name: "Dhan Yog Bracelet (Women 6mm Beads)",
    price: 699,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_d0adac1f-24ce-47e6-99ea-64156d9518b4.webp?v=1773293901",
    badge: "For Women",
    rating: 4.8,
    reviews: 1020,
    description:
      "Dhan Yog bracelet with delicate 6mm beads designed especially for women.",
  },
  {
    id: "b24",
    name: "Energised Dhan Yog Bracelet - 10x Stronger",
    price: 799,
    originalPrice: 1999,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/new_dhanyog_copy.webp?v=1771411837",
    badge: "10x Power",
    rating: 4.9,
    reviews: 2780,
    description:
      "Energised on Purnima for 10x stronger wealth manifestation power.",
  },
  {
    id: "b25",
    name: "Gold Plated Vel Kada",
    price: 499,
    originalPrice: 1300,
    image:
      "https://cdn.shopify.com/s/files/1/0878/4907/4985/files/1_3_32.webp?v=1768308756",
    badge: "Gold",
    rating: 4.5,
    reviews: 390,
    description:
      "Gold plated Vel Kada bracelet for protection and divine blessings.",
  },
];

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function Bracelets() {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [sortBy, setSortBy] = useState("featured");

  const sorted = [...BRACELET_PRODUCTS].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const discount = (orig: number, price: number) =>
    Math.round(((orig - price) / orig) * 100);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-[#1a1208] to-[#2d1f0e] text-white py-16 px-4 text-center mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://cdn.shopify.com/s/files/1/0878/4907/4985/collections/bracelet_1.png?v=1751625953')] bg-cover bg-center" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.3em] text-gold mb-3">
            JEWEL X COLLECTION
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Sacred Bracelet Collection
          </h1>
          <p className="text-sm text-white/70 max-w-md mx-auto">
            Energised crystals & pyrite bracelets for wealth, protection and
            spiritual balance. Each piece is authentically sourced and blessed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header + Sort */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionTitle
              title="All Bracelets"
              subtitle="SHOP"
              center={false}
            />
            <p className="text-muted-foreground text-sm -mt-6">
              {sorted.length} pieces
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">
              SORT BY
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-border rounded-sm px-3 py-2 bg-background hover:border-gold transition-colors focus:outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {sorted.map((product) => {
            const inWishlist = wishlist.some((w) => w.id === product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-gold text-white text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded-sm">
                    {product.badge}
                  </span>
                )}
                {/* Discount */}
                <span className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                  -{discount(product.originalPrice, product.price)}%
                </span>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://cdn.shopify.com/s/files/1/0878/4907/4985/collections/bracelet_1.png?v=1751625953";
                    }}
                  />
                  {/* Wishlist button */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        category: "bracelets",
                        rating: product.rating,
                        reviewCount: product.reviews,
                        description: product.description,
                        imageUrls: [product.image],
                        materials: [],
                        isFeatured: false,
                        isBestSeller: false,
                        stock: 10,
                        badge: product.badge ?? undefined,
                      })
                    }
                    className="absolute top-2 right-7 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        inWishlist
                          ? "fill-red-500 text-red-500"
                          : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-xs font-medium leading-tight line-clamp-2 mb-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mb-2">
                    {product.description}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${
                            i <= Math.floor(product.rating)
                              ? "fill-gold text-gold"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-muted-foreground">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  {/* Prices */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-sm font-bold text-gold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        category: "bracelets",
                        rating: product.rating,
                        reviewCount: product.reviews,
                        description: product.description,
                        imageUrls: [product.image],
                        materials: [],
                        isFeatured: false,
                        isBestSeller: false,
                        stock: 10,
                        badge: product.badge ?? undefined,
                      });
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 bg-foreground text-background text-[10px] tracking-widest font-semibold py-2 rounded-sm hover:bg-gold hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-border pt-10">
          <p className="text-xs tracking-[0.2em] text-muted-foreground mb-2">
            AUTHENTICITY GUARANTEED
          </p>
          <h3 className="font-serif text-xl font-semibold mb-2">
            Every Bracelet is Energised & Certified
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            All our bracelets are energised on Purnima (Full Moon) for maximum
            spiritual benefit. 7-day return policy. Free shipping on prepaid
            orders.
          </p>
        </div>
      </div>
    </main>
  );
}
