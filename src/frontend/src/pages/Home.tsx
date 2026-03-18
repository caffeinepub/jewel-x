import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import SectionTitle from "../components/SectionTitle";
import StarRating from "../components/StarRating";
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_REVIEWS,
  formatPrice,
} from "../data/mockData";

export default function Home() {
  const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const [reviewIdx, setReviewIdx] = useState(0);

  const visibleReviews = MOCK_REVIEWS.slice(reviewIdx, reviewIdx + 3);
  const canPrev = reviewIdx > 0;
  const canNext = reviewIdx + 3 < MOCK_REVIEWS.length;

  const instagramImages = MOCK_PRODUCTS.slice(0, 5);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-[#F0EBE0]"
        aria-label="Hero banner"
      >
        <img
          src="/assets/generated/hero-banner.dim_1400x700.jpg"
          alt="JEWEL X luxury jewelry"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1209]/70 via-[#1A1209]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="max-w-xl">
            <p
              className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              NEW COLLECTION 2026
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight animate-hero-text">
              ELEGANCE
              <br />
              YOU DESERVE
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-sm animate-hero-text-delay">
              Handcrafted jewellery that tells your story. Discover
              heirloom-quality gold and diamond pieces inspired by Indian
              heritage.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-hero-cta">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-3.5 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground/90 transition-colors"
                data-ocid="hero.shop_now.button"
              >
                EXPLORE COLLECTIONS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 text-[11px] tracking-[0.2em] font-medium rounded-full hover:border-gold hover:text-gold transition-colors"
                data-ocid="hero.our_story.button"
              >
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gold/50 animate-pulse" />
          <p className="text-[9px] tracking-[0.3em] text-white/60">SCROLL</p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-foreground text-primary-foreground py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            "✦ BIS Hallmarked Gold",
            "✦ Free Shipping above ₹5000",
            "✦ 30-Day Easy Returns",
            "✦ Lifetime Polish",
          ].map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.2em] text-primary-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section
        className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Featured collections"
      >
        <ScrollReveal>
          <SectionTitle title="Shop by Collection" subtitle="EXPLORE" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 100}>
              <Link
                to="/shop"
                className="group relative block rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 aspect-[3/4]"
                data-ocid={`collections.item.${i + 1}`}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover product-card-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] tracking-widest text-gold group-hover:gap-3 transition-all flex items-center gap-2">
                    SHOP NOW <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-28 bg-card" aria-label="Best sellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Best Sellers" subtitle="MOST LOVED" />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 100}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
              data-ocid="bestsellers.view_all.button"
            >
              VIEW ALL PRODUCTS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Featured products"
      >
        <ScrollReveal>
          <SectionTitle title="New Arrivals" subtitle="FEATURED" />
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 100}>
              <ProductCard product={p} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Brand Banner */}
      <section
        className="bg-foreground py-20 px-4 sm:px-6"
        aria-label="Brand story"
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <Sparkles className="w-6 h-6 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
              Jewellery That Tells
              <br />
              <em className="text-gold">Your Story</em>
            </h2>
            <p className="mt-6 text-primary-foreground/70 text-base leading-relaxed">
              Every piece at JEWEL X is a collaboration between centuries-old
              Indian goldsmithing traditions and contemporary design
              sensibility. We source ethically certified gold and conflict-free
              gemstones to create jewellery worthy of your most precious
              moments.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 border border-gold text-gold px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-gold hover:text-white transition-colors"
              data-ocid="brand_banner.our_story.button"
            >
              READ OUR STORY <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Customer Reviews */}
      <section
        className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Customer reviews"
      >
        <ScrollReveal>
          <SectionTitle
            title="What Our Customers Say"
            subtitle="TESTIMONIALS"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleReviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 100}>
              <div
                className="bg-card rounded-lg p-6 shadow-card border border-border"
                data-ocid={`reviews.item.${i + 1}`}
              >
                <StarRating rating={review.rating} size="sm" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  "{review.text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setReviewIdx((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
            data-ocid="reviews.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {MOCK_REVIEWS.map((review, i) => (
            <button
              type="button"
              key={review.id}
              onClick={() => setReviewIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i >= reviewIdx && i < reviewIdx + 3
                  ? "bg-gold w-4"
                  : "bg-border"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setReviewIdx((v) => Math.min(MOCK_REVIEWS.length - 3, v + 1))
            }
            disabled={!canNext}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
            data-ocid="reviews.pagination_next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section
        className="pb-20 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Instagram gallery"
      >
        <ScrollReveal>
          <SectionTitle title="#JewelXLuxury" subtitle="AS SEEN ON INSTAGRAM" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {instagramImages.map((p, i) => (
            <a
              key={p.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm"
              data-ocid={`instagram.item.${i + 1}`}
            >
              <img
                src={p.imageUrls[0]}
                alt={p.name}
                className="w-full h-full object-cover product-card-img"
                loading="lazy"
              />
              <div className="product-card-overlay absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <span className="text-white text-[9px] tracking-widest font-medium">
                  #JewelXLuxury
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
