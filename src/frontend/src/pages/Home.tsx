import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import SectionTitle from "../components/SectionTitle";
import StarRating from "../components/StarRating";
import type { MockProduct } from "../data/mockData";
import { MOCK_PRODUCTS, MOCK_REVIEWS } from "../data/mockData";

const HERO_SLIDES = [
  {
    id: "slide-1",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80",
    label: "SHOP BESTSELLERS",
    href: "/shop",
  },
  {
    id: "slide-2",
    img: "https://japam.in/cdn/shop/files/rudraksha-bracelets_4aaca37f-41ac-46fa-aec1-2f83dd4f7aa6.jpg?v=1737629601&width=1400",
    label: "RUDRAKSHA BRACELETS",
    href: "/bracelets",
  },
  {
    id: "slide-3",
    img: "https://japam.in/cdn/shop/files/2_6.jpg?v=1772012938&width=1400",
    label: "ENERGY STONES",
    href: "/shop",
  },
];

const BEAD_TYPES = [
  {
    label: "Rudraksha",
    img: "https://japam.in/cdn/shop/files/rudraksha.jpg?v=1737363894&width=140",
  },
  {
    label: "Karungali",
    img: "https://japam.in/cdn/shop/files/karungali.jpg?v=1737363894&width=140",
  },
  {
    label: "Pyrite",
    img: "https://japam.in/cdn/shop/files/pyrite.jpg?v=1737363894&width=140",
  },
  {
    label: "Sandalwood",
    img: "https://japam.in/cdn/shop/files/sandalwood.jpg?v=1737363894&width=140",
  },
  {
    label: "Sphatik",
    img: "https://japam.in/cdn/shop/files/sphatik.jpg?v=1737363894&width=140",
  },
  {
    label: "Tiger Eye",
    img: "https://japam.in/cdn/shop/files/tiger_eye.jpg?v=1737363894&width=140",
  },
  {
    label: "Rose Quartz",
    img: "https://japam.in/cdn/shop/files/rose_quartz_115e634e-54d8-413e-80e8-153a01206fa7.jpg?v=1737363894&width=140",
  },
  {
    label: "Amethyst",
    img: "https://japam.in/cdn/shop/files/amethyst.jpg?v=1737363894&width=140",
  },
];

const PURPOSES = [
  {
    label: "Wealth",
    img: "https://japam.in/cdn/shop/files/wealth_f7692a36-0440-46fe-a69f-b2b0eb085ea9.jpg?v=1737359432&width=200",
  },
  {
    label: "Health",
    img: "https://japam.in/cdn/shop/files/health_c455995d-39c2-47b7-9f92-6a7cc2d2758c.jpg?v=1737359432&width=200",
  },
  {
    label: "Love",
    img: "https://japam.in/cdn/shop/files/love_61b967f3-2dbc-4fe9-9aed-46b2c149e471.jpg?v=1737359432&width=200",
  },
  {
    label: "Luck",
    img: "https://japam.in/cdn/shop/files/luck_017cd17d-6bcf-4ea7-9d59-c12a17fe6ab3.jpg?v=1737359432&width=200",
  },
  {
    label: "Protection",
    img: "https://japam.in/cdn/shop/files/protection_3cc2a2f7-5444-4ba9-ac90-fa79bbf6f7ba.jpg?v=1737359432&width=200",
  },
  {
    label: "Peace",
    img: "https://japam.in/cdn/shop/files/peace_fdb2b096-1430-4f86-8202-49f9813d1f52.jpg?v=1737359432&width=200",
  },
  {
    label: "Courage",
    img: "https://japam.in/cdn/shop/files/courage_9927fe87-71b6-499f-b4bb-180482b0b4dd.jpg?v=1737359432&width=200",
  },
  {
    label: "Balance",
    img: "https://japam.in/cdn/shop/files/balance_67be72c9-94e0-44a0-9a95-5102937c0705.jpg?v=1737359432&width=200",
  },
];

const COLLECTIONS = [
  {
    label: "Rudraksha Bracelets",
    img: "https://japam.in/cdn/shop/files/rudraksha-bracelets_4aaca37f-41ac-46fa-aec1-2f83dd4f7aa6.jpg?v=1737629601&width=460",
    href: "/bracelets",
  },
  {
    label: "Rudraksha Malas",
    img: "https://japam.in/cdn/shop/files/Untitled_design_12.jpg?v=1737784055&width=460",
    href: "/shop",
  },
  {
    label: "Nepali Rudraksha",
    img: "https://japam.in/cdn/shop/files/Untitled_design_51.jpg?v=1737882671&width=460",
    href: "/shop",
  },
  {
    label: "Spiritual Jewellery",
    img: "https://japam.in/cdn/shop/files/Untitled_design_13.jpg?v=1737784076&width=460",
    href: "/shop",
  },
  {
    label: "Karungali Wearables",
    img: "https://japam.in/cdn/shop/files/karungali-wearables.jpg?v=1737631005&width=460",
    href: "/shop",
  },
  {
    label: "Energy Stones",
    img: "https://japam.in/cdn/shop/files/energy-stone-wearables.jpg?v=1737629997&width=460",
    href: "/shop",
  },
  {
    label: "Pyrite Wearables",
    img: "https://japam.in/cdn/shop/files/pyrite-wearables.jpg?v=1737629796&width=460",
    href: "/shop",
  },
];

const GALLERY_IMGS = [
  {
    id: "g1",
    img: "https://japam.in/cdn/shop/files/mahakal-mala.jpg?v=1737714515&width=800",
  },
  {
    id: "g2",
    img: "https://japam.in/cdn/shop/files/red-sandalwood.jpg?v=1737714584&width=800",
  },
  {
    id: "g3",
    img: "https://japam.in/cdn/shop/files/dreamy-duo.jpg?v=1737714515&width=800",
  },
  {
    id: "g4",
    img: "https://japam.in/cdn/shop/files/silver-rudraksha-mala.jpg?v=1737714515&width=800",
  },
  {
    id: "g5",
    img: "https://japam.in/cdn/shop/files/golden-beads-modern.jpg?v=1737714515&width=800",
  },
  {
    id: "g6",
    img: "https://japam.in/cdn/shop/files/Untitled_design_13_94273b77-5172-443b-925e-ae3bb096e008.jpg?v=1763773660&width=800",
  },
  {
    id: "g7",
    img: "https://japam.in/cdn/shop/files/pyrite-splash.jpg?v=1737714750&width=800",
  },
  {
    id: "g8",
    img: "https://japam.in/cdn/shop/files/tiger-eye-om.jpg?v=1737714515&width=800",
  },
  {
    id: "g9",
    img: "https://japam.in/cdn/shop/files/amethyst-band.jpg?v=1737715154&width=800",
  },
];

export default function Home() {
  const bestsellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);
  const trendingProducts = MOCK_PRODUCTS.filter((p) =>
    p.id.startsWith("lt"),
  ).slice(0, 8);
  const energyStones = MOCK_PRODUCTS.filter(
    (p) => p.category === "energy-stones" && !p.isNew,
  ).slice(0, 8);
  const combos: MockProduct[] = [
    ...MOCK_PRODUCTS.filter((p) => p.id.startsWith("bs6")),
    ...MOCK_PRODUCTS.filter((p) => p.id.startsWith("combo")),
    ...MOCK_PRODUCTS.filter((p) => p.id === "lt8"),
  ].slice(0, 4);

  const [heroIdx, setHeroIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const beadScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((v) => (v + 1) % HERO_SLIDES.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  const visibleReviews = MOCK_REVIEWS.slice(reviewIdx, reviewIdx + 3);
  const canPrev = reviewIdx > 0;
  const canNext = reviewIdx + 3 < MOCK_REVIEWS.length;

  return (
    <main className="overflow-x-hidden">
      {/* Announcement Bar */}
      <div className="bg-foreground text-primary-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-8">
          <div className="w-full sm:w-auto text-center py-2 px-4 text-[11px] tracking-[0.15em] font-semibold text-gold">
            🎉 10% Extra OFF. Use Code:{" "}
            <span className="underline">JEWELX10</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/20" />
          <div className="w-full sm:w-auto text-center py-2 px-4 text-[11px] tracking-[0.15em] text-primary-foreground/80">
            🚚 Free delivery on orders over ₹299
          </div>
        </div>
      </div>

      {/* Bead Type Filter Pills */}
      <section className="bg-card border-b border-border py-4">
        <div
          ref={beadScrollRef}
          className="flex items-center gap-4 px-4 md:px-10 overflow-x-auto max-w-7xl mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {BEAD_TYPES.map((b) => (
            <Link
              key={b.label}
              to="/shop"
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all shadow-sm">
                <img
                  src={b.img}
                  alt={b.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] tracking-wide text-foreground/70 group-hover:text-gold transition-colors font-medium whitespace-nowrap">
                {b.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hero Slideshow */}
      <section
        className="relative w-full overflow-hidden"
        style={{ maxHeight: "520px" }}
        aria-label="Hero"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${heroIdx * 100}%)` }}
        >
          {HERO_SLIDES.map((s) => (
            <div key={s.id} className="relative flex-shrink-0 w-full">
              <img
                src={s.img}
                alt={s.label}
                className="w-full object-cover object-center"
                style={{ maxHeight: "520px", minHeight: "220px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <Link
                  to={s.href as any}
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-foreground text-[11px] tracking-[0.2em] font-semibold px-8 py-3 rounded-full transition-colors shadow-lg"
                >
                  {s.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setHeroIdx(i)}
              className={`rounded-full transition-all ${
                i === heroIdx ? "w-5 h-2 bg-gold" : "w-2 h-2 bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setHeroIdx((v) => (v - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setHeroIdx((v) => (v + 1) % HERO_SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Karungali Feature Banner */}
      <section className="relative bg-foreground overflow-hidden">
        <img
          src="https://japam.in/cdn/shop/files/karungali-wearables.jpg?v=1737631005&width=1400"
          alt="Karungali - Ebony wood collection"
          className="w-full object-cover object-center opacity-80"
          style={{ maxHeight: "420px" }}
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            Karungali - Ebony wood
          </h2>
          <p className="text-white/80 mb-5 text-sm md:text-base">
            Sacred Karungali Beads in everyday wearable designs.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-foreground text-[11px] tracking-[0.15em] font-semibold px-7 py-3 rounded-full hover:bg-gold hover:text-white transition-colors"
          >
            EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* JEWEL X Bestsellers */}
      <section className="py-16 md:py-24 bg-[#F8F3EA]" aria-label="Bestsellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="JEWEL X Bestsellers" subtitle="MOST LOVED" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.slice(0, 8).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lab Tested Trust Section */}
      <section className="py-14 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
              Asli Wearables - Lab Tested
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              We follow our proprietary system of BTR (Batch Test Reports) to
              ensure you always get original and genuine beads and stones.
            </p>
          </ScrollReveal>
          <div className="mb-8">
            <img
              src="https://japam.in/cdn/shop/files/btr-testing.jpg?v=1763724816&width=1200"
              alt="BTR Lab Testing"
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "BTR Card",
                desc: "We send samples for lab testing and provide Batch Test Reports",
              },
              {
                icon: Star,
                title: "Quality Packaging",
                desc: "We focus heavily on customer experience and delight",
              },
              {
                icon: Star,
                title: "Fit & Finish",
                desc: "We put a lot of effort into ensuring our high quality standards",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <ScrollReveal key={title}>
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Our Collections */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Collections"
      >
        <ScrollReveal>
          <SectionTitle title="Shop Our Collections" subtitle="EXPLORE" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 60}>
              <Link
                to={c.href as any}
                className="group relative block rounded-lg overflow-hidden aspect-[3/4] shadow hover:shadow-lg transition-all"
              >
                <img
                  src={c.img}
                  alt={c.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-sm font-bold text-white">
                    {c.label}
                  </h3>
                  <p className="text-[10px] text-gold mt-1 flex items-center gap-1">
                    SHOP NOW <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Latest & Trending */}
      <section className="py-16 md:py-24 bg-card" aria-label="Trending">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Latest & Trending" subtitle="NEW ARRIVALS" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL ARRIVALS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Purpose */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Shop by Purpose"
      >
        <ScrollReveal>
          <SectionTitle title="Shop By Purpose" subtitle="WHAT DO YOU SEEK?" />
        </ScrollReveal>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 md:gap-4">
          {PURPOSES.map((p, i) => (
            <ScrollReveal key={p.label} delay={i * 50}>
              <Link
                to="/shop"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 border-2 border-transparent group-hover:border-gold transition-all shadow">
                  <img
                    src={p.img}
                    alt={p.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] md:text-xs tracking-wide text-foreground/70 group-hover:text-gold transition-colors font-medium text-center">
                  {p.label}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Explore Energy Stones */}
      <section
        className="py-16 md:py-24 bg-[#F8F3EA]"
        aria-label="Energy Stones"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle
              title="Explore Energy Stones"
              subtitle="HEAL & MANIFEST"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {energyStones.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rooted In Tradition Gallery */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Gallery"
      >
        <ScrollReveal>
          <SectionTitle
            title="Rooted In Tradition, Made For Today"
            subtitle="OUR STORY"
          />
        </ScrollReveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
          {GALLERY_IMGS.map((g) => (
            <Link
              key={g.id}
              to="/shop"
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <img
                src={g.img}
                alt={`JEWEL X gallery ${g.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* Save More With Combos */}
      <section className="py-16 md:py-24 bg-card" aria-label="Combos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Save More With Combos" subtitle="BEST VALUE" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {combos.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL COMBOS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Reviews"
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
              <div className="bg-card rounded-lg p-6 shadow border border-border">
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
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setReviewIdx((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
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
              aria-label={`Review ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setReviewIdx((v) => Math.min(MOCK_REVIEWS.length - 3, v + 1))
            }
            disabled={!canNext}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
