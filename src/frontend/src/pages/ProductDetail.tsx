import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Info,
  Package,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import { MOCK_PRODUCTS, MOCK_REVIEWS, formatPrice } from "../data/mockData";
import { RUDRAKSHA_PRODUCTS } from "../data/rudrakshaProducts";

const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...RUDRAKSHA_PRODUCTS.map((p) => ({
    ...p,
    slug: p.id,
    inStock: p.stock > 0,
    badge: (p as { badge?: string }).badge,
    isFeatured: false,
    isBestSeller: (p as { badge?: string }).badge === "Best Seller",
    tags: ["rudraksha"],
  })),
];

function getUrgencyCount(id: string): number {
  return (Math.abs(id.charCodeAt(0) + id.charCodeAt(id.length - 1)) % 5) + 1;
}

function getInitialSeconds(productId: string): number {
  return (
    ((productId.charCodeAt(0) * 37 +
      productId.charCodeAt(productId.length - 1) * 13) %
      3000) +
    600
  );
}

function formatTime(seconds: number): { hh: string; mm: string; ss: string } {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    hh: String(h).padStart(2, "0"),
    mm: String(m).padStart(2, "0"),
    ss: String(s).padStart(2, "0"),
  };
}

function CountdownTimer({ productId }: { productId: string }) {
  const [seconds, setSeconds] = useState(() => getInitialSeconds(productId));

  useEffect(() => {
    setSeconds(getInitialSeconds(productId));
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) return Math.floor(Math.random() * 300) + 300;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { hh, mm, ss } = formatTime(seconds);

  return (
    <div
      className="mb-4 rounded-lg overflow-hidden border"
      style={{ borderColor: "#f0e6d3", background: "#fff8f0" }}
      data-ocid="product.timer.panel"
    >
      <div
        className="flex items-center justify-center gap-2 px-3 py-1.5 text-white text-xs font-bold tracking-wide"
        style={{ background: "linear-gradient(90deg, #f15a22, #e84e1b)" }}
      >
        <span>⏰</span>
        <span>Special price ends in</span>
        <span>🔥</span>
      </div>
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        {[
          { v: hh, l: "HRS" },
          { v: mm, l: "MIN" },
          { v: ss, l: "SEC" },
        ].map(({ v, l }, i) => (
          <div key={l} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center font-mono text-xl font-extrabold"
                style={{
                  background: "#1a1a1a",
                  color: "#f15a22",
                }}
              >
                {v}
              </div>
              <span
                className="text-[9px] tracking-wider mt-1"
                style={{ color: "#888" }}
              >
                {l}
              </span>
            </div>
            {i < 2 && (
              <span
                className="text-xl font-bold pb-4"
                style={{ color: "#f15a22" }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCK_MINI_REVIEWS = [
  {
    id: "mr1",
    name: "Manoj Kumar",
    text: "Pehenne ke baad kaafi positive changes notice hue hain. Financial growth improve ho rahi hai, naye opportunities bhi mil rahe hain.",
  },
  {
    id: "mr2",
    name: "Sadhana Upadhyay",
    text: "Pehenne ke baad confidence aur positive energy feel hui. Financially bhi achhe results dikh rahe hain. Highly recommended!",
  },
  {
    id: "mr3",
    name: "Shivam Singh",
    text: "Best purchase ever! Business mein new opportunities mil rahi hain aur confidence bhi badh gaya hai.",
  },
  {
    id: "mr4",
    name: "Vasu Sharma",
    text: "Pehle vishvas nahi tha ki yeh itna effective hoga, par pehenne ke baad mindset kaafi positive ho gaya. Quality bhi achhi hai.",
  },
];

const ACCORDION_SECTIONS = [
  {
    id: "benefits",
    title: "Benefits",
    content: [
      "Attracts Wealth & Luck – Pyrite draws financial prosperity, Citrine supports career growth, and Green Aventurine brings luck.",
      "Boosts Health & Motivation – Tiger Eye improves overall health, while Hematite enhances motivation and focus.",
      "Strengthens Your Energy – Quartz amplifies the power of all the crystals, making their effects 10x stronger.",
      "Supports Overall Growth – This combination balances health, wealth, career, and motivation for a more prosperous life.",
    ],
  },
  {
    id: "how-to-wear",
    title: "How to wear?",
    content: [
      "Wear on your right wrist for optimal energy flow.",
      "Start wearing it every morning and set your daily intentions.",
      "Wear on Fridays to align with the energy of wealth.",
      "Match with bright outfits for prosperity.",
    ],
  },
  {
    id: "style-tip",
    title: "Style tip",
    content: [
      "Wear it alongside other minimalist jewelry for a complete look.",
      "Its sleek design pairs well with both everyday wear and business attire.",
      "Subtly showcases your focus on prosperity and success.",
    ],
  },
  {
    id: "best-day",
    title: "Best day to wear",
    content: [
      "The best day to wear this bracelet is on Friday, as it's associated with wealth, prosperity, and abundance.",
      "Enhances the bracelet's energy for attracting financial success.",
    ],
  },
  {
    id: "packaging",
    title: "Packaging",
    content: [
      "Presented in a sturdy black kappa box with foam, designed especially for safekeeping and gifting.",
      "Comes with a lab certificate of authenticity.",
    ],
  },
  {
    id: "returns",
    title: "Returns + Exchanges",
    content: [
      "We offer a 7-day return policy.",
      "Returns will be processed after we gather relevant details and reasoning.",
      "Please ensure the product is in its original condition for a smooth return process.",
    ],
  },
];

const SPECS = [
  { label: "Material", value: "Multiple Natural Stones" },
  { label: "Bead Size", value: "7-8 mm" },
  { label: "Tarnish resistance", value: "Anti-tarnish" },
  { label: "Colour", value: "Multicolor" },
  { label: "Size", value: "Free size" },
  { label: "Water Resistance", value: "Anti-splash" },
];

export default function ProductDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const product = ALL_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [pincode, setPincode] = useState("");
  const [_reviewSlide, setReviewSlide] = useState(0);
  const navigate = useNavigate();
  const wished = isInWishlist(product.id);
  const related = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);
  const reviews = MOCK_REVIEWS.slice(0, 5);
  const urgencyCount = getUrgencyCount(product.id);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);

  const images =
    product.imageUrls.length > 1
      ? product.imageUrls
      : [
          ...product.imageUrls,
          ...product.imageUrls,
          ...product.imageUrls,
        ].slice(0, 3);

  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const totalReviews = product.reviewCount;
  const starDist = [
    { stars: 5, pct: 96 },
    { stars: 4, pct: 3 },
    { stars: 3, pct: 1 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ];

  const handleReviewPrev = () => {
    setReviewSlide((v) => Math.max(0, v - 1));
    if (reviewCarouselRef.current) {
      reviewCarouselRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };
  const handleReviewNext = () => {
    setReviewSlide((v) => Math.min(MOCK_MINI_REVIEWS.length - 1, v + 1));
    if (reviewCarouselRef.current) {
      reviewCarouselRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  // Bullet points from description
  const descLines = product.description
    .split(/[.!]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main
      style={{ background: "#fafaf8", minHeight: "100vh" }}
      className="pt-24 pb-20"
    >
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-xs mb-6"
          style={{ color: "#888" }}
        >
          <Link to="/" className="hover:underline" style={{ color: "#666" }}>
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            className="hover:underline"
            style={{ color: "#666" }}
          >
            Shop
          </Link>
          <span>/</span>
          <span style={{ color: "#1a1a1a" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
          {/* ─── LEFT: Gallery ─── */}
          <div className="space-y-3">
            <div
              className="relative aspect-square rounded-xl overflow-hidden"
              style={{ background: "#f5f5f5", border: "1px solid #e8e8e8" }}
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md"
                    style={{ background: "white", border: "1px solid #e0e0e0" }}
                    disabled={imgIdx === 0}
                    data-ocid="product.gallery.prev"
                  >
                    <ChevronLeft
                      className="w-4 h-4"
                      style={{ color: "#1a1a1a" }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setImgIdx((v) => Math.min(images.length - 1, v + 1))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md"
                    style={{ background: "white", border: "1px solid #e0e0e0" }}
                    disabled={imgIdx === images.length - 1}
                    data-ocid="product.gallery.next"
                  >
                    <ChevronRight
                      className="w-4 h-4"
                      style={{ color: "#1a1a1a" }}
                    />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  type="button"
                  // biome-ignore lint/suspicious/noArrayIndexKey: image thumbnails have no stable id
                  key={`${src}-${i}`}
                  onClick={() => setImgIdx(i)}
                  className="flex-shrink-0 w-18 h-18 rounded-lg overflow-hidden transition-all"
                  style={{
                    width: 72,
                    height: 72,
                    border:
                      imgIdx === i ? "2px solid #f15a22" : "2px solid #e5e5e5",
                  }}
                  data-ocid={`product.thumbnail.${i + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Product Info ─── */}
          <div>
            {/* Category */}
            <p
              className="text-xs font-semibold tracking-widest mb-1"
              style={{ color: "#f15a22" }}
            >
              {product.category.toUpperCase()}
            </p>

            {/* Title */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{
                color: "#1a1a1a",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4"
                    style={{
                      color:
                        s <= Math.round(product.rating) ? "#f5a623" : "#ddd",
                      fill:
                        s <= Math.round(product.rating) ? "#f5a623" : "none",
                    }}
                  />
                ))}
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#1a1a1a" }}
              >
                {product.rating}
              </span>
              <span className="text-sm" style={{ color: "#888" }}>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-3xl font-extrabold"
                style={{ color: "#1a1a1a" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  className="text-xl line-through"
                  style={{ color: "#aaa" }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discountPct > 0 && (
                <Badge
                  className="text-sm font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "#f15a22",
                    color: "white",
                    border: "none",
                  }}
                >
                  {discountPct}% OFF
                </Badge>
              )}
            </div>
            <p className="text-xs mb-4" style={{ color: "#888" }}>
              Inclusive of all taxes
            </p>

            {/* UPI Icons Strip */}
            <div
              className="flex items-center gap-3 mb-4 px-3 py-2 rounded-lg"
              style={{ background: "#f9f9f9", border: "1px solid #ebebeb" }}
            >
              <span className="text-xs font-medium" style={{ color: "#555" }}>
                Pay via:
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#4285f4", color: "white" }}
                >
                  GPay
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#002970", color: "white" }}
                >
                  Paytm
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#5f259f", color: "white" }}
                >
                  PhonePe
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#ff9f00", color: "white" }}
                >
                  UPI
                </span>
              </div>
              <span className="text-xs" style={{ color: "#888" }}>
                & more
              </span>
            </div>

            {/* Cashback Offer */}
            <div
              className="flex items-start gap-2 mb-4 px-3 py-2.5 rounded-lg"
              style={{ background: "#f0faf4", border: "1px solid #b2dfce" }}
            >
              <span className="text-green-600 mt-0.5">🎁</span>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1a6b3a" }}
                >
                  Flat ₹500 Cashback on all prepaid orders
                </p>
                <p className="text-xs" style={{ color: "#2e8b57" }}>
                  Valid on UPI, GPay, Paytm, PhonePe & Cards
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-xs mt-0.5"
                style={{ color: "#2e8b57" }}
              >
                <Info className="w-3.5 h-3.5" /> T&C
              </button>
            </div>

            {/* Urgency Badge */}
            <div
              className="flex items-center gap-2 mb-3 px-3 py-2 rounded-full w-fit"
              style={{
                background: "linear-gradient(90deg, #ff4d00, #f15a22)",
                boxShadow: "0 2px 8px rgba(241,90,34,0.3)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="text-white text-sm font-bold">
                🔥 Hurry up! Only {urgencyCount} left in stock!
              </span>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer productId={product.id} />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className="text-xs font-semibold tracking-widest"
                style={{ color: "#555" }}
              >
                QUANTITY
              </span>
              <div
                className="flex items-center rounded-lg overflow-hidden"
                style={{ border: "1.5px solid #e0e0e0" }}
              >
                <button
                  type="button"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-gray-100"
                  style={{ color: "#1a1a1a" }}
                  data-ocid="product.qty.decrease"
                >
                  −
                </button>
                <span
                  className="w-12 text-center text-sm font-bold"
                  style={{
                    color: "#1a1a1a",
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    lineHeight: "40px",
                  }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((v) => Math.min(product.stock, v + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-gray-100"
                  style={{ color: "#1a1a1a" }}
                  data-ocid="product.qty.increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                onClick={() => addToCart(product, qty)}
                className="flex-1 h-12 font-bold text-sm tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "#1a1a1a",
                  color: "white",
                  border: "none",
                }}
                data-ocid="product.add_to_cart.button"
              >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </Button>
              <Button
                onClick={() => {
                  addToCart(product, qty);
                  navigate({ to: "/cart" });
                }}
                className="flex-1 h-12 font-bold text-sm tracking-wide rounded-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #f15a22, #e04010)",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(241,90,34,0.4)",
                }}
                data-ocid="product.buy_now.button"
              >
                <Zap className="w-4 h-4 mr-1" /> BUY NOW
              </Button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-all"
                style={{
                  border: wished ? "2px solid #f15a22" : "2px solid #e0e0e0",
                  background: wished ? "#fff5f1" : "white",
                }}
                aria-label="Toggle wishlist"
                data-ocid="product.wishlist.toggle"
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: wished ? "#f15a22" : "#aaa",
                    fill: wished ? "#f15a22" : "none",
                  }}
                />
              </button>
            </div>

            {/* Trust Strip */}
            <div
              className="grid grid-cols-2 gap-0 mb-4 rounded-lg overflow-hidden"
              style={{ border: "1px solid #e8e8e8" }}
            >
              <div
                className="flex items-center gap-2 px-3 py-3"
                style={{
                  borderRight: "1px solid #e8e8e8",
                  background: "#fafff9",
                }}
              >
                <ShieldCheck
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#2e8b57" }}
                />
                <span
                  className="text-xs font-medium leading-tight"
                  style={{ color: "#1a1a1a" }}
                >
                  100% Cashback
                  <br />
                  <span style={{ color: "#666", fontWeight: 400 }}>
                    on all prepaid orders (TnC)
                  </span>
                </span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-3"
                style={{ background: "#fafff9" }}
              >
                <Truck
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#2e8b57" }}
                />
                <span
                  className="text-xs font-medium leading-tight"
                  style={{ color: "#1a1a1a" }}
                >
                  FREE Shipping
                  <br />
                  <span style={{ color: "#666", fontWeight: 400 }}>
                    on all orders
                  </span>
                </span>
              </div>
            </div>

            {/* Mini Reviews Carousel */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#1a1a1a" }}
                >
                  What customers say
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleReviewPrev}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "#f0f0f0", border: "1px solid #ddd" }}
                    data-ocid="product.review.prev"
                  >
                    <ChevronLeft
                      className="w-3.5 h-3.5"
                      style={{ color: "#555" }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewNext}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "#f0f0f0", border: "1px solid #ddd" }}
                    data-ocid="product.review.next"
                  >
                    <ChevronRight
                      className="w-3.5 h-3.5"
                      style={{ color: "#555" }}
                    />
                  </button>
                </div>
              </div>
              <div
                ref={reviewCarouselRef}
                className="flex gap-3 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {MOCK_MINI_REVIEWS.map((r) => (
                  <div
                    key={r.id}
                    className="flex-shrink-0 rounded-xl p-3"
                    style={{
                      width: 240,
                      background: "#f8f8f8",
                      border: "1px solid #ebebeb",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: "#f15a22" }}
                      >
                        {r.name[0]}
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold"
                          style={{ color: "#1a1a1a" }}
                        >
                          {r.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: "#e8f5e9", color: "#2e7d32" }}
                          >
                            ✓ Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#555" }}
                    >
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Bullet Points */}
            <div
              className="mb-4 px-4 py-3 rounded-lg"
              style={{ background: "#fffbf7", border: "1px solid #f0e6d3" }}
            >
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: "#1a1a1a" }}
              >
                What's inside
              </p>
              <ul className="space-y-1.5">
                {product.materials.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm">
                    <span style={{ color: "#f15a22", fontWeight: "bold" }}>
                      •
                    </span>
                    <span style={{ color: "#333" }}>
                      <strong>{m}</strong>
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="text-xs mt-3 leading-relaxed"
                style={{ color: "#666" }}
              >
                {descLines[0]}
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 mb-4 py-2">
              <span className="text-2xl">🧡</span>
              <span className="text-sm font-bold" style={{ color: "#1a1a1a" }}>
                Loved by 15 lakh+ customers
              </span>
            </div>

            {/* Pincode Delivery Estimator */}
            <div
              className="mb-4 px-4 py-3 rounded-lg"
              style={{ background: "white", border: "1.5px solid #e8e8e8" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4" style={{ color: "#f15a22" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#1a1a1a" }}
                >
                  Get estimated delivery date
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: "#888" }}>
                Prepaid orders are delivered on priority.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                  maxLength={6}
                  className="h-9 text-sm"
                  style={{
                    border: "1px solid #ddd",
                    background: "#fafafa",
                    color: "#1a1a1a",
                  }}
                  data-ocid="product.pincode.input"
                />
                <Button
                  className="h-9 px-4 text-sm font-semibold rounded-lg"
                  style={{
                    background: "#f15a22",
                    color: "white",
                    border: "none",
                  }}
                  data-ocid="product.pincode.check"
                >
                  Check
                </Button>
              </div>
            </div>

            {/* Accordion Sections */}
            <Accordion type="multiple" className="w-full">
              {ACCORDION_SECTIONS.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <AccordionTrigger
                    className="text-sm font-semibold py-3 hover:no-underline"
                    style={{ color: "#1a1a1a" }}
                    data-ocid={`product.accordion.${section.id}`}
                  >
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 pb-2">
                      {section.content.map((item) => (
                        <li
                          key={item.slice(0, 20)}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "#555" }}
                        >
                          <span
                            style={{
                              color: "#f15a22",
                              fontWeight: "bold",
                              flexShrink: 0,
                            }}
                          >
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* ─── BELOW GRID: Specs + Reviews ─── */}
        <div className="mt-14 space-y-12">
          {/* Specifications Table */}
          <section>
            <h2
              className="text-xl font-bold mb-4"
              style={{
                color: "#1a1a1a",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Specifications
            </h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #e8e8e8" }}
            >
              <Table>
                <TableBody>
                  {SPECS.map((spec, i) => (
                    <TableRow
                      key={spec.label}
                      style={{
                        background: i % 2 === 0 ? "#fafafa" : "white",
                        borderColor: "#e8e8e8",
                      }}
                    >
                      <TableCell
                        className="font-semibold text-sm w-1/3"
                        style={{ color: "#555" }}
                      >
                        {spec.label}
                      </TableCell>
                      <TableCell
                        className="text-sm"
                        style={{ color: "#1a1a1a" }}
                      >
                        {spec.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold"
                style={{
                  color: "#1a1a1a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Customer Reviews
                <span
                  className="ml-2 text-sm font-normal"
                  style={{ color: "#888" }}
                >
                  ({totalReviews} reviews)
                </span>
              </h2>
            </div>

            {/* Rating Distribution */}
            <div
              className="flex flex-col sm:flex-row gap-6 mb-8 p-5 rounded-xl"
              style={{ background: "white", border: "1px solid #e8e8e8" }}
            >
              <div className="flex flex-col items-center justify-center min-w-[100px]">
                <span
                  className="text-5xl font-extrabold"
                  style={{ color: "#1a1a1a" }}
                >
                  {product.rating}
                </span>
                <div className="flex gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4"
                      style={{
                        color:
                          s <= Math.round(product.rating) ? "#f5a623" : "#ddd",
                        fill:
                          s <= Math.round(product.rating) ? "#f5a623" : "none",
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs" style={{ color: "#888" }}>
                  Based on {totalReviews} reviews
                </span>
              </div>
              <div className="flex-1 space-y-2">
                {starDist.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span
                      className="text-xs w-8 text-right font-medium"
                      style={{ color: "#555" }}
                    >
                      {stars}★
                    </span>
                    <div
                      className="flex-1 h-2.5 rounded-full overflow-hidden"
                      style={{ background: "#f0f0f0" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background:
                            pct > 50
                              ? "#4caf50"
                              : pct > 10
                                ? "#f5a623"
                                : "#ddd",
                        }}
                      />
                    </div>
                    <span className="text-xs w-8" style={{ color: "#888" }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl"
                  style={{ background: "white", border: "1px solid #e8e8e8" }}
                  data-ocid={`product.review.item.${i + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "#f15a22" }}
                    >
                      {r.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#1a1a1a" }}
                        >
                          {r.author}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: "#e8f5e9", color: "#2e7d32" }}
                        >
                          ✓ Verified
                        </span>
                        <span className="text-xs" style={{ color: "#aaa" }}>
                          — {r.location}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-3.5 h-3.5"
                            style={{
                              color: s <= r.rating ? "#f5a623" : "#ddd",
                              fill: s <= r.rating ? "#f5a623" : "none",
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#555" }}
                      >
                        "{r.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="pb-4">
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{
                  color: "#1a1a1a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.slice(0, 4).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Sticky Buy Bar (mobile) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 px-4 py-3 lg:hidden"
        style={{
          background: "white",
          borderTop: "1px solid #e8e8e8",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <button
          type="button"
          onClick={() => addToCart(product, qty)}
          className="flex-1 h-11 font-bold text-sm rounded-lg flex items-center justify-center gap-1.5 transition-all"
          style={{ background: "#1a1a1a", color: "white", border: "none" }}
          data-ocid="product.sticky_add_to_cart.button"
        >
          <Package className="w-4 h-4" /> Add to Cart
        </button>
        <button
          type="button"
          onClick={() => {
            addToCart(product, qty);
            navigate({ to: "/cart" });
          }}
          className="flex-1 h-11 font-bold text-sm rounded-lg transition-all"
          style={{
            background: "linear-gradient(135deg, #f15a22, #e04010)",
            color: "white",
            border: "none",
          }}
          data-ocid="product.sticky_buy_now.button"
        >
          Buy Now
        </button>
      </div>
    </main>
  );
}
