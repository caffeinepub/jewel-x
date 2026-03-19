import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { MOCK_CATEGORIES, MOCK_PRODUCTS, formatPrice } from "../data/mockData";

export default function Shop() {
  const search = useSearch({ strict: false }) as { category?: string };
  const [selectedCategory, setSelectedCategory] = useState<string>(
    search.category ?? "all",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }
    return list;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <SectionTitle
            title="The Collection"
            subtitle="SHOP ALL"
            center={false}
          />
          <p className="text-muted-foreground text-sm -mt-6">
            {filtered.length} pieces
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar desktop */}
          <aside className="hidden lg:block w-52 shrink-0">
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>

          {/* Main grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                className="lg:hidden flex items-center gap-2 text-xs tracking-widest border border-border px-3 py-2 rounded-sm hover:border-gold transition-colors"
                onClick={() => setFiltersOpen(true)}
                data-ocid="shop.filters.toggle"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> FILTER
              </button>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  SORT BY
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className="w-40 h-8 text-xs"
                    data-ocid="shop.sort.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2 mb-5">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs"
                >
                  {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    data-ocid="shop.filter.clear"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20" data-ocid="shop.empty_state">
                <p className="font-serif text-xl text-muted-foreground">
                  No pieces found
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          data-ocid="shop.filters.panel"
        >
          <div
            className="absolute inset-0 bg-foreground/40 cursor-pointer"
            onClick={() => setFiltersOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setFiltersOpen(false);
            }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background shadow-card-hover overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold">Filters</h3>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                data-ocid="shop.filters.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={(c) => {
                setSelectedCategory(c);
                setFiltersOpen(false);
              }}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>
      )}
    </main>
  );
}

function FilterPanel({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-[10px] tracking-[0.2em] font-semibold text-muted-foreground mb-3">
          CATEGORY
        </h4>
        <div className="space-y-2">
          {[{ id: "all", name: "All Jewellery" }, ...MOCK_CATEGORIES].map(
            (c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`block w-full text-left text-sm py-1 transition-colors ${
                  selectedCategory === c.id
                    ? "text-gold font-medium"
                    : "text-foreground hover:text-gold"
                }`}
                data-ocid={`shop.category.filter.${c.id}`}
              >
                {c.name}
              </button>
            ),
          )}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] tracking-[0.2em] font-semibold text-muted-foreground mb-4">
          PRICE RANGE
        </h4>
        <Slider
          min={0}
          max={50000}
          step={500}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={(v) => setPriceRange([v[0], v[1]])}
          className="mb-3"
          data-ocid="shop.price.slider"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
